import fetch, { Request, RequestInit } from 'node-fetch';

import { IntegrationProviderAuthenticationError } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './types';

export interface SentinelOneApiResponse<T> {
  data?: T[];
  errors?: object[];
  pagination: SentinelOneApiPagination;
}

export interface SentinelOneApiPagination {
  totalItems: number;
  nextCursor?: string;
}

export interface SentinelOneGroup {
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

export interface SentinelOneAgent {
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

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export interface SentinelOneAPIClientConfig {
  apiToken: string;
  serverUrl: string;
}

export class SentinelOneAPIClient {
  private serverUrl: string;
  private header: {};

  constructor(readonly config: SentinelOneAPIClientConfig) {
    this.header = {
      headers: { Authorization: `ApiToken ${config.apiToken}` },
    };
    this.serverUrl = config.serverUrl;
  }

  public async verifyAuthentication(): Promise<void> {
    const endpoint = `${this.serverUrl}/web/api/v2.0/system/info`;
    try {
      await makeRequest<any>(endpoint, this.header);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  /**
   * Iterates each agent resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateAgents(
    iteratee: ResourceIteratee<SentinelOneAgent>,
  ): Promise<void> {
    return this.iterateData(`${this.serverUrl}/web/api/v2.0/agents`, iteratee);
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateGroups(
    iteratee: ResourceIteratee<SentinelOneGroup>,
  ): Promise<void> {
    return this.iterateData(`${this.serverUrl}/web/api/v2.0/groups`, iteratee);
  }

  private async iterateData<T>(
    resourceUrl: string,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    let pagination: SentinelOneApiPagination | undefined;
    do {
      const url = paginatedUrl(resourceUrl, pagination);
      const response = await makeRequest<T>(`${url}`, this.header);
      pagination = response.pagination;

      if (response.data) {
        for (const resource of response.data) {
          await iteratee(resource);
        }
      }
    } while (pagination && pagination.nextCursor);
  }
}

export function createAPIClient(
  config: IntegrationConfig,
): SentinelOneAPIClient {
  return new SentinelOneAPIClient(config);
}

async function makeRequest<T>(
  url: string | Request,
  init?: RequestInit,
): Promise<SentinelOneApiResponse<T>> {
  const response = await fetch(url, init);
  if (response.status === 404) {
    return { pagination: { totalItems: 0 } };
  } else if (response.status >= 400) {
    const cause = {
      name: 'SentinelOneApiError',
      message: response.statusText,
      statusCode: response.status,
    };

    Error.captureStackTrace(cause, makeRequest);

    throw cause;
  } else {
    return response.json();
  }
}

function paginatedUrl(
  url: string,
  pagination?: SentinelOneApiPagination,
): string {
  const limitUrl = `${url}?limit=100`;
  return pagination ? `${limitUrl}&cursor=${pagination.nextCursor}` : limitUrl;
}
