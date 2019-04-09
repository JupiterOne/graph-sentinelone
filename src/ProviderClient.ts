import { IntegrationInstanceAuthenticationError } from "@jupiterone/jupiter-managed-integration-sdk";
import "isomorphic-fetch";

export interface Account {
  updatedAt: string;
  id: string;
  createdAt: string;
  name: string;
}

export interface Group {
  inherits?: boolean;
  name?: string;
  creator?: string;
  filterName?: string;
  totalAgents?: number;
  filterId?: string;
  rank?: number;
  siteId: string;
  isDefault?: boolean;
  creatorId?: string;
  updatedAt?: string;
  type?: string;
  id: string;
  createdAt?: string;
}

export interface Agent {
  domain?: string;
  appsVulnerabilityStatus?: string;
  siteName?: string;
  coreCount?: number;
  totalMemory?: number;
  inRemoteShellSession?: boolean;
  osArch?: string;
  allowRemoteShell?: boolean;
  scanStatus?: string;
  consoleMigrationStatus?: string;
  updatedAt?: string;
  osType?: string;
  id: string;
  createdAt?: string;
  externalIp?: string;
  computerName?: string;
  modelName?: string;
  uuid?: string;
  encryptedApplications?: boolean;
  adComputerDistinguishedName?: string;
  osUsername?: string;
  groupName?: string;
  infected?: boolean;
  policyUpdatedAt?: string;
  cpuId?: string;
  registeredAt?: string;
  activeThreats?: number;
  groupUpdatedAt?: string;
  machineType?: string;
  groupIp?: string;
  osStartTime?: string;
  osRevision?: string;
  scanAbortedAt?: string;
  siteId?: string;
  scanStartedAt?: string;
  isPendingUninstall?: boolean;
  scanFinishedAt?: string;
  lastActiveDate?: string;
  groupId: string;
  isActive?: boolean;
  agentVersion?: string;
  licenseKey?: string;
  networkStatus?: string;
  lastLoggedInUserName?: string;
  osName?: string;
  mitigationMode?: string;
  cpuCount?: number;
  isUninstalled?: boolean;
  isUpToDate?: boolean;
  mitigationModeSuspicious?: string;
  isDecommissioned?: boolean;
}

export interface ProviderConfig {
  apiToken: string;
  serverUrl: string;
}

export interface Pagination {
  totalItems: number;
  nextCursor: string;
  cursorSet: boolean;
}

export class ProviderClient {
  protected accountPagination: Pagination;
  protected groupPagination: Pagination;
  protected agentPagination: Pagination;
  private accountUrl: string;
  private agentUrl: string;
  private groupUrl: string;
  private header: {};

  private accountInfoCallback: any;
  private groupInfoCallback: any;
  private agentInfoCallback: any;

  constructor(
    providerConfig: ProviderConfig,
    accountInfoCallback?: () => Promise<{}>,
    groupInfoCallback?: () => Promise<{}>,
    agentInfoCallback?: () => Promise<{}>,
  ) {
    this.accountPagination = {
      totalItems: 0,
      nextCursor: "",
      cursorSet: false,
    };
    this.groupPagination = { totalItems: 0, nextCursor: "", cursorSet: false };
    this.agentPagination = { totalItems: 0, nextCursor: "", cursorSet: false };

    this.header = {
      headers: { Authorization: `ApiToken ${providerConfig.apiToken}` },
    };
    this.accountUrl = `${
      providerConfig.serverUrl
    }/web/api/v2.0/private/accounts`;

    this.agentUrl = `${providerConfig.serverUrl}/web/api/v2.0/agents`;

    this.groupUrl = `${providerConfig.serverUrl}/web/api/v2.0/groups`;

    this.accountInfoCallback =
      accountInfoCallback === undefined
        ? this.fetchAccountsInfo
        : accountInfoCallback;
    this.groupInfoCallback =
      groupInfoCallback === undefined
        ? this.fetchGroupsInfo
        : groupInfoCallback;
    this.agentInfoCallback =
      agentInfoCallback === undefined
        ? this.fetchAgentsInfo
        : agentInfoCallback;
  }

  public async fetchAccountsInfo(): Promise<{}> {
    let response: Response;
    try {
      if (this.accountPagination.cursorSet) {
        response = await fetch(
          `${this.accountUrl}&cursor=${this.accountPagination.nextCursor}`,
          this.header,
        );
      } else {
        response = await fetch(this.accountUrl, this.header);
      }

      if (response.status >= 400) {
        throw new IntegrationInstanceAuthenticationError(
          Error(response.statusText),
        );
      }
    } catch (error) {
      throw error;
    }
    return await response.json();
  }

  public async fetchGroupsInfo(): Promise<{}> {
    let response: Response;
    try {
      if (this.groupPagination.cursorSet) {
        response = await fetch(
          `${this.groupUrl}&cursor=${this.groupPagination.nextCursor}`,
          this.header,
        );
      } else {
        response = await fetch(this.groupUrl, this.header);
      }

      if (response.status >= 400) {
        throw new IntegrationInstanceAuthenticationError(
          Error(response.statusText),
        );
      }
    } catch (error) {
      throw error;
    }
    return await response.json();
  }

  public async fetchAccounts(): Promise<Account[]> {
    try {
      const accounts = [];

      do {
        const accountInfo = JSON.parse(
          JSON.stringify(await this.accountInfoCallback()),
        );

        this.accountPagination = this.determineAdditionalPage(
          accountInfo.pagination.nextCursor,
          accountInfo.pagination.totalItems,
        );

        for (const account of accountInfo.data) {
          accounts.push(this.mapToAccount(account));
        }
      } while (this.accountPagination.cursorSet);

      return accounts;
    } catch (error) {
      throw error;
    }
  }

