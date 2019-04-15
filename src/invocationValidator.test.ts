import {
  IntegrationExecutionContext,
  IntegrationInstanceAuthenticationError,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { invocationValidator } from "./";
import { ProviderClient } from "./ProviderClient";

jest.mock("./ProviderClient");

let executionContext: IntegrationExecutionContext<IntegrationInvocationEvent>;

beforeEach(() => {
  (ProviderClient as jest.Mock).mockImplementation(() => {
    return {
      fetchGroups: () => {
        return [];
      },
    };
  });

  executionContext = {
    instance: {
      config: {
        apiToken: "thetoken",
        serverUrl: "theurl",
      },
    },
  } as IntegrationExecutionContext<IntegrationInvocationEvent>;
});

test("undefined config", async () => {
  delete executionContext.instance.config;
  await expect(invocationValidator(executionContext)).rejects.toThrowError(
    /config must be provided/,
  );
});

test("blank token", async () => {
  executionContext.instance.config.apiToken = "";
  await expect(invocationValidator(executionContext)).rejects.toThrowError(
    /apiToken/,
  );
});

test("blank serverUrl", async () => {
  executionContext.instance.config.serverUrl = "";
  await expect(invocationValidator(executionContext)).rejects.toThrowError(
    /serverUrl/,
  );
});

test("invalid credentials", async () => {
  (ProviderClient as jest.Mock).mockImplementation(() => {
    return {
      fetchGroups: () => {
        throw new Error("auth failure");
      },
    };
  });

  await expect(invocationValidator(executionContext)).rejects.toThrow(
    IntegrationInstanceAuthenticationError,
  );
});

test("valid config", async () => {
  await expect(invocationValidator(executionContext)).resolves.toBeUndefined();
});
