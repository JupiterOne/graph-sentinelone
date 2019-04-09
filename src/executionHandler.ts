import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_GROUP_RELATIONSHIP_TYPE,
  AccountEntity,
  AGENT_ENTITY_TYPE,
  AgentEntity,
  createAccountEntities,
  createAccountGroupRelationships,
  createAgentEntities,
  createGroupAgentRelationships,
  createGroupEntities,
  GROUP_AGENT_RELATIONSHIP_TYPE,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "./converters";

import initializeContext from "./initializeContext";

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<IntegrationExecutionResult> {
  try {
    const { graph, persister, provider } = initializeContext(context);

    const [
      oldAccountEntities,
      oldGroupEntities,
      oldAgentEntities,
      oldAccountGroupRelationships,
      oldGroupAgentRelationships,
    ] = await Promise.all([
      graph.findEntitiesByType<AccountEntity>(ACCOUNT_ENTITY_TYPE),
      graph.findEntitiesByType<GroupEntity>(GROUP_ENTITY_TYPE),
      graph.findEntitiesByType<AgentEntity>(AGENT_ENTITY_TYPE),
      graph.findRelationshipsByType(ACCOUNT_GROUP_RELATIONSHIP_TYPE),
      graph.findRelationshipsByType(GROUP_AGENT_RELATIONSHIP_TYPE),
    ]);

    const accountEntities: AccountEntity[] = createAccountEntities(
      await provider.fetchAccounts(),
    );
    const groupEntities: GroupEntity[] = createGroupEntities(
      await provider.fetchGroups(),
    );
    const agentEntities: AgentEntity[] = createAgentEntities(
      await provider.fetchAgents(),
    );

    return {
      operations: await persister.publishPersisterOperations([
        [
          ...persister.processEntities(oldAccountEntities, accountEntities),
          ...persister.processEntities(oldGroupEntities, groupEntities),
          ...persister.processEntities(oldAgentEntities, agentEntities),
        ],
        [
          ...persister.processRelationships(
            oldAccountGroupRelationships,
            createAccountGroupRelationships(accountEntities, groupEntities),
          ),
          ...persister.processRelationships(
            oldGroupAgentRelationships,
            createGroupAgentRelationships(groupEntities, agentEntities),
          ),
        ],
      ]),
    };
  } catch (error) {
    throw error;
  }
}
