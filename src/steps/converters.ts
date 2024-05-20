import {
  assignTags,
  createIntegrationEntity,
  Entity,
  IntegrationInstance,
  IntegrationLogger,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { SentinelOneAgent, SentinelOneGroup } from '../client';
import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AGENT_ENTITY_CLASS,
  AGENT_ENTITY_TYPE,
  GROUP_ENTITY_CLASS,
  GROUP_ENTITY_TYPE,
} from './constants';

export function createAccountEntity(data: IntegrationInstance): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {},
      assign: {
        _key: `${ACCOUNT_ENTITY_TYPE}-${data.id}`,
        _type: ACCOUNT_ENTITY_TYPE,
        _class: ACCOUNT_ENTITY_CLASS,
        name: data.name,
        displayName: data.name,
      },
    },
  });
}

export function createGroupEntity(d: SentinelOneGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: d,
      assign: {
        _key: `${GROUP_ENTITY_TYPE}-id-${d.id}`,
        _type: GROUP_ENTITY_TYPE,
        _class: GROUP_ENTITY_CLASS,
        id: d.id,
        displayName: `${d.name} ${d.type}`,
        inherits: d.inherits,
        name: d.name,
        creator: d.creator,
        filterName: d.filterName,
        totalAgents: d.totalAgents,
        filterId: d.filterId,
        rank: d.rank,
        siteId: d.siteId,
        isDefault: d.isDefault,
        creatorId: d.creatorId,
        updatedAt: parseTimePropertyValue(d.updatedAt),
        type: d.type,
        createdAt: parseTimePropertyValue(d.createdAt),
      },
    },
  });
}

export function createAgentEntity(
  d: SentinelOneAgent,
  logger?: IntegrationLogger,
): Entity {
  const { licenseKey, ...agent } = d;
  const { tags, ...rawData } = agent;

  const entity = createIntegrationEntity({
    entityData: {
      source: rawData,
      assign: {
        _key: `${AGENT_ENTITY_TYPE}-id-${d.id}`,
        _type: AGENT_ENTITY_TYPE,
        _class: AGENT_ENTITY_CLASS,
        function: 'anti-malware',
        displayName: d.computerName,
        domain: d.domain,
        appsVulnerabilityStatus: d.appsVulnerabilityStatus,
        siteName: d.siteName,
        coreCount: d.coreCount,
        totalMemory: d.totalMemory,
        inRemoteShellSession: d.inRemoteShellSession,
        osArch: d.osArch,
        allowRemoteShell: d.allowRemoteShell,
        scanStatus: d.scanStatus,
        consoleMigrationStatus: d.consoleMigrationStatus,
        updatedAt: parseTimePropertyValue(d.updatedAt),
        osType: d.osType,
        id: d.id,
        createdAt: parseTimePropertyValue(d.createdAt),
        externalIp: d.externalIp,
        computerName: d.computerName,
        modelName: d.modelName,
        uuid: d.uuid,
        encryptedApplications: d.encryptedApplications,
        adComputerDistinguishedName: d.adComputerDistinguishedName,
        osUsername: d.osUsername,
        groupName: d.groupName,
        infected: d.infected,
        policyUpdatedAt: parseTimePropertyValue(d.policyUpdatedAt),
        cpuId: d.cpuId,
        registeredAt: parseTimePropertyValue(d.registeredAt),
        activeThreats: d.activeThreats,
        groupUpdatedAt: parseTimePropertyValue(d.groupUpdatedAt),
        machineType: d.machineType,
        groupIp: d.groupIp,
        osStartTime: parseTimePropertyValue(d.osStartTime),
        osRevision: d.osRevision,
        scanAbortedAt: parseTimePropertyValue(d.scanAbortedAt),
        siteId: d.siteId,
        scanStartedAt: parseTimePropertyValue(d.scanStartedAt),
        isPendingUninstall: d.isPendingUninstall,
        scanFinishedAt: parseTimePropertyValue(d.scanFinishedAt),
        lastActiveDate: parseTimePropertyValue(d.lastActiveDate),
        lastSeenOn: parseTimePropertyValue(d.lastActiveDate),
        groupId: d.groupId,
        isActive: d.isActive,
        agentVersion: d.agentVersion,
        networkStatus: d.networkStatus,
        lastLoggedInUserName: d.lastLoggedInUserName,
        osName: d.osName,
        mitigationMode: d.mitigationMode,
        cpuCount: d.cpuCount,
        isUninstalled: d.isUninstalled,
        isUpToDate: d.isUpToDate,
        mitigationModeSuspicious: d.mitigationModeSuspicious,
        isDecommissioned: d.isDecommissioned,
        serial: d.serialNumber,
        macAddress: getMacAddresses(d.networkInterfaces),
        missingPermissions: d.missingPermissions,
      },
    },
  });
  try {
    assignTags(entity, tags.sentinelone ?? []);
  } catch (error) {
    logger?.warn({ error }, 'Could not assign tags to agent entity');
  }

  return entity;
}

