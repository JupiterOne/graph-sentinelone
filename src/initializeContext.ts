import {
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { ProviderClient } from "./ProviderClient";

export interface SentinelOneExecutionContext
  extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ProviderClient;
}

export default function initializeContext(
  context: IntegrationExecutionContext,
): SentinelOneExecutionContext {
  return {
    ...context,
    ...context.clients.getClients(),
    provider: new ProviderClient(context.instance.config),
  };
}
