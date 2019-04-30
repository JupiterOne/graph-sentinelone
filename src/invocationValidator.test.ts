import {
  IntegrationInstanceAuthenticationError,
  IntegrationValidationContext,
} from "@jupiterone/jupiter-managed-integration-sdk";

import invocationValidator from "./invocationValidator";
import { ProviderClient } from "./ProviderClient";

jest.mock("./ProviderClient");

let validationContext: IntegrationValidationContext;

beforeEach(() => {
  (ProviderClient as jest.Mock).mockImplementation(() => {
    return {
      fetchGroups: () => {
        return [];
      },
    };
  });

  validationContext = {
    instance: {
      config: {
        apiToken: "thetoken",
        serverUrl: "theurl",
      },
    },
  } as IntegrationValidationContext;
});

test("undefined config", async () => {
  delete validationContext.instance.config;
  await expect(invocationValidator(validationContext)).rejects.toThrowError(
    /config must be provided/,
  );
});

test("blank token", async () => {
  validationContext.instance.config.apiToken = "";
  await expect(invocationValidator(validationContext)).rejects.toThrowError(
    /apiToken/,
  );
});

test("blank serverUrl", async () => {
  validationContext.instance.config.serverUrl = "";
  await expect(invocationValidator(validationContext)).rejects.toThrowError(
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

  await expect(invocationValidator(validationContext)).rejects.toThrow(
    IntegrationInstanceAuthenticationError,
  );
});

test("valid config", async () => {
  await expect(invocationValidator(validationContext)).resolves.toBeUndefined();
});
