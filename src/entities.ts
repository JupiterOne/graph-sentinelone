import { SchemaType } from '@jupiterone/integration-sdk-core';
import { createEntityType, createEntityMetadata } from './helpers';

export const [AccountEntityMetadata, createAccountAssignEntity] =
  createEntityMetadata({
    resourceName: 'Account',
    _class: ['Account'],
    _type: createEntityType('account'),
    description: 'SentinelOne Account',
    schema: SchemaType.Object({}),
  });

export const [GroupEntityMetadata, createGroupAssignEntity] =
  createEntityMetadata({
    resourceName: 'Group',
    _class: ['Group'],
    _type: createEntityType('group'),
    description: 'SentinelOne Group',
    schema: SchemaType.Object({
      inherits: SchemaType.Optional(SchemaType.Boolean()),
      creator: SchemaType.Optional(SchemaType.String()),
      filterName: SchemaType.Optional(SchemaType.String()),
      totalAgents: SchemaType.Optional(SchemaType.Number()),
      filterId: SchemaType.Optional(SchemaType.String()),
      rank: SchemaType.Optional(SchemaType.Number()),
      siteId: SchemaType.String(),
      isDefault: SchemaType.Optional(SchemaType.Boolean()),
      creatorId: SchemaType.Optional(SchemaType.String()),
      updatedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use updatedOn instead',
        }),
      ),
      createdAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use createdOn instead',
        }),
      ),
      type: SchemaType.Optional(SchemaType.String()),
    }),
  });

export const [AgentEntityMetadata, createAgentAssignEntity] =
  createEntityMetadata({
    resourceName: 'Agent',
    _class: ['HostAgent'],
    _type: createEntityType('agent'),
    description: 'SentinelOne Agent',
    schema: SchemaType.Object({
      domain: SchemaType.Optional(SchemaType.String()),
      appsVulnerabilityStatus: SchemaType.Optional(SchemaType.String()),
      siteName: SchemaType.Optional(SchemaType.String()),
      coreCount: SchemaType.Optional(SchemaType.Number()),
      totalMemory: SchemaType.Optional(SchemaType.Number()),
      inRemoteShellSession: SchemaType.Optional(
        SchemaType.Boolean({
          deprecated: true,
          description: 'Please use isInRemoteShellSession instead',
        }),
      ),
      isInRemoteShellSession: SchemaType.Optional(SchemaType.Boolean()),
      osArch: SchemaType.Optional(SchemaType.String()),
      allowRemoteShell: SchemaType.Optional(SchemaType.Boolean()),
      scanStatus: SchemaType.Optional(SchemaType.String()),
      consoleMigrationStatus: SchemaType.Optional(SchemaType.String()),
      updatedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use updatedOn instead',
        }),
      ),
      osType: SchemaType.Optional(SchemaType.String()),
      createdAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use createdOn instead',
        }),
      ),
      externalIp: SchemaType.Optional(SchemaType.String()),
      computerName: SchemaType.Optional(SchemaType.String()),
      modelName: SchemaType.Optional(SchemaType.String()),
      uuid: SchemaType.Optional(SchemaType.String()),
      encryptedApplications: SchemaType.Optional(SchemaType.Boolean()),
      adComputerDistinguishedName: SchemaType.Optional(SchemaType.String()),
      osUsername: SchemaType.Optional(SchemaType.String()),
      groupName: SchemaType.Optional(SchemaType.String()),
      infected: SchemaType.Optional(
        SchemaType.Boolean({
          deprecated: true,
          description: 'Please use isInfected instead',
        }),
      ),
      isInfected: SchemaType.Optional(SchemaType.Boolean()),
      policyUpdatedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use policyUpdatedOn instead',
        }),
      ),
      policyUpdatedOn: SchemaType.Optional(SchemaType.Number()),
      cpuId: SchemaType.Optional(SchemaType.String()),
      registeredAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use registeredOn instead',
        }),
      ),
      registeredOn: SchemaType.Optional(SchemaType.Number()),
      activeThreats: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use activeThreatsCount instead',
        }),
      ),
      activeThreatsCount: SchemaType.Optional(SchemaType.Number()),
      groupUpdatedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use groupUpdatedOn instead',
        }),
      ),
      groupUpdatedOn: SchemaType.Optional(SchemaType.Number()),
      machineType: SchemaType.Optional(SchemaType.String()),
      groupIp: SchemaType.Optional(SchemaType.String()),
      osStartTime: SchemaType.Optional(SchemaType.Number()),
      osRevision: SchemaType.Optional(SchemaType.String()),
      scanAbortedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use scanAbortedOn instead',
        }),
      ),
      scanAbortedOn: SchemaType.Optional(SchemaType.Number()),
      siteId: SchemaType.Optional(SchemaType.String()),
      scanStartedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use scanStartedOn instead',
        }),
      ),
      scanStartedOn: SchemaType.Optional(SchemaType.Number()),
      isPendingUninstall: SchemaType.Optional(SchemaType.Boolean()),
      scanFinishedAt: SchemaType.Optional(
        SchemaType.Number({
          deprecated: true,
          description: 'Please use scanFinishedOn instead',
        }),
      ),
      scanFinishedOn: SchemaType.Optional(SchemaType.Number()),
      lastActiveDate: SchemaType.Optional(SchemaType.Number()),
      groupId: SchemaType.String(),
      isActive: SchemaType.Optional(SchemaType.Boolean()),
      agentVersion: SchemaType.Optional(SchemaType.String()),
      networkStatus: SchemaType.Optional(SchemaType.String()),
      lastLoggedInUserName: SchemaType.Optional(SchemaType.String()),
      osName: SchemaType.Optional(SchemaType.String()),
      mitigationMode: SchemaType.Optional(SchemaType.String()),
      cpuCount: SchemaType.Optional(SchemaType.Number()),
      isUninstalled: SchemaType.Optional(SchemaType.Boolean()),
      isUpToDate: SchemaType.Optional(SchemaType.Boolean()),
      isDecommissioned: SchemaType.Optional(SchemaType.Boolean()),
      mitigationModeSuspicious: SchemaType.Optional(SchemaType.String()),
      serial: SchemaType.Optional(SchemaType.String()),
      macAddress: SchemaType.Optional(
        SchemaType.Array(
          SchemaType.String({
            deprecated: true,
            description: 'Please use macAddresses instead',
          }),
        ),
      ),
      macAddresses: SchemaType.Optional(
        SchemaType.Array(
          SchemaType.String({
            description:
              'For IPv4, it excludes addresses within private ranges like 10.x.x.x, 172.16.x.x to 172.31.x.x, 192.168.x.x, and APIPA range 169.254.x.x. For IPv6, it excludes Unique Local Addresses (ULA) starting with fc00:: or fd00:: and link-local addresses starting with fe80::. MAC addresses from the top-level of the asset data are included, assuming they are associated with public IPs unless specified otherwise.',
          }),
        ),
      ),
      missingPermissions: SchemaType.Optional(
        SchemaType.Array(SchemaType.String()),
      ),
    }),
  });
