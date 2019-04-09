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

test("Invalid group fetch ", async () => {
  const providerConfig: ProviderConfig = {
    apiToken: "xxx",
    serverUrl: "https://localhost",
  };
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfig,
  );

  expect.assertions(1);
  return providerClient
    .fetchGroupsInfo()
    .catch(e => expect(e.toString()).toMatch(/FetchError/));
});

test("Invalid group fetch cursorSet", async () => {
  const providerConfig: ProviderConfig = {
    apiToken: "xxx",
    serverUrl: "https://localhost",
  };
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfig,
  );

  expect.assertions(1);
  providerClient.setGroupPagination(0, "", true);
  return providerClient
    .fetchGroupsInfo()
    .catch(e => expect(e.toString()).toMatch(/FetchError/));
});

test("Invalid agent fetch ", async () => {
  const providerConfig: ProviderConfig = {
    apiToken: "xxx",
    serverUrl: "https://localhost",
  };
  const providerClient: ProviderClient = getProviderClient(providerConfig);

  expect.assertions(1);
  return providerClient
    .fetchAgentsInfo()
    .catch(e => expect(e.toString()).toMatch(/FetchError/));
});

test("Invalid agent fetch cursorSet", async () => {
  const providerConfig: ProviderConfig = {
    apiToken: "xxx",
    serverUrl: "https://localhost",
  };
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfig,
  );

  expect.assertions(1);
  providerClient.setAgentPagination(0, "", true);
  return providerClient
    .fetchAgentsInfo()
    .catch(e => expect(e.toString()).toMatch(/FetchError/));
});