  public async fetchGroups(): Promise<Group[]> {
    try {
      const groups = [];

      do {
        const groupInfo = JSON.parse(
          JSON.stringify(await this.groupInfoCallback()),
        );

        this.groupPagination = this.determineAdditionalPage(
          groupInfo.pagination.nextCursor,
          groupInfo.pagination.totalItems,
        );

        for (const group of groupInfo.data) {
          groups.push(this.mapToGroup(group));
        }
      } while (this.groupPagination.cursorSet);

      return groups;
    } catch (error) {
      throw error;
    }
  }

  public async fetchAgentsInfo(): Promise<Agent[]> {
    let response: Response;
    try {
      if (this.agentPagination.cursorSet) {
        response = await fetch(
          `${this.agentUrl}&cursor=${this.agentPagination.nextCursor}`,
          this.header,
        );
      } else {
        response = await fetch(this.agentUrl, this.header);
      }

      if (response.status >= 400) {
        throw new IntegrationInstanceAuthenticationError(
          Error(response.statusText),
        );
      }
    } catch (error) {
      throw error;
    }

    return await response.json();
  }

  public async fetchAgents(): Promise<Agent[]> {
    try {
      const agents = [];

      do {
        const agentInfo = JSON.parse(
          JSON.stringify(await this.agentInfoCallback()),
        );

        this.agentPagination = this.determineAdditionalPage(
          agentInfo.pagination.nextCursor,
          agentInfo.pagination.totalItems,
        );

        for (const agent of agentInfo.data) {
          agents.push(this.mapToAgent(agent));
        }
      } while (this.agentPagination.cursorSet);

      return agents;
    } catch (error) {
      throw error;
    }
  }

  protected determineAdditionalPage(
    nextCursor: string,
    totalItems: number,
  ): Pagination {
    let cursorSet: boolean = false;
    if (nextCursor === null) {
      cursorSet = false;
    } else {
      cursorSet = true;
    }
    return { totalItems, nextCursor, cursorSet };
  }

  protected mapToAccount(a: string): Account {
    const account = JSON.parse(JSON.stringify(a));

    return {
      updatedAt: account.updatedAt,
      id: account.id,
      createdAt: account.createdAt,
      name: account.name,
    };
  }

  protected mapToGroup(g: string): Group {
    const group = JSON.parse(JSON.stringify(g));

    return {
      inherits: group.inherits,
      name: group.name,
      creator: group.creator,
      filterName: group.filterName,
      totalAgents: group.totalAgents,
      filterId: group.filterId,
      rank: group.rank,
      siteId: group.siteId,
      isDefault: group.isDefault,
      creatorId: group.creatorId,
      updatedAt: group.updatedAt,
      type: group.type,
      id: group.id,
      createdAt: group.createdAt,
    };
  }

  protected mapToAgent(a: string): Agent {
    const agent = JSON.parse(JSON.stringify(a));

    return {
      domain: agent.domain,
      appsVulnerabilityStatus: agent.appsVulnerabilityStatus,
      siteName: agent.siteName,
      coreCount: agent.coreCount,
      totalMemory: agent.totalMemory,
      inRemoteShellSession: agent.inRemoteShellSession,
      osArch: agent.osArch,
      allowRemoteShell: agent.allowRemoteShell,
      scanStatus: agent.scanStatus,
      consoleMigrationStatus: agent.consoleMigrationStatus,
      updatedAt: agent.updatedAt,
      osType: agent.osType,
      id: agent.id,
      createdAt: agent.createdAt,
      externalIp: agent.externalIp,
      computerName: agent.computerName,
      modelName: agent.modelName,
      uuid: agent.uuid,
      encryptedApplications: agent.encryptedApplications,
      adComputerDistinguishedName:
        agent.activeDirectory.ComputerDistinguishedName,
      osUsername: agent.osUsername,
      groupName: agent.groupName,
      infected: agent.infected,
      policyUpdatedAt: agent.policyUpdatedAt,
      cpuId: agent.cpuId,
      registeredAt: agent.registeredAt,
      activeThreats: agent.activeThreats,
      groupUpdatedAt: agent.groupUpdatedAt,
      machineType: agent.machineType,
      groupIp: agent.groupIp,
      osStartTime: agent.osStartTime,
      osRevision: agent.osRevision,
      scanAbortedAt: agent.scanAbortedAt,
      siteId: agent.siteId,
      scanStartedAt: agent.scanStartedAt,
      isPendingUninstall: agent.isPendingUninstall,
      scanFinishedAt: agent.scanFinishedAt,
      lastActiveDate: agent.lastActiveDate,
      groupId: agent.groupId,
      isActive: agent.isActive,
      agentVersion: agent.agentVersion,
      licenseKey: agent.licenseKey,
      networkStatus: agent.networkStatus,
      lastLoggedInUserName: agent.lastLoggedInUserName,
      osName: agent.osName,
      mitigationMode: agent.mitigationMode,
      cpuCount: agent.cpuCount,
      isUninstalled: agent.isUninstalled,
      isUpToDate: agent.isUpToDate,
      mitigationModeSuspicious: agent.mitigationModeSuspicious,
      isDecommissioned: agent.isDecommissioned,
    };
  }
} // end of class
