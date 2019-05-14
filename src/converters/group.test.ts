import { SentinelOneGroup } from "../sentinelone/types";
import { createGroupEntities } from "./groups";

test("convert group entity", () => {
  const groups: SentinelOneGroup[] = [
    {
      inherits: true,
      name: "name",
      creator: "creator",
      filterName: "filterName",
      totalAgents: 0,
      filterId: "filterId",
      rank: 1,
      siteId: "siteId",
      isDefault: true,
      creatorId: "creatorId",
      updatedAt: "2019-04-22T21:43:53.000Z",
      type: "type",
      id: "id",
      createdAt: "2019-04-22T21:43:53.000Z",
    },
  ];
  expect(createGroupEntities(groups)).toEqual([
    {
      _class: "Group",
      _key: "sentinelone_group-id-id",
      _type: "sentinelone_group",
      createdAt: 1555969433000,
      creator: "creator",
      creatorId: "creatorId",
      displayName: "name type",
      filterId: "filterId",
      filterName: "filterName",
      id: "id",
      inherits: true,
      isDefault: true,
      name: "name",
      rank: 1,
      siteId: "siteId",
      totalAgents: 0,
      type: "type",
      updatedAt: 1555969433000,
    },
  ]);
});
