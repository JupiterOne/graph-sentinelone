import {
  IntegrationInstance,
  RelationshipFromIntegration,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { AccountEntity, GroupEntity } from "../types";

export const ACCOUNT_ENTITY_TYPE = "sentinelone_account";
export const ACCOUNT_ENTITY_CLASS = "Account";

export const ACCOUNT_GROUP_RELATIONSHIP_TYPE = "sentinelone_account_has_group";
export const ACCOUNT_GROUP_RELATIONSHIP_CLASS = "HAS";

export function createAccountEntity(data: IntegrationInstance): AccountEntity {
  return {
    _key: `${ACCOUNT_ENTITY_TYPE}-${data.id}`,
    _type: ACCOUNT_ENTITY_TYPE,
    _class: ACCOUNT_ENTITY_CLASS,
    displayName: data.name,
  };
}

export function createAccountGroupRelationships(
  account: AccountEntity,
  groups: GroupEntity[],
): RelationshipFromIntegration[] {
  const relationships = [];
  for (const group of groups) {
    relationships.push(createAccountGroupRelationship(account, group));
  }
  return relationships;
}

function createAccountGroupRelationship(
  account: AccountEntity,
  group: GroupEntity,
): RelationshipFromIntegration {
  return {
    _key: `${account._key}_has_${group._key}`,
    _type: ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    _class: ACCOUNT_GROUP_RELATIONSHIP_CLASS,
    _fromEntityKey: account._key,
    _toEntityKey: group._key,
  };
}
