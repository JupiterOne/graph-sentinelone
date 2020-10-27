import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';

import { IntegrationConfig } from '../types';
import { fetchAccountDetails } from './account';

// import { fetchAgents, fetchGroups } from './agents';

const DEFAULT_SERVER_URL = 'https://usea1-partners.sentinelone.net';
const DEFAULT_API_TOKEN = 'dummy-api-token';

const integrationConfig: IntegrationConfig = {
  serverUrl: process.env.SERVER_URL || DEFAULT_SERVER_URL,
  apiToken: process.env.API_TOKEN || DEFAULT_API_TOKEN,
};

test('should collect data', async () => {
  const context = createMockStepExecutionContext<IntegrationConfig>({
    instanceConfig: integrationConfig,
  });

  // Simulates dependency graph execution.
  // See https://github.com/JupiterOne/sdk/issues/262.
  await fetchAccountDetails(context);
  // await fetchAgents(context);
  // await fetchGroups(context);

  // Review snapshot, failure is a regression
  expect({
    numCollectedEntities: context.jobState.collectedEntities.length,
    numCollectedRelationships: context.jobState.collectedRelationships.length,
    collectedEntities: context.jobState.collectedEntities,
    collectedRelationships: context.jobState.collectedRelationships,
    encounteredTypes: context.jobState.encounteredTypes,
  }).toMatchSnapshot();

  const accounts = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('Account'),
  );
  expect(accounts.length).toBeGreaterThan(0);
  expect(accounts).toMatchGraphObjectSchema({
    _class: ['Account'],
    schema: {
      additionalProperties: false,
      properties: {
        _type: { const: 'sentinelone_account' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    },
  });

  // const users = context.jobState.collectedEntities.filter((e) =>
  //   e._class.includes('User'),
  // );
  // expect(users.length).toBeGreaterThan(0);
  // expect(users).toMatchGraphObjectSchema({
  //   _class: ['User'],
  //   schema: {
  //     additionalProperties: false,
  //     properties: {
  //       _type: { const: 'acme_user' },
  //       firstName: { type: 'string' },
  //       _rawData: {
  //         type: 'array',
  //         items: { type: 'object' },
  //       },
  //     },
  //     required: ['firstName'],
  //   },
  // });

  // const userGroups = context.jobState.collectedEntities.filter((e) =>
  //   e._class.includes('UserGroup'),
  // );
  // expect(userGroups.length).toBeGreaterThan(0);
  // expect(userGroups).toMatchGraphObjectSchema({
  //   _class: ['UserGroup'],
  //   schema: {
  //     additionalProperties: false,
  //     properties: {
  //       _type: { const: 'acme_group' },
  //       logoLink: {
  //         type: 'string',
  //         // Validate that the `logoLink` property has a URL format
  //         format: 'url',
  //       },
  //       _rawData: {
  //         type: 'array',
  //         items: { type: 'object' },
  //       },
  //     },
  //     required: ['logoLink'],
  //   },
  // });
});
