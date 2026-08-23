import type { ApiLanguage, ApiSubmissionStatus } from "./api";
import type { Difficulty } from "./problem";

export interface DailyChallenge {
  slug: string;
  title: string;
  difficulty: Difficulty;
  /** Distinct users with an accepted submission. */
  solvedCount: string;
  description: string;
  languages: string[];
}

export interface DashboardStats {
  totalSolved: number;
  totalProblems: number;
  streakDays: number;
  /** Accepted share of your own submissions, 0–100. */
  acceptance: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface RecommendedProblem {
  slug: string;
  title: string;
  difficulty: Difficulty;
}

export interface DashboardSubmission {
  id: number;
  problemSlug: string;
  problemTitle: string;
  difficulty: Difficulty;
  status: ApiSubmissionStatus;
  runtime: string;
  language: ApiLanguage;
  submittedAt: string;
}
