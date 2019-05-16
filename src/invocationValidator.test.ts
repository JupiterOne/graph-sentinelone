import {
  IntegrationInstanceAuthenticationError,
  IntegrationValidationContext,
} from "@jupiterone/jupiter-managed-integration-sdk";

import invocationValidator from "./invocationValidator";
import makeRequest from "./sentinelone/makeRequest";

jest.mock("./sentinelone/makeRequest");

const mockMakeRequest = makeRequest as jest.Mock;

let validationContext: IntegrationValidationContext;

beforeEach(() => {
  mockMakeRequest.mockResolvedValue([]);

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
  mockMakeRequest.mockRejectedValue({ statusCode: 401 });

  await expect(invocationValidator(validationContext)).rejects.toThrow(
    IntegrationInstanceAuthenticationError,
  );
});

test("invalid credentials and status code is not 401", async () => {
  mockMakeRequest.mockRejectedValue({ statusCode: 222 });

  await expect(invocationValidator(validationContext)).rejects.toEqual({
    statusCode: 222,
  });
});

test("valid config", async () => {
  await invocationValidator(validationContext);
});
