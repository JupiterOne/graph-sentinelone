import { RelationshipClass } from '@jupiterone/integration-sdk-core';
import {
  AccountEntityMetadata,
  AgentEntityMetadata,
  GroupEntityMetadata,
} from '../entities';

export const ACCOUNT_GROUP_RELATIONSHIP_TYPE = 'sentinelone_account_has_group';
export const ACCOUNT_GROUP_RELATIONSHIP_CLASS = 'HAS';

export const GROUP_AGENT_RELATIONSHIP_TYPE = 'sentinelone_group_has_agent';
export const GROUP_AGENT_RELATIONSHIP_CLASS = 'HAS';

export const Entities = {
  ACCOUNT: AccountEntityMetadata,
  GROUP: GroupEntityMetadata,
  AGENT: AgentEntityMetadata,
};

export const Relationships = {
  ACCOUNT_GROUP: {
    _type: ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    _class: RelationshipClass.HAS,
    sourceType: AccountEntityMetadata._type,
    targetType: GroupEntityMetadata._type,
  },
  GROUP_AGENT: {
    _type: GROUP_AGENT_RELATIONSHIP_TYPE,
    _class: RelationshipClass.HAS,
    sourceType: GroupEntityMetadata._type,
    targetType: AgentEntityMetadata._type,
  },
};
