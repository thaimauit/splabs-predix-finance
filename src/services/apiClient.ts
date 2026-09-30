import {env} from '../config/env';

type ApiEnvelope<T> = {
  data: T;
  message: string;
  success: boolean;
};

type ApiErrorEnvelope = {
  message?: string;
};

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  accessToken?: string;
  body?: unknown;
  method?: 'GET' | 'POST';
};

export async function apiRequest<T>(
  path: string,
  {accessToken, body, method = 'GET'}: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, {
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body === undefined ? {} : {'Content-Type': 'application/json'}),
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
    },
    method,
  });
  const payload = (await response.json()) as ApiEnvelope<T> | ApiErrorEnvelope;

  if (!response.ok) {
    throw new ApiError(payload.message ?? 'The request could not be completed.', response.status);
  }

  return (payload as ApiEnvelope<T>).data;
}
