import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../client';
import { IntegrationConfig } from '../types';
import { ACCOUNT_ENTITY_KEY } from './account';
import { Entities, Relationships } from './constants';
import { createAgentEntity, createGroupEntity } from './converters';

type GroupIdKeyMap = { [id: string]: string };

const DATA_GROUP_ID_KEY_MAP = 'DATA_GROUP_ID_KEY_MAP';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const groupIdToKeyMap: GroupIdKeyMap = {};

  await apiClient.iterateGroups(async (group) => {
    const groupEntity = await jobState.addEntity(createGroupEntity(group));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: groupEntity,
      }),
    );

    groupIdToKeyMap[group.id] = groupEntity._key;
  });

  await jobState.setData(DATA_GROUP_ID_KEY_MAP, groupIdToKeyMap);
}

export async function fetchAgents({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const groupIdToKeyMap: GroupIdKeyMap = await jobState.getData(
    DATA_GROUP_ID_KEY_MAP,
  );

  await apiClient.iterateAgents(async (agent) => {
    const agentEntity = await jobState.addEntity(createAgentEntity(agent));

    const groupEntity = await jobState.findEntity(
      groupIdToKeyMap[agent.groupId],
    );
    if (groupEntity) {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: groupEntity,
          to: agentEntity,
        }),
      );
    }
  });
}

export const agentSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [Entities.GROUP],
    relationships: [Relationships.ACCOUNT_GROUP],
    dependsOn: ['fetch-account'],
    executionHandler: fetchGroups,
  },
  {
    id: 'fetch-agents',
    name: 'Fetch Agents',
    entities: [Entities.AGENT],
    relationships: [Relationships.GROUP_AGENT],
    dependsOn: ['fetch-groups'],
    executionHandler: fetchAgents,
  },
];
