import type { ApiDifficulty, ApiLanguage, ApiSubmissionStatus } from "../types/api";
import type { Difficulty } from "../types/problem";

/* ------------------------------------------------------------------- labels */

const DIFFICULTY_LABELS: Record<ApiDifficulty, Difficulty> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export const toDifficulty = (difficulty: ApiDifficulty): Difficulty =>
  DIFFICULTY_LABELS[difficulty];

export const LANGUAGE_LABELS: Record<ApiLanguage, string> = {
  PYTHON3: "Python 3",
  CPP17: "C++17",
};

/** Everything the judge engine can return, in UI wording. */
export const STATUS_LABELS: Record<ApiSubmissionStatus, string> = {
  PENDING: "Pending",
  JUDGING: "Judging",
  ACCEPTED: "Accepted",
  WRONG_ANSWER: "Wrong Answer",
  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
  MEMORY_LIMIT_EXCEEDED: "Memory Limit Exceeded",
  RUNTIME_ERROR: "Runtime Error",
  COMPILE_ERROR: "Compile Error",
  SYSTEM_ERROR: "System Error",
};

const SOURCE_EXTENSIONS: Record<ApiLanguage, string> = {
  PYTHON3: "py",
  CPP17: "cpp",
};

export const sourceFileName = (language: ApiLanguage) =>
  `solution.${SOURCE_EXTENSIONS[language]}`;

/** A submission still in the judge queue has no verdict to show yet. */
export const isPendingStatus = (status: ApiSubmissionStatus) =>
  status === "PENDING" || status === "JUDGING";

/* ------------------------------------------------------------------ numbers */

export function formatRuntime(ms: number | null | undefined): string {
  if (ms == null) return "—";
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
}

export function formatMemory(kb: number | null | undefined): string {
  if (kb == null) return "—";
  return kb < 1024 ? `${kb}KB` : `${(kb / 1024).toFixed(1)}MB`;
}

export const formatTimeLimit = (ms: number) => `${(ms / 1000).toFixed(2)}s`;
export const formatMemoryLimit = (mb: number) => `${mb}MB`;

/** Compact counts, e.g. 45200 → "45.2k". */
export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1)}k`;
}

/* -------------------------------------------------------------------- dates */

/**
 * The API returns `LocalDateTime` with no zone offset, which `Date` parses as
 * local time — correct as long as the API and the browser share a timezone,
 * which they do in local development.
 */
export const parseApiDate = (value: string) => new Date(value);

const UNITS: [limitSeconds: number, seconds: number, label: string][] = [
  [60, 1, "second"],
  [3600, 60, "minute"],
  [86400, 3600, "hour"],
  [2592000, 86400, "day"],
  [31536000, 2592000, "month"],
  [Infinity, 31536000, "year"],
];

export function timeAgo(value: string | null | undefined, now = Date.now()): string {
  if (!value) return "—";
  const elapsed = Math.max(0, (now - parseApiDate(value).getTime()) / 1000);
  if (elapsed < 45) return "just now";

  for (const [limit, seconds, label] of UNITS) {
    if (elapsed < limit) {
      const amount = Math.round(elapsed / seconds);
      return `${amount} ${label}${amount === 1 ? "" : "s"} ago`;
    }
  }
  return "a long time ago";
}

/** Local `YYYY-MM-DD`, the key used by the activity heatmap. */
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * First prose paragraph of a Markdown document, for card summaries. Skips
 * headings, list items and fenced code.
 */
export function excerpt(markdown: string | null | undefined, maxLength = 220): string {
  if (!markdown) return "";
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const paragraph: string[] = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const trimmed = line.trim();
    if (trimmed === "") {
      if (paragraph.length) break;
      continue;
    }
    if (/^(#{1,6}\s|[-*]\s)/.test(trimmed)) {
      if (paragraph.length) break;
      continue;
    }
    paragraph.push(trimmed);
  }

  const text = paragraph.join(" ").replace(/[`*]/g, "");
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}
