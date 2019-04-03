import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  AGENT_ENTITY_TYPE,
  AgentEntity,
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
      oldGroupEntities,
      oldAgentEntities,
      oldGroupAgentRelationships,
    ] = await Promise.all([
      graph.findEntitiesByType<GroupEntity>(GROUP_ENTITY_TYPE),
      graph.findEntitiesByType<AgentEntity>(AGENT_ENTITY_TYPE),
      graph.findRelationshipsByType(GROUP_AGENT_RELATIONSHIP_TYPE),
    ]);

    const groupEntities: GroupEntity[] = createGroupEntities(
      await provider.fetchGroups(),
    );
    const agentEntities: AgentEntity[] = createAgentEntities(
      await provider.fetchAgents(),
    );

    return {
      operations: await persister.publishPersisterOperations([
        [
          ...persister.processEntities(oldGroupEntities, groupEntities),
          ...persister.processEntities(oldAgentEntities, agentEntities),
        ],
        [
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
