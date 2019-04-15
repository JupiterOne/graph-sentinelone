import {
  IntegrationExecutionContext,
  IntegrationInstanceAuthenticationError,
  IntegrationInstanceConfigError,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { ProviderClient, ProviderConfig } from "./ProviderClient";

/**
 * Performs validation of the execution before the execution handler function is
 * invoked.
 *
 * At a minimum, integrations should ensure that the
 * `executionContext.instance.config` is valid. Integrations that require
 * additional information in `executionContext.invocationArgs` should also
 * validate those properties. It is also helpful to perform authentication with
 * the provider to ensure that credentials are valid.
 *
 * The function will be awaited to support connecting to the provider for this
 * purpose.
 *
 * @param executionContext
 */

export default async function invocationValidator(
  executionContext: IntegrationExecutionContext<IntegrationInvocationEvent>,
) {
  const { config } = executionContext.instance;

  if (!config) {
    throw new Error(
      "Provider config must be provided by the exectution environment",
    );
  }

  if (!config.apiToken || !config.serverUrl) {
    throw new IntegrationInstanceConfigError(
      "Config sentinelOne apiToken, and serverUrl must be provided by the user",
    );
  }

  const providerConfig: ProviderConfig = {
    apiToken: config.apiToken,
    serverUrl: config.serverUrl,
  };

  const provider = new ProviderClient(providerConfig);

  try {
    await provider.fetchGroups();
  } catch (err) {
    throw new IntegrationInstanceAuthenticationError(err);
  }
}
