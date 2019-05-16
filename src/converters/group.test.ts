import { SentinelOneGroup } from "../sentinelone/types";
import { createGroupEntities } from "./groups";

test("convert group entity", () => {
  const groups: SentinelOneGroup[] = [
    {
      inherits: true,
      name: "string",
      creator: "string",
      filterName: "string",
      totalAgents: 0,
      filterId: "225494730938493804",
      rank: 1,
      siteId: "225494730938493804",
      isDefault: true,
      creatorId: "225494730938493804",
      updatedAt: "2018-02-27T04:49:26.257525Z",
      type: "static",
      id: "225494730938493804",
      createdAt: "2018-02-27T04:49:26.257525Z",
    },
  ];
  expect(createGroupEntities(groups)).toEqual([
    {
      _class: "Group",
      _key: "sentinelone_group-id-225494730938493804",
      _type: "sentinelone_group",
      createdAt: 1519706966257,
      creator: "string",
      creatorId: "225494730938493804",
      displayName: "string static",
      filterId: "225494730938493804",
      filterName: "string",
      id: "225494730938493804",
      inherits: true,
      isDefault: true,
      name: "string",
      rank: 1,
      siteId: "225494730938493804",
      totalAgents: 0,
      type: "static",
      updatedAt: 1519706966257,
    },
  ]);
});
