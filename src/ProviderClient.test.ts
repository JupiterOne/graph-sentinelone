import {
  getProviderClient,
  ProviderClientMock,
  providerConfigEnv,
} from "../testutil/test.types";
import { Agent, Group, ProviderClient, ProviderConfig } from "./ProviderClient";

const ValidGroupType = ["static", "dynamic"];
const ValidScanStatus = ["started", "none", "finished", "aborted"];
const ValidNetworkStatus = [
  "connected",
  "connecting",
  "disconnected",
  "disconnecting",
];

test("Page through all sentinelOne groups", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());
  let groups: Group[];

  groups = await providerClient.fetchGroups();
  expect(groups).toBeDefined();
  groups.forEach(group => {
    expect(expect.arrayContaining([group.type])).toEqual(ValidGroupType);
  });
});

test("Page through all registered sentinelOne agents", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());
  let agents: Agent[];

  agents = await providerClient.fetchAgents();
  expect(agents).toBeDefined();
  agents.forEach(agent => {
    expect(expect.arrayContaining([agent.scanStatus])).toEqual(ValidScanStatus);
    expect(expect.arrayContaining([agent.networkStatus])).toEqual(
      ValidNetworkStatus,
    );
  });
});

test("Invalid agent token ", async () => {
  const providerConfig: ProviderConfig = providerConfigEnv();
  providerConfig.apiToken = "xxx";
  const providerClient: ProviderClient = getProviderClient(providerConfig);

  if (typeof ProviderClientMock) {
    expect.assertions(0);
  } else {
    expect.assertions(1);
    return providerClient
      .fetchAgents()
      .catch(e => expect(e.toString()).toMatch(/authentication/));
  }
});
