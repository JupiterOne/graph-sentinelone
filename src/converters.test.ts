import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";
import { ProviderClientMock, providerConfigEnv } from "../testutil/test.types";
import { Agent } from "./ProviderClient";

import {
  AGENT_ENTITY_CLASS,
  AGENT_ENTITY_TYPE,
  AgentEntity,
  createAgentEntities,
  createGroupEntities,
  createSentinelOneGroupAgentRelationships,
  GROUP_AGENT_RELATIONSHIP_CLASS,
  GROUP_AGENT_RELATIONSHIP_TYPE,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "./converters";
import { Group } from "./ProviderClient";

test("SentinelOne Group being converted to Group Entity where group = group entity.", () => {
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfigEnv(),
  );
  const g: Group = providerClient.fetchGroup();
  expect(g).toBeDefined();

  const groupEntity: GroupEntity = createGroupEntities([g])[0];

  expect(groupEntity.id).toEqual(g.id);
  expect(groupEntity.inherits).toEqual(g.inherits);
  expect(groupEntity.name).toEqual(g.name);
  expect(groupEntity.creator).toEqual(g.creator);
  expect(groupEntity.filterName).toEqual(g.filterName);
  expect(groupEntity.totalAgents).toEqual(g.totalAgents);
  expect(groupEntity.filterId).toEqual(g.filterId);
  expect(groupEntity.rank).toEqual(g.rank);
  expect(groupEntity.siteId).toEqual(g.siteId);
  expect(groupEntity.isDefault).toEqual(g.isDefault);
  expect(groupEntity._key).toEqual(`${GROUP_ENTITY_TYPE}-id-${g.id}`);
  expect(groupEntity.displayName).toEqual(`${g.name} ${g.type}`);
});

test("SentinelOne Agents being converted to Agent Entities where agent = agent entyity.", async () => {
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfigEnv(),
  );
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
  const providerClient: ProviderClientMock = new ProviderClientMock(
    providerConfigEnv(),
  );
  const gEntity: GroupEntity[] = createGroupEntities([
    providerClient.fetchGroup(),
  ]);
  const aEntity: AgentEntity[] = createAgentEntities(
    await providerClient.fetchAgents(),
  );
  const groupAgentRel: RelationshipFromIntegration[] = createSentinelOneGroupAgentRelationships(
    gEntity[0],
    aEntity,
  );

  for (let i: number = 0; i < groupAgentRel.length; i++) {
    expect(groupAgentRel[i]._key).toEqual(
      `${gEntity[0]._key}_has_${aEntity[i]._key}`,
    );
    expect(groupAgentRel[i]._type).toEqual(GROUP_AGENT_RELATIONSHIP_TYPE);
    expect(groupAgentRel[i]._class).toEqual(GROUP_AGENT_RELATIONSHIP_CLASS);
    expect(groupAgentRel[i]._fromEntityKey).toEqual(gEntity[0]._key);
    expect(groupAgentRel[i]._toEntityKey).toEqual(aEntity[i]._key);
  }
});
