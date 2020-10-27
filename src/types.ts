import { IntegrationInstanceConfig } from '@jupiterone/integration-sdk-core';

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  serverUrl: string;
  apiToken: string;
}
