import { clearSession, currentToken } from "../auth/session";

/**
 * In dev, Vite proxies `/api` to the Spring API (see vite.config.ts) so the
 * browser stays same-origin and no CORS config is needed on the backend.
 */
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api/v1";

export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Record<string, string> | null;

  constructor(status: number, message: string, fieldErrors: Record<string, string> | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  body?: unknown;
  /** Send the stored bearer token. Defaults to true. */
  auth?: boolean;
  signal?: AbortSignal;
}

interface ErrorBody {
  message?: string;
  errors?: Record<string, string>;
}

const FALLBACK_MESSAGES: Record<number, string> = {
  401: "Please sign in to continue.",
  403: "You do not have access to this resource.",
  404: "Not found.",
  409: "That value is already taken.",
};

async function request<T>(
  method: string,
  path: string,
  { body, auth = true, signal }: RequestOptions = {},
): Promise<T> {
  const token = auth ? currentToken() : null;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: {
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === "AbortError") throw cause;
    throw new ApiError(0, "Cannot reach the Judgify API. Is the backend running?");
  }

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    // An expired or rejected token should not keep failing every later request.
    if (response.status === 401 && token) clearSession();

    const error = (payload ?? {}) as ErrorBody;
    const fieldErrors = error.errors ?? null;
    const message =
      error.message ??
      (fieldErrors ? Object.values(fieldErrors)[0] : undefined) ??
      FALLBACK_MESSAGES[response.status] ??
      `Request failed (${response.status})`;
    throw new ApiError(response.status, message, fieldErrors);
  }

  return payload as T;
}

export const apiGet = <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options);
export const apiPost = <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options);
export const apiPut = <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options);
export const apiDelete = <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options);
