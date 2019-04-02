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

  if (
    !context.instance.config.token ||
    !context.instance.config.scheme ||
    !context.instance.config.host
  ) {
    throw new IntegrationInstanceConfigError(
      "Config sentinelOne token, scheme, and host must be provided by the user",
    );
  }

  const providerConfig: ProviderConfig = {
    token: context.instance.config.token,
    scheme: context.instance.config.scheme,
    host: context.instance.config.host,
  };

  return {
    ...context,
    ...context.clients.getClients(),
    provider: new ProviderClient(providerConfig),
  };
}
