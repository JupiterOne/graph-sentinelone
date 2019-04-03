import {
  Agent,
  Group,
  ProviderClient,
  ProviderConfig,
} from "../src/ProviderClient";

export class ProviderClientMock extends ProviderClient {
  public async fetchAgents(): Promise<Agent[]> {
    const agentInfo = JSON.parse(JSON.stringify(this.mockAgentFetch()));
    const agents = [];

    this.agentPagination = this.determineAdditionalPage(
      agentInfo.pagination.nextCursor,
      agentInfo.pagination.totalItems,
    );

    for (const agent of agentInfo.data) {
      agents.push(super.mapToAgent(agent));
    }
    return agents;
  }

  public async fetchGroups(): Promise<Group[]> {
    const groupInfo = JSON.parse(JSON.stringify(this.mockGroupFetch()));
    const groups = [];

    this.groupPagination = this.determineAdditionalPage(
      groupInfo.pagination.nextCursor,
      groupInfo.pagination.totalItems,
    );

    for (const group of groupInfo.data) {
      groups.push(super.mapToGroup(group));
    }
    return groups;
  }

  private mockGroupFetch(): {} {
    return {
      pagination: {
        totalItems: 3,
        nextCursor: "YWdlbnRfaWQ6NTgwMjkzODE=",
      },
      errors: [{}],
      data: [
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
          id: "225494730938493805",
          createdAt: "2018-02-27T04:49:26.257525Z",
        },
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
          type: "dynamic",
          id: "225494730938493806",
          createdAt: "2018-02-27T04:49:26.257525Z",
        },
      ],
    };
  }

  private mockAgentFetch(): {} {
    return {
      pagination: {
        totalItems: 3,
        nextCursor: "YWdlbnRfaWQ6NTgwMjkzODE=",
      },
      errors: [{}],
      data: [
        {
          domain: "mybusiness.net",
          appsVulnerabilityStatus: "up_to_date",
          siteName: "225494730938493804",
          coreCount: 8,
          totalMemory: 8192,
          inRemoteShellSession: true,
          osArch: "32 bit",
          allowRemoteShell: true,
          scanStatus: "started",
          consoleMigrationStatus: "Failed",
          updatedAt: "2018-02-27T04:49:26.257525Z",
          osType: "windows",
          userActionsNeeded: ["user_action_needed"],
          id: "325494730938493804",
          createdAt: "2018-02-27T04:49:26.257525Z",
          networkInterfaces: [
            {
              inet: ["192.168.0.1", "192.168.0.2"],
              physical: "00:25:96:FF:FE:12:34:56",
              id: "225494730938493804",
              name: "string",
              inet6: ["2001:db8:a0b:12f0::1", "2001:db8:a0b:12f0::2"],
            },
          ],
          externalIp: "31.155.5.7",
          computerName: "JOHN-WIN-4125",
          modelName: "Acme computers - 15x4k",
          uuid: "ff819e70af13be381993075eb0ce5f2f6de05be2",
          encryptedApplications: true,
          activeDirectory: {
            computerDistinguishedName:
              "CN=TEMP-T470P,CN=Computers,DC=sentinelone,DC=com",
            lastUserMemberOf: [
              "CN=Users,DC=sentinelone,DC=com",
              "CN=Managers,CN=Users,DC=sentinelone,DC=com",
            ],
            computerMemberOf: [
              "CN=Computers,DC=sentinelone,DC=com",
              "CN=Servers,CN=Computers,DC=sentinelone,DC=com",
            ],
            lastUserDistinguishedName:
              "CN=John Doe,CN=Users,DC=sentinelone,DC=com",
          },
          osUsername: "string",
          groupName: "string",
          infected: true,
          policyUpdatedAt: "2018-02-27T04:49:26.257525Z",
          cpuId: "Acme chips inc. Pro5555 @ 3.33GHz",
          registeredAt: "2018-02-27T04:49:26.257525Z",
          activeThreats: 3,
          groupUpdatedAt: "2018-02-27T04:49:26.257525Z",
          machineType: "unknown",
          groupIp: "31.155.5.x",
          osStartTime: "2018-02-27T04:49:26.257525Z",
          osRevision: "string",
          scanAbortedAt: "2018-02-27T04:49:26.257525Z",
          siteId: "225494730938493804",
          scanStartedAt: "2018-02-27T04:49:26.257525Z",
          isPendingUninstall: true,
          scanFinishedAt: "2018-02-27T04:49:26.257525Z",
          lastActiveDate: "2018-02-27T04:49:26.257525Z",
          groupId: "225494730938493804",
          isActive: true,
          agentVersion: "2.5.0.2417",
          licenseKey: "string",
          networkStatus: "connected",
          lastLoggedInUserName: "janedoe3",
          osName: "Windows 10",
          mitigationMode: "protect",
          cpuCount: 2,
          isUninstalled: true,
          isUpToDate: true,
          mitigationModeSuspicious: "protect",
          isDecommissioned: true,
        },
        {
          domain: "mybusiness.net",
          appsVulnerabilityStatus: "up_to_date",
          siteName: "225494730938493805",
          coreCount: 8,
          totalMemory: 8192,
          inRemoteShellSession: true,
          osArch: "32 bit",
          allowRemoteShell: true,
          scanStatus: "finished",
          consoleMigrationStatus: "Failed",
          updatedAt: "2018-02-27T04:49:26.257525Z",
          osType: "windows",
          userActionsNeeded: ["user_action_needed"],
          id: "325494730938493805",
          createdAt: "2018-02-27T04:49:26.257525Z",
          networkInterfaces: [
            {
              inet: ["192.168.0.1", "192.168.0.2"],
              physical: "00:25:96:FF:FE:12:34:56",
              id: "225494730938493805",
              name: "string",
              inet6: ["2001:db8:a0b:12f0::1", "2001:db8:a0b:12f0::2"],
            },
          ],
          externalIp: "31.155.5.7",
          computerName: "JOHN-WIN-4125",
          modelName: "Acme computers - 15x4k",
          uuid: "ff819e70af13be381993075eb0ce5f2f6de05be2",
          encryptedApplications: true,
          activeDirectory: {
            computerDistinguishedName:
              "CN=TEMP-T470P,CN=Computers,DC=sentinelone,DC=com",
            lastUserMemberOf: [
              "CN=Users,DC=sentinelone,DC=com",
              "CN=Managers,CN=Users,DC=sentinelone,DC=com",
            ],
            computerMemberOf: [
              "CN=Computers,DC=sentinelone,DC=com",
              "CN=Servers,CN=Computers,DC=sentinelone,DC=com",
            ],
            lastUserDistinguishedName:
              "CN=John Doe,CN=Users,DC=sentinelone,DC=com",
          },
          osUsername: "string",
          groupName: "string",
          infected: true,
          policyUpdatedAt: "2018-02-27T04:49:26.257525Z",
          cpuId: "Acme chips inc. Pro5555 @ 3.33GHz",
          registeredAt: "2018-02-27T04:49:26.257525Z",
          activeThreats: 3,
          groupUpdatedAt: "2018-02-27T04:49:26.257525Z",
          machineType: "unknown",
          groupIp: "31.155.5.x",
          osStartTime: "2018-02-27T04:49:26.257525Z",
          osRevision: "string",
          scanAbortedAt: "2018-02-27T04:49:26.257525Z",
          siteId: "225494730938493804",
          scanStartedAt: "2018-02-27T04:49:26.257525Z",
          isPendingUninstall: true,
          scanFinishedAt: "2018-02-27T04:49:26.257525Z",
          lastActiveDate: "2018-02-27T04:49:26.257525Z",
          groupId: "225494730938493804",
          isActive: true,
          agentVersion: "2.5.0.2417",
          licenseKey: "string",
          networkStatus: "disconnecting",
          lastLoggedInUserName: "janedoe3",
          osName: "Windows 10",
          mitigationMode: "protect",
          cpuCount: 2,
          isUninstalled: true,
          isUpToDate: true,
          mitigationModeSuspicious: "protect",
          isDecommissioned: true,
        },
        {
          domain: "mybusiness.net",
          appsVulnerabilityStatus: "up_to_date",
          siteName: "225494730938493805",
          coreCount: 8,
          totalMemory: 8192,
          inRemoteShellSession: true,
          osArch: "32 bit",
          allowRemoteShell: true,
          scanStatus: "finished",
          consoleMigrationStatus: "Failed",
          updatedAt: "2018-02-27T04:49:26.257525Z",
          osType: "windows",
          userActionsNeeded: ["user_action_needed"],
          id: "325494730938493806",
          createdAt: "2018-02-27T04:49:26.257525Z",
          networkInterfaces: [
            {
              inet: ["192.168.0.1", "192.168.0.2"],
              physical: "00:25:96:FF:FE:12:34:56",
              id: "225494730938493805",
              name: "string",
              inet6: ["2001:db8:a0b:12f0::1", "2001:db8:a0b:12f0::2"],
            },
          ],
          externalIp: "31.155.5.7",
          computerName: "JOHN-WIN-4125",
          modelName: "Acme computers - 15x4k",
          uuid: "ff819e70af13be381993075eb0ce5f2f6de05be2",
          encryptedApplications: true,
          activeDirectory: {
            computerDistinguishedName:
              "CN=TEMP-T470P,CN=Computers,DC=sentinelone,DC=com",
            lastUserMemberOf: [
              "CN=Users,DC=sentinelone,DC=com",
              "CN=Managers,CN=Users,DC=sentinelone,DC=com",
            ],
            computerMemberOf: [
              "CN=Computers,DC=sentinelone,DC=com",
              "CN=Servers,CN=Computers,DC=sentinelone,DC=com",
            ],
            lastUserDistinguishedName:
              "CN=John Doe,CN=Users,DC=sentinelone,DC=com",
          },
          osUsername: "string",
          groupName: "string",
          infected: true,
          policyUpdatedAt: "2018-02-27T04:49:26.257525Z",
          cpuId: "Acme chips inc. Pro5555 @ 3.33GHz",
          registeredAt: "2018-02-27T04:49:26.257525Z",
          activeThreats: 3,
          groupUpdatedAt: "2018-02-27T04:49:26.257525Z",
          machineType: "unknown",
          groupIp: "31.155.5.x",
          osStartTime: "2018-02-27T04:49:26.257525Z",
          osRevision: "string",
          scanAbortedAt: "2018-02-27T04:49:26.257525Z",
          siteId: "225494730938493804",
          scanStartedAt: "2018-02-27T04:49:26.257525Z",
          isPendingUninstall: true,
          scanFinishedAt: "2018-02-27T04:49:26.257525Z",
          lastActiveDate: "2018-02-27T04:49:26.257525Z",
          groupId: "225494730938493806",
          isActive: true,
          agentVersion: "2.5.0.2417",
          licenseKey: "string",
          networkStatus: "disconnecting",
          lastLoggedInUserName: "janedoe3",
          osName: "Windows 10",
          mitigationMode: "protect",
          cpuCount: 2,
          isUninstalled: true,
          isUpToDate: true,
          mitigationModeSuspicious: "protect",
          isDecommissioned: true,
        },
      ],
    };
  }
} // end of class

export function getProviderClient(
  providerConfig: ProviderConfig,
): ProviderClient {
  return process.env.SENTINELONE_API_INTEGRATION !== undefined &&
    process.env.SENTINELONE_API_INTEGRATION === "1"
    ? new ProviderClient(providerConfig)
    : new ProviderClientMock(providerConfig);
}

export function providerConfigEnv(): ProviderConfig {
  return {
    apiToken: process.env.SENTINELONE_API_TOKEN || "token",
    serverUrl: process.env.SENTINELONE_API_SERVERURL || "https://localhost",
  };
}
