/* tslint:disable:no-console */
import {
  createLocalInvocationEvent,
  executeSingleHandlerLocal,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { createLogger, TRACE } from "bunyan";
import { executionHandler } from "../src/index";
import { ProviderConfig } from "../src/ProviderClient";

async function run(): Promise<void> {
  const logger = createLogger({ name: "local", level: TRACE });

  if (
    !process.env.SENTINELONE_API_TOKEN ||
    !process.env.SENTINELONE_API_HOST ||
    !process.env.SENTINELONE_API_SCHEME
  ) {
    throw new Error(
      "Local execution requires the SENTINELONE CONFIG variables be set",
    );
  }

  const integrationConfig: ProviderConfig = {
    token: process.env.SENTINELONE_API_TOKEN,
    host: process.env.SENTINELONE_API_HOST,
    scheme: process.env.SENTINELONE_API_SCHEME,
  };

  const invocationArgs = {
    // providerPrivateKey: process.env.PROVIDER_LOCAL_EXECUTION_PRIVATE_KEY
  };

  logger.info(
    await executeSingleHandlerLocal(
      integrationConfig,
      logger,
      executionHandler,
      invocationArgs,
      createLocalInvocationEvent(),
    ),
    "Execution completed successfully!",
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
