import {
  EntityFromIntegration,
  RelationshipFromIntegration,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { Agent, Group } from "./ProviderClient";

export const GROUP_ENTITY_TYPE = "sentinelone_group";
export const GROUP_ENTITY_CLASS = "HostGroup";

export const AGENT_ENTITY_TYPE = "sentinelone_agent";
export const AGENT_ENTITY_CLASS = "HostAgent";

export const GROUP_AGENT_RELATIONSHIP_TYPE = "sentinelone_group_has_agent";
export const GROUP_AGENT_RELATIONSHIP_CLASS = "HAS";

export interface GroupEntity extends EntityFromIntegration, Group {}

export interface AgentEntity extends EntityFromIntegration, Agent {}

export function createGroupEntities(data: Group[]): GroupEntity[] {
  return data.map(d => ({
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
    updatedAt: d.updatedAt,
    type: d.type,
    createdAt: d.createdAt,
  }));
}

export function createAgentEntities(data: Agent[]): AgentEntity[] {
  return data.map(d => ({
    _key: `${AGENT_ENTITY_TYPE}-id-${d.id}`,
    _type: AGENT_ENTITY_TYPE,
    _class: AGENT_ENTITY_CLASS,
    ownerId: d.groupId,
    displayName: `${d.computerName}`,

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
    updatedAt: d.updatedAt,
    osType: d.osType,
    id: d.id,
    createdAt: d.createdAt,
    externalIp: d.externalIp,
    computerName: d.computerName,
    modelName: d.modelName,
    uuid: d.uuid,
    encryptedApplications: d.encryptedApplications,
    adComputerDistinguishedName: d.adComputerDistinguishedName,
    osUsername: d.osUsername,
    groupName: d.groupName,
    infected: d.infected,
    policyUpdatedAt: d.policyUpdatedAt,
    cpuId: d.cpuId,
    registeredAt: d.registeredAt,
    activeThreats: d.activeThreats,
    groupUpdatedAt: d.groupUpdatedAt,
    machineType: d.machineType,
    groupIp: d.groupIp,
    osStartTime: d.osStartTime,
    osRevision: d.osRevision,
    scanAbortedAt: d.scanAbortedAt,
    siteId: d.siteId,
    scanStartedAt: d.scanStartedAt,
    isPendingUninstall: d.isPendingUninstall,
    scanFinishedAt: d.scanFinishedAt,
    lastActiveDate: d.lastActiveDate,
    groupId: d.groupId,
    isActive: d.isActive,
    agentVersion: d.agentVersion,
    licenseKey: d.licenseKey,
    networkStatus: d.networkStatus,
    lastLoggedInUserName: d.lastLoggedInUserName,
    osName: d.osName,
    mitigationMode: d.mitigationMode,
    cpuCount: d.cpuCount,
    isUninstalled: d.isUninstalled,
    isUpToDate: d.isUpToDate,
    mitigationModeSuspicious: d.mitigationModeSuspicious,
    isDecommissioned: d.isDecommissioned,
  }));
}

export function createGroupAgentRelationships(
  group: GroupEntity,
  agents: AgentEntity[],
) {
  const relationships = [];
  for (const agent of agents) {
    relationships.push(createGroupAgentRelationship(group, agent));
  }

  return relationships;
}

function createGroupAgentRelationship(
  group: GroupEntity,
  agent: AgentEntity,
): RelationshipFromIntegration {
  return {
    _key: `${group._key}_has_${agent._key}`,
    _type: GROUP_AGENT_RELATIONSHIP_TYPE,
    _class: GROUP_AGENT_RELATIONSHIP_CLASS,
    _fromEntityKey: group._key,
    _toEntityKey: agent._key,
  };
}
