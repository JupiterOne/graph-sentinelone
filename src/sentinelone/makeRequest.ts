import fetch, { Request, RequestInit } from "node-fetch";
import { SentinelOneApiResponse } from "./types";

export default async function makeRequest<T>(
  url: string | Request,
  init?: RequestInit,
): Promise<SentinelOneApiResponse<T>> {
  const response = await fetch(url, init);
  if (response.status === 404) {
    return { pagination: { totalItems: 0 } };
  } else if (response.status >= 400) {
    const cause = {
      name: "SentinelOneApiError",
      message: response.statusText,
      statusCode: response.status,
    };

    Error.captureStackTrace(cause, makeRequest);

    throw cause;
  } else {
    return response.json();
  }
}
