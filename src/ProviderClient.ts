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
  // userActionsNeeded: string[];
  id: string;
  createdAt?: string;
  // networkInterfaces: NetworkInterface[];
  externalIp?: string;
  computerName?: string;
  modelName?: string;
  uuid?: string;
  encryptedApplications?: boolean;
  // activeDirectory: ActiveDirectory;
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
  groupId?: string;
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

export class ProviderClient {
  private agentUrl: string;
  private groupUrl: string;

  constructor(providerConfig: ProviderConfig) {
    this.agentUrl = `${providerConfig.scheme}://${
      providerConfig.host
    }/web/api/v2.0/agents?apiToken=${providerConfig.token}`;

    this.groupUrl = `${providerConfig.scheme}://${
      providerConfig.host
    }/web/api/v2.0/groups?apiToken=${providerConfig.token}`;
  }

  public async fetchGroups(): Promise<Group[]> {
    try {
      const response: Response = await fetch(this.groupUrl);
      if (response.status === 401) {
        throw new IntegrationInstanceAuthenticationError(
          Error(response.statusText),
        );
      }
      const groupInfo = JSON.parse(JSON.stringify(await response.json()));
      const groups = [];

      for (const group of groupInfo.data) {
        groups.push(group);
      }
      return groups;
    } catch (error) {
      throw error;
    }
  }

  public async fetchAgents(): Promise<Agent[]> {
    try {
      const response: Response = await fetch(this.agentUrl);
      if (response.status === 401) {
        throw new IntegrationInstanceAuthenticationError(
          Error(response.statusText),
        );
      }
      const agentInfo = JSON.parse(JSON.stringify(await response.json()));
      const agents = [];

      for (const agent of agentInfo.data) {
        agents.push(this.mapToAgent(agent));
      }
      return agents;
    } catch (error) {
      throw error;
    }
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
      // userActionsNeeded: string[];
      id: agent.id,
      createdAt: agent.createdAt,
      // networkInterfaces: NetworkInterface[];
      externalIp: agent.externalIp,
      computerName: agent.computerName,
      modelName: agent.modelName,
      uuid: agent.uuid,
      encryptedApplications: agent.encryptedApplications,
      // activeDirectory: ActiveDirectory;
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
