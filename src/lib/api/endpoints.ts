import type {
  AuthResponse,
  LoginPayload,
  ProblemDetailResponse,
  ProblemSummary,
  RegisterPayload,
  SubmissionCreatePayload,
  SubmissionResponse,
} from "../../types/api";
import { apiGet, apiPost } from "./client";

/* ---------------------------------------------------------------------- auth */

export const register = (payload: RegisterPayload) =>
  apiPost<AuthResponse>("/auth/register", { body: payload, auth: false });

export const login = (payload: LoginPayload) =>
  apiPost<AuthResponse>("/auth/login", { body: payload, auth: false });

/* ------------------------------------------------------------------ problems */

/** Public: published problems only. */
export const listProblems = (signal?: AbortSignal) =>
  apiGet<ProblemSummary[]>("/problems", { auth: false, signal });

/** Public: the backend addresses problem detail by slug, not id. */
export const getProblem = (slug: string, signal?: AbortSignal) =>
  apiGet<ProblemDetailResponse>(`/problems/${encodeURIComponent(slug)}`, { auth: false, signal });

/* --------------------------------------------------------------- submissions */

export const createSubmission = (problemId: number, payload: SubmissionCreatePayload) =>
  apiPost<SubmissionResponse>(`/problems/${problemId}/submissions`, { body: payload });

/** Includes per-test-case results. */
export const getSubmission = (id: number, signal?: AbortSignal) =>
  apiGet<SubmissionResponse>(`/submissions/${id}`, { signal });

/** Every user's submissions for a problem, newest first. */
export const listProblemSubmissions = (problemId: number, signal?: AbortSignal) =>
  apiGet<SubmissionResponse[]>(`/problems/${problemId}/submissions`, { signal });
