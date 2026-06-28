import type { Difficulty } from "./problem";

export interface DailyChallenge {
  problemId: number;
  title: string;
  difficulty: Difficulty;
  points: number;
  solvedCount: string;
  description: string;
  languages: string[];
}

export interface DashboardStats {
  totalSolved: number;
  totalProblems: number;
  streakDays: number;
  acceptance: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export type MasteryTone = "tertiary" | "primary" | "muted";

export interface TopicMastery {
  name: string;
  percent: number;
  tone: MasteryTone;
}

export interface RecommendedProblem {
  id: number;
  title: string;
  difficulty: Difficulty;
  timeAgo: string;
}

export type SubmissionResult = "accepted" | "wrong";

export interface DashboardSubmission {
  id: number;
  problemTitle: string;
  difficulty: Difficulty;
  result: SubmissionResult;
  runtime: string;
  language: string;
  timeAgo: string;
}

export interface DashboardData {
  userName: string;
  streakDays: number;
  challenge: DailyChallenge;
  stats: DashboardStats;
  topics: TopicMastery[];
  recommended: RecommendedProblem[];
  submissions: DashboardSubmission[];
}
