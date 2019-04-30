import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export type AccountEntity = EntityFromIntegration;

export interface GroupEntity extends EntityFromIntegration {
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

export interface AgentEntity extends EntityFromIntegration {
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
