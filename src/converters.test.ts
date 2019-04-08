import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";
import { getProviderClient, providerConfigEnv } from "../testutil/test.types";
import { Agent, ProviderClient } from "./ProviderClient";

import {
  AGENT_ENTITY_CLASS,
  AGENT_ENTITY_TYPE,
  AgentEntity,
  createAgentEntities,
  createGroupAgentRelationships,
  createGroupEntities,
  GROUP_AGENT_RELATIONSHIP_CLASS,
  GROUP_AGENT_RELATIONSHIP_TYPE,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "./converters";
import { Group } from "./ProviderClient";

test("SentinelOne Group being converted to Group Entity where group = group entity.", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());

  const g: Group[] = await providerClient.fetchGroups();
  expect(g).toBeDefined();

  const groupEntity: GroupEntity[] = createGroupEntities(g);

  for (let i: number = 0; i < g.length; i++) {
    expect(groupEntity[i].id).toEqual(g[i].id);
    expect(groupEntity[i].inherits).toEqual(g[i].inherits);
    expect(groupEntity[i].name).toEqual(g[i].name);
    expect(groupEntity[i].creator).toEqual(g[i].creator);
    expect(groupEntity[i].filterName).toEqual(g[i].filterName);
    expect(groupEntity[i].totalAgents).toEqual(g[i].totalAgents);
    expect(groupEntity[i].filterId).toEqual(g[i].filterId);
    expect(groupEntity[i].rank).toEqual(g[i].rank);
    expect(groupEntity[i].siteId).toEqual(g[i].siteId);
    expect(groupEntity[i].isDefault).toEqual(g[i].isDefault);
    expect(groupEntity[i]._key).toEqual(`${GROUP_ENTITY_TYPE}-id-${g[i].id}`);
    expect(groupEntity[i].displayName).toEqual(`${g[i].name} ${g[i].type}`);
  }
});

test("SentinelOne Agents being converted to Agent Entities where agent = agent entyity.", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());

  const a: Agent[] = await providerClient.fetchAgents();
  expect(a).toBeDefined();

  const agentEntity: AgentEntity[] = createAgentEntities(a);

  for (let i: number = 0; i < a.length; i++) {
    expect(agentEntity[i].id).toEqual(a[i].id);
    expect(agentEntity[i].osName).toEqual(a[i].osName);
    expect(agentEntity[i].osArch).toEqual(a[i].osArch);
    expect(agentEntity[i]._type).toEqual(AGENT_ENTITY_TYPE);
    expect(agentEntity[i]._class).toEqual(AGENT_ENTITY_CLASS);
    expect(agentEntity[i]._key).toEqual(`${AGENT_ENTITY_TYPE}-id-${a[i].id}`);
    expect(agentEntity[i].displayName).toEqual(`${a[i].computerName}`);
  }
});

test("SentinelOne Group has Agent relationships.", async () => {
  const providerClient: ProviderClient = getProviderClient(providerConfigEnv());

  const gEntity: GroupEntity[] = createGroupEntities(
    await providerClient.fetchGroups(),
  );
  const aEntity: AgentEntity[] = createAgentEntities(
    await providerClient.fetchAgents(),
  );
  const groupAgentRel: RelationshipFromIntegration[] = createGroupAgentRelationships(
    gEntity,
    aEntity,
  );

  for (const rel of groupAgentRel) {
    expect(rel._type).toEqual(GROUP_AGENT_RELATIONSHIP_TYPE);
    expect(rel._class).toEqual(GROUP_AGENT_RELATIONSHIP_CLASS);
  }
});
