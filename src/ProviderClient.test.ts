import { getProviderClient, providerConfigEnv } from "../testutil/test.types";
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
  let i = 0;
  do {
    groups = await providerClient.fetchGroups();
    expect(groups).toBeDefined();
    groups.forEach(group => {
      expect(expect.arrayContaining([group.type])).toEqual(ValidGroupType);
    });
  } while (providerClient.additionalGroupPage() && i++ < 1);
});

test("Page through all registered sentinelOne agents", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());
  let agents: Agent[];
  let i = 0;
  do {
    agents = await providerClient.fetchAgents();
    expect(agents).toBeDefined();
    agents.forEach(agent => {
      expect(expect.arrayContaining([agent.scanStatus])).toEqual(
        ValidScanStatus,
      );
      expect(expect.arrayContaining([agent.networkStatus])).toEqual(
        ValidNetworkStatus,
      );
    });
  } while (providerClient.additionalAgentPage() && i++ < 1);
});

test("Invalid agent token ", async () => {
  const providerConfig: ProviderConfig = providerConfigEnv();
  providerConfig.token = "xxx";
  const providerClient: ProviderClient = getProviderClient(providerConfig);

  try {
    await providerClient.fetchAgents();
  } catch (error) {
    expect.hasAssertions();
  }
});