/**
 * Extracts MAC addresses associated with public IP addresses from Tenable asset data.
 * It filters out MAC addresses associated with private and special-use IP addresses,
 * including APIPA and local-link IPv6 addresses, to focus only on those that are most likely to be unique and publicly routable.
 *
 * This function checks both IPv4 and IPv6 addresses:
 * - For IPv4, it excludes addresses within private ranges like 10.x.x.x, 172.16.x.x to 172.31.x.x, 192.168.x.x, and APIPA range 169.254.x.x.
 * - For IPv6, it excludes Unique Local Addresses (ULA) starting with fc00:: or fd00:: and link-local addresses starting with fe80::.
 * MAC addresses from the top-level of the asset data are included, assuming they are associated with public IPs unless specified otherwise.
 */
export function getMacAddresses(
  networkInterfaces: SentinelOneAgent['networkInterfaces'],
): string[] {
  const isPublicIp = (ip: string): boolean => {
    return !privateIpPatterns.some((pattern) => pattern.test(ip));
  };

  const publicMacAddresses = new Set<string>();

  // Extract macAddresses from network interfaces that are either associated with at least one public IP.
  networkInterfaces?.forEach((ni) => {
    const hasPublicIp =
      (ni.inet?.length && ni.inet.some(isPublicIp)) ||
      (ni.inet6?.length && ni.inet6.some(isPublicIp));
    if (hasPublicIp && ni.physical !== '00:00:00:00:00:00') {
      publicMacAddresses.add(ni.physical);
    }

    // When selecting macAddresses, prefer networkInterfaces with a gatewayIp as they are more likely to have
    // had their physical macAddress given to them by a central authority rather than being purely virtual.
    if (
      ni.gatewayIp &&
      ni.gatewayMacAddress &&
      ni.gatewayMacAddress !== '00:00:00:00:00:00'
    ) {
      publicMacAddresses.add(ni.gatewayMacAddress);
    }
  });

  return [...publicMacAddresses];
}

const privateIpPatterns = [
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, // Matches 10.x.x.x
  /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/, // Matches 172.16.x.x to 172.31.x.x
  /^192\.168\.\d{1,3}\.\d{1,3}$/, // Matches 192.168.x.x
  /^169\.254\.\d{1,3}\.\d{1,3}$/, // Matches 169.254.x.x (APIPA)
  /^(fc[0-9a-f]{2}:|fd[0-9a-f]{2}:)/, // Matches IPv6 ULA
  /^(fe8[0-9a-f]:|fe9[0-9a-f]:|fea[0-9a-f]:|feb[0-9a-f]:)/, // Matches IPv6 Link-Local
  /^(fc00::|fd00::|fe80::)/, // Matches IPv6 Simplified
  /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, // Matches 127.x.x.x
  /^::1$/, // Matches ::1 (IPv6 localhost)
];
