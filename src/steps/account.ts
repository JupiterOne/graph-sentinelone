import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../types';
import { Entities } from './constants';
import { createAccountEntity } from './converters';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export async function fetchAccountDetails({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = await jobState.addEntity(createAccountEntity(instance));
  await jobState.setData(ACCOUNT_ENTITY_KEY, accountEntity);
}

export const accountSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-account',
    name: 'Fetch Account Details',
    entities: [Entities.ACCOUNT],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAccountDetails,
  },
];
