import type { ApiRole, AuthResponse } from "../../types/api";

/**
 * The signed-in user, kept in localStorage so a refresh does not sign you out.
 * `userId` is not part of `AuthResponse`, so it is read from the JWT payload —
 * it is needed to tell your own submissions apart from everyone else's.
 */
export interface Session {
  token: string;
  userId: number;
  username: string;
  email: string;
  role: ApiRole;
  /** Unix ms, from the token's `exp` claim. */
  expiresAt: number;
}

const STORAGE_KEY = "judgify.session";

interface JwtPayload {
  userId?: number;
  username?: string;
  email?: string;
  role?: ApiRole;
  exp?: number;
}

/** Reads the JWT payload without verifying it — the API is the only authority. */
function decodeJwt(token: string): JwtPayload | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function sessionFromAuth(auth: AuthResponse): Session | null {
  const claims = decodeJwt(auth.token);
  if (!claims?.userId) return null;
  return {
    token: auth.token,
    userId: claims.userId,
    username: auth.username,
    email: auth.email,
    role: auth.role,
    expiresAt: claims.exp ? claims.exp * 1000 : Date.now(),
  };
}

export function loadSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as Session;
    if (!session.token || session.expiresAt <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Used by the API client to attach `Authorization` without importing React. */
export function currentToken(): string | null {
  return loadSession()?.token ?? null;
}
