import {
  GraphClient,
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { ProviderClient } from "./ProviderClient";

export interface SentinelOneExecutionContext
  extends IntegrationExecutionContext<IntegrationInvocationEvent> {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ProviderClient;
}

export default function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): SentinelOneExecutionContext {
  return {
    ...context,
    ...context.clients.getClients(),
    provider: new ProviderClient(context.instance.config),
  };
}
