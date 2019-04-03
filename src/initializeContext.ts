import {
  GraphClient,
  IntegrationExecutionContext,
  IntegrationInstanceConfigError,
  IntegrationInvocationEvent,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { ProviderClient, ProviderConfig } from "./ProviderClient";

export interface SentinelOneExecutionContext
  extends IntegrationExecutionContext<IntegrationInvocationEvent> {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ProviderClient;
}

export default function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): SentinelOneExecutionContext {
  if (!context.instance.config) {
    throw new Error(
      "Provider config must be provided by the exectution environment",
    );
  }

  if (!context.instance.config.apiToken || !context.instance.config.serverUrl) {
    throw new IntegrationInstanceConfigError(
      "Config sentinelOne apiToken, and serverUrl must be provided by the user",
    );
  }

  const providerConfig: ProviderConfig = {
    apiToken: context.instance.config.apiToken,
    serverUrl: context.instance.config.serverUrl,
  };

  return {
    ...context,
    ...context.clients.getClients(),
    provider: new ProviderClient(providerConfig),
  };
}
