import type { ApiSubmissionStatus } from "../types/api";

/** Design-system colour class per judge verdict, shared by every submission surface. */
export const STATUS_TONE: Record<ApiSubmissionStatus, string> = {
  PENDING: "text-on-surface-variant",
  JUDGING: "text-secondary",
  ACCEPTED: "text-tertiary",
  WRONG_ANSWER: "text-error",
  TIME_LIMIT_EXCEEDED: "text-secondary",
  MEMORY_LIMIT_EXCEEDED: "text-secondary",
  RUNTIME_ERROR: "text-error",
  COMPILE_ERROR: "text-error",
  SYSTEM_ERROR: "text-error",
};

/** The CSS variable behind `STATUS_TONE`, for inline colour-mix backgrounds. */
export const STATUS_ACCENT: Record<ApiSubmissionStatus, string> = {
  PENDING: "--color-on-surface-variant",
  JUDGING: "--color-secondary",
  ACCEPTED: "--color-tertiary",
  WRONG_ANSWER: "--color-error",
  TIME_LIMIT_EXCEEDED: "--color-secondary",
  MEMORY_LIMIT_EXCEEDED: "--color-secondary",
  RUNTIME_ERROR: "--color-error",
  COMPILE_ERROR: "--color-error",
  SYSTEM_ERROR: "--color-error",
};
