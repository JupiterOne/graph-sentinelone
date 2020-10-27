import { RelationshipClass } from "@jupiterone/integration-sdk-core";

export const ACCOUNT_ENTITY_TYPE = "sentinelone_account";
export const ACCOUNT_ENTITY_CLASS = "Account";

export const ACCOUNT_GROUP_RELATIONSHIP_TYPE = "sentinelone_account_has_group";
export const ACCOUNT_GROUP_RELATIONSHIP_CLASS = "HAS";

export const GROUP_ENTITY_TYPE = "sentinelone_group";
export const GROUP_ENTITY_CLASS = "Group";

export const GROUP_AGENT_RELATIONSHIP_TYPE = "sentinelone_group_has_agent";
export const GROUP_AGENT_RELATIONSHIP_CLASS = "HAS";

export const AGENT_ENTITY_TYPE = "sentinelone_agent";
export const AGENT_ENTITY_CLASS = "HostAgent";

export const Entities = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: ACCOUNT_ENTITY_TYPE,
    _class: ACCOUNT_ENTITY_CLASS,
  },
  GROUP: {
    resourceName: 'Group',
    _type: GROUP_ENTITY_TYPE,
    _class: GROUP_ENTITY_CLASS
  },
  AGENT: {
    resourceName: 'Agent',
    _type: AGENT_ENTITY_TYPE,
    _class: AGENT_ENTITY_CLASS
  }
}

export const Relationships = {
  ACCOUNT_GROUP: {
    _type: ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    _class: RelationshipClass.HAS,
    sourceType: ACCOUNT_ENTITY_TYPE,
    targetType: GROUP_ENTITY_TYPE,
  },
  GROUP_AGENT: {
    _type: GROUP_AGENT_RELATIONSHIP_TYPE,
    _class: RelationshipClass.HAS,
    sourceType: GROUP_ENTITY_TYPE,
    targetType: AGENT_ENTITY_TYPE,
  }
}