import {
  IntegrationExecutionContext,
  IntegrationValidationError,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from './client';
import { IntegrationConfig } from './types';

export default async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.serverUrl || !config.apiToken) {
    throw new IntegrationValidationError(
      'Config requires all of {serverUrl, apiToken}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
