import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationRelationship,
} from "@jupiterone/jupiter-managed-integration-sdk";
import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_GROUP_RELATIONSHIP_TYPE,
  AGENT_ENTITY_TYPE,
  createAccountEntity,
  createAccountGroupRelationships,
  createAgentEntities,
  createGroupAgentRelationships,
  createGroupEntities,
  GROUP_AGENT_RELATIONSHIP_TYPE,
  GROUP_ENTITY_TYPE,
} from "./converters";
import initializeContext from "./initializeContext";

export default async function executionHandler(
  context: IntegrationExecutionContext,
): Promise<IntegrationExecutionResult> {
  try {
    const { graph, instance, persister, provider } = initializeContext(context);

    const [
      oldAccountEntities,
      oldGroupEntities,
      oldAgentEntities,
      oldAccountGroupRelationships,
      oldGroupAgentRelationships,
    ] = await Promise.all([
      graph.findEntitiesByType(ACCOUNT_ENTITY_TYPE),
      graph.findEntitiesByType(GROUP_ENTITY_TYPE),
      graph.findEntitiesByType(AGENT_ENTITY_TYPE),
      graph.findRelationshipsByType(ACCOUNT_GROUP_RELATIONSHIP_TYPE),
      graph.findRelationshipsByType(GROUP_AGENT_RELATIONSHIP_TYPE),
    ]);

    const accountEntity = createAccountEntity(instance);
    const groupEntities = createGroupEntities(await provider.fetchGroups());
    const agentEntities = createAgentEntities(await provider.fetchAgents());

    return {
      operations: await persister.publishPersisterOperations([
        [
          ...persister.processEntities(oldAccountEntities, [accountEntity]),
          ...persister.processEntities(oldGroupEntities, groupEntities),
          ...persister.processEntities(oldAgentEntities, agentEntities),
        ],
        [
          ...persister.processRelationships(
            oldAccountGroupRelationships as IntegrationRelationship[],
            createAccountGroupRelationships(accountEntity, groupEntities),
          ),
          ...persister.processRelationships(
            oldGroupAgentRelationships as IntegrationRelationship[],
            createGroupAgentRelationships(groupEntities, agentEntities),
          ),
        ],
      ]),
    };
  } catch (error) {
    throw error;
  }
}
