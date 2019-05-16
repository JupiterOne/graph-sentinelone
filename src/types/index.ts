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
  updatedAt?: number;
  type?: string;
  id: string;
  createdAt?: number;
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
  updatedAt?: number;
  osType?: string;
  id: string;
  createdAt?: number;
  externalIp?: string;
  computerName?: string;
  modelName?: string;
  uuid?: string;
  encryptedApplications?: boolean;
  adComputerDistinguishedName?: string;
  osUsername?: string;
  groupName?: string;
  infected?: boolean;
  policyUpdatedAt?: number;
  cpuId?: string;
  registeredAt?: number;
  activeThreats?: number;
  groupUpdatedAt?: number;
  machineType?: string;
  groupIp?: string;
  osStartTime?: number;
  osRevision?: string;
  scanAbortedAt?: number;
  siteId?: string;
  scanStartedAt?: number;
  isPendingUninstall?: boolean;
  scanFinishedAt?: number;
  lastActiveDate?: number;
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
