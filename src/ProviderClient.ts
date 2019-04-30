import makeRequest from "./sentinelone/makeRequest";
import {
  SentinelOneAgent,
  SentinelOneApiPagination,
  SentinelOneGroup,
} from "./sentinelone/types";

export interface ProviderConfig {
  apiToken: string;
  serverUrl: string;
}

export class ProviderClient {
  private serverUrl: string;
  private header: {};

  constructor(providerConfig: ProviderConfig) {
    this.header = {
      headers: { Authorization: `ApiToken ${providerConfig.apiToken}` },
    };
    this.serverUrl = providerConfig.serverUrl;
  }

  public async fetchGroups(): Promise<SentinelOneGroup[]> {
    return this.fetchData<SentinelOneGroup>(
      `${this.serverUrl}/web/api/v2.0/groups`,
    );
  }

  public async fetchAgents(): Promise<SentinelOneAgent[]> {
    return this.fetchData<SentinelOneAgent>(
      `${this.serverUrl}/web/api/v2.0/agents`,
    );
  }

  private async fetchData<T>(resourceUrl: string): Promise<T[]> {
    const collection = [];

    let pagination: SentinelOneApiPagination | undefined;
    do {
      const url = paginatedUrl(resourceUrl, pagination);
      const response = await makeRequest<T>(`${url}`, this.header);
      pagination = response.pagination;

      if (response.data) {
        collection.push(...response.data);
      }
    } while (pagination && pagination.totalItems > collection.length);

    return collection;
  }
}

function paginatedUrl(
  url: string,
  pagination?: SentinelOneApiPagination,
): string {
  return pagination ? `${url}&cursor=${pagination.nextCursor}` : url;
}
