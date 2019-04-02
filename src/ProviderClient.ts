import { IntegrationInstanceAuthenticationError } from "@jupiterone/jupiter-managed-integration-sdk";
import "isomorphic-fetch";

export interface Group {
  inherits?: boolean;
  name?: string;
  creator?: string;
  filterName?: string;
  totalAgents?: number;
  filterId?: string;
  rank?: number;
  siteId?: string;
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
  token: string;
  scheme: string;
  host: string;
}

interface Pagination {
  totalItems: number;
  nextCursor: string;
  cursorSet: boolean;
}

export class ProviderClient {
  protected groupPagination: Pagination;
  protected agentPagination: Pagination;
  private agentUrl: string;
  private groupUrl: string;
  private header: {};

  constructor(providerConfig: ProviderConfig) {
    this.groupPagination = { totalItems: 0, nextCursor: "", cursorSet: false };
    this.agentPagination = { totalItems: 0, nextCursor: "", cursorSet: false };

    this.header = {
      headers: { Authorization: `ApiToken ${providerConfig.token}` },
    };
    this.agentUrl = `${providerConfig.scheme}://${
      providerConfig.host
    }/web/api/v2.0/agents`;

    this.groupUrl = `${providerConfig.scheme}://${
      providerConfig.host
    }/web/api/v2.0/groups`;
  }

  public additionalGroupPage(): boolean {
    return this.groupPagination.cursorSet;
  }

  public additionalAgentPage(): boolean {
    return this.agentPagination.cursorSet;
  }

  public async fetchGroups(): Promise<Group[]> {
    try {
      const groups = [];
      if (this.groupPagination.nextCursor !== null) {
        let response: Response;

        if (this.groupPagination.cursorSet) {
          response = await fetch(
            `${this.groupUrl}?cursor=${this.groupPagination.nextCursor}`,
            this.header,
          );
        } else {
          response = await fetch(this.groupUrl, this.header);
        }

        if (response.status === 401) {
          throw new IntegrationInstanceAuthenticationError(
            Error(response.statusText),
          );
        }
        const groupInfo = JSON.parse(JSON.stringify(await response.json()));

        this.groupPagination = this.determineAdditionalPage(
          groupInfo.pagination.nextCursor,
          groupInfo.pagination.totalItems,
        );

        for (const group of groupInfo.data) {
          groups.push(this.mapToGroup(group));
        }
      }
      return groups;
    } catch (error) {
      throw error;
    }
  }

  public async fetchAgents(): Promise<Agent[]> {
    try {
      const agents = [];
      if (this.agentPagination.nextCursor !== null) {
        let response: Response;

        if (this.agentPagination.cursorSet) {
          response = await fetch(
            `${this.agentUrl}?cursor=${this.agentPagination.nextCursor}`,
            this.header,
          );
        } else {
          response = await fetch(this.agentUrl, this.header);
        }

        if (response.status === 401) {
          throw new IntegrationInstanceAuthenticationError(
            Error(response.statusText),
          );
        }
        const agentInfo = JSON.parse(JSON.stringify(await response.json()));

        this.agentPagination = this.determineAdditionalPage(
          agentInfo.pagination.nextCursor,
          agentInfo.pagination.totalItems,
        );

        for (const agent of agentInfo.data) {
          agents.push(this.mapToAgent(agent));
        }
      }
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
