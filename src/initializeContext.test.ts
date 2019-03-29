import {
  createTestIntegrationExecutionContext,
  IntegrationInstanceConfigError,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { default as initializeContext } from "./initializeContext";
import { ProviderConfig } from "./ProviderClient";

function resetConfig(): ProviderConfig {
  return {
    token: process.env.SENTINELONE_API_TOKEN || "xxx",
    host: process.env.SENTINELONE_API_HOST || "localhost",
    scheme: process.env.SENTINELONE_API_SCHEME || "https",
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
  executionContext.instance.config.token = "";
  function initialize() {
    initializeContext(executionContext);
  }
  expect(initialize).toThrowError(IntegrationInstanceConfigError);
});

test("creating SentinelOne client with a blank host", () => {
  const executionContext = createTestIntegrationExecutionContext();
  executionContext.instance.config = resetConfig();
  executionContext.instance.config.host = "";

  function initialize() {
    initializeContext(executionContext);
  }
  expect(initialize).toThrowError(IntegrationInstanceConfigError);
});

test("creating SentinelOne client with a blank scheme", () => {
  const executionContext = createTestIntegrationExecutionContext();
  executionContext.instance.config = resetConfig();
  executionContext.instance.config.scheme = "";

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
