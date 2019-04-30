/* tslint:disable:no-console */
import { executeIntegrationLocal } from "@jupiterone/jupiter-managed-integration-sdk";
import invocationConfig from "../src/index";

const integrationConfig = {
  apiToken: process.env.SENTINELONE_LOCAL_EXECUTION_API_TOKEN,
  serverUrl: process.env.SENTINELONE_LOCAL_EXECUTION_API_URL,
};

executeIntegrationLocal(integrationConfig, invocationConfig, {}).catch(err => {
  console.error(err);
  process.exit(1);
});
