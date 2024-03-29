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

  // When selecting macAddresses, prefer networkInterfaces with a gatewayIp as they are more likely to have
  // had their physical macAddress given to them by a central authority rather than being purely virtual.
  //
  // The gateway is often a central point through which network traffic flows. It's responsible for routing
  // and forwarding packets between different networks. By associating MAC addresses with the gateway, you
  // can have a more centralized and controlled point for monitoring and managing network traffic.
  const internetNetworkInterface = d.networkInterfaces?.filter(
    (i) => i.gatewayIp != undefined,
  );
  const networkInterfaces = internetNetworkInterface?.length
    ? internetNetworkInterface
    : d.networkInterfaces;
  const macAddress = networkInterfaces
    ?.filter((i) => i.physical !== '00:00:00:00:00:00')
    .map((i) => i.physical);

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
        macAddress: macAddress,
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
