import { getProviderClient, providerConfigEnv } from "../testutil/test.types";
import { Agent, ProviderClient, ProviderConfig } from "./ProviderClient";

test("Listing all registered sentinelOne agents", async () => {
  const ValidScanStatus = ["started", "none", "finished", "aborted"];
  const ValidNetworkStatus = [
    "connected",
    "connecting",
    "disconnected",
    "disconnecting",
  ];
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());
  const agents: Agent[] = await providerClient.fetchAgents();
  expect(agents).toBeDefined();
  agents.forEach(agent => {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(agent, undefined, 2));

    expect(expect.arrayContaining([agent.scanStatus])).toEqual(ValidScanStatus);
    expect(expect.arrayContaining([agent.networkStatus])).toEqual(
      ValidNetworkStatus,
    );
  });
});

test("Invalid agent token ", async () => {
  const providerConfig: ProviderConfig = providerConfigEnv();
  providerConfig.token = "xxx";
  const providerClient: ProviderClient = getProviderClient(providerConfig);

  if (providerClient instanceof ProviderClient) {
    try {
      await providerClient.fetchAgents();
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error.message());
      expect.hasAssertions();
    }
  } else {
    // tslint:disable-next-line:no-console
    console.log("Token test skipped, mock client");
  }
});
