/**
 * Wire types for the Judgify backend (`/api/v1`). These mirror the DTO records in
 * the `core` module — keep them in sync with `core/src/main/java/com/judgify/core`.
 */

export type ApiDifficulty = "EASY" | "MEDIUM" | "HARD";

/** Languages the judge engine supports. */
export type ApiLanguage = "PYTHON3" | "CPP17";

export type ApiSubmissionStatus =
  | "PENDING"
  | "JUDGING"
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILE_ERROR"
  | "SYSTEM_ERROR";

export type ApiRole = "USER" | "ADMIN";

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  role: ApiRole;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

/** `GET /problems` — the list projection, deliberately narrow. */
export interface ProblemSummary {
  id: number;
  title: string;
  slug: string;
  difficulty: ApiDifficulty;
}

/** `GET /problems/{slug}` — the full problem, `description` is Markdown. */
export interface ProblemDetailResponse {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  difficulty: ApiDifficulty;
  timeLimitMs: number;
  memoryLimitMb: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Admin-only: hidden test cases are never exposed to regular users. */
export interface TestCaseResponse {
  id: number;
  problemId: number;
  input: string;
  expectedOutput: string;
  sample: boolean;
  orderIndex: number | null;
  createdAt: string;
}

export interface SubmissionTestResult {
  id: number;
  status: ApiSubmissionStatus;
  runtimeMs: number | null;
  memoryKb: number | null;
  errorMessage: string | null;
}

export interface SubmissionResponse {
  id: number;
  userId: number | null;
  problemId: number | null;
  language: ApiLanguage;
  status: ApiSubmissionStatus;
  errorMessage: string | null;
  executionTimeMs: number | null;
  memoryUsedKb: number | null;
  createdAt: string;
  /** `null` until the judge worker finishes. */
  judgedAt: string | null;
  /** Only populated by `GET /submissions/{id}`; `null` in list responses. */
  testResults: SubmissionTestResult[] | null;
}

export interface SubmissionCreatePayload {
  language: ApiLanguage;
  sourceCode: string;
}
