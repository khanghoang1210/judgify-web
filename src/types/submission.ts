import type { Difficulty } from "./problem";

export type SubmissionVerdict =
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Runtime Error"
  | "Compilation Error";

export interface SubmissionListItem {
  id: number;
  problemId: number;
  problemTitle: string;
  difficulty: Difficulty;
  verdict: SubmissionVerdict;
  language: string;
  runtime: string;
  memory: string;
  submittedAgo: string;
}

export interface PerformanceStat {
  label: string;
  value: string;
  beats: number;
}

export interface SubmissionResult {
  id: number;
  problemId: number;
  problemTitle: string;
  verdict: SubmissionVerdict;
  language: string;
  fileName: string;
  submittedAgo: string;
  testCasesPassed: number;
  testCasesTotal: number;
  runtime: PerformanceStat;
  memory: PerformanceStat;
  code: string;
  timeLimit: string;
  memoryLimit: string;
  rankUpTitle: string;
  rankUpMessage: string;
}
