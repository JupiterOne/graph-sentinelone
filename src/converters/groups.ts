import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

import { SentinelOneGroup } from "../sentinelone/types";
import { AgentEntity, GroupEntity } from "../types";
import getTime from "../utils/getTime";

export const GROUP_ENTITY_TYPE = "sentinelone_group";
export const GROUP_ENTITY_CLASS = "Group";

export const GROUP_AGENT_RELATIONSHIP_TYPE = "sentinelone_group_has_agent";
export const GROUP_AGENT_RELATIONSHIP_CLASS = "HAS";

export function createGroupEntities(data: SentinelOneGroup[]): GroupEntity[] {
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
    updatedAt: getTime(d.updatedAt),
    type: d.type,
    createdAt: getTime(d.createdAt),
  }));
}

export function createGroupAgentRelationships(
  groups: GroupEntity[],
  agents: AgentEntity[],
): RelationshipFromIntegration[] {
  const relationships = [];
  const groupsById: { [id: string]: GroupEntity } = {};
  for (const group of groups) {
    groupsById[group.id] = group;
  }

  for (const agent of agents) {
    const group = groupsById[agent.groupId];
    if (group !== undefined) {
      relationships.push(createGroupAgentRelationship(group, agent));
    }
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
