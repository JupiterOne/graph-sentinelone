import {
  createTestIntegrationExecutionContext,
  IntegrationInstanceConfigError,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { default as initializeContext } from "./initializeContext";
import { ProviderConfig } from "./ProviderClient";

function resetConfig(): ProviderConfig {
  return {
    apiToken: process.env.SENTINELONE_API_TOKEN || "xxx",
    serverUrl: process.env.SENTINELONE_API_SERVERURL || "https://localhost",
  };
}

test("creating SentinelOne client with an undefined config", () => {
  const executionContext = createTestIntegrationExecutionContext();
  expect(executionContext.instance.config).toBeUndefined();
  function initialize() {
    initializeContext(executionContext);
  }
  expect(initialize).toThrowError(Error);
});

test("creating SentinelOne client with a blank token", () => {
  const executionContext = createTestIntegrationExecutionContext();
  executionContext.instance.config = resetConfig();
  executionContext.instance.config.apiToken = "";
  function initialize() {
    initializeContext(executionContext);
  }
  expect(initialize).toThrowError(IntegrationInstanceConfigError);
});

test("creating SentinelOne client with a blank serverUrl", () => {
  const executionContext = createTestIntegrationExecutionContext();
  executionContext.instance.config = resetConfig();
  executionContext.instance.config.serverUrl = "";

  function initialize() {
    initializeContext(executionContext);
  }
  expect(initialize).toThrowError(IntegrationInstanceConfigError);
});

test("creating SentinelOne client with a completed config", () => {
  const executionContext = createTestIntegrationExecutionContext();
  executionContext.instance.config = resetConfig();
  const integrationContext = initializeContext(executionContext);
  expect(integrationContext.provider).toBeDefined();
});
