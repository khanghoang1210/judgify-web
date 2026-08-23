import type { ApiSubmissionStatus } from "./api";
import type { Difficulty } from "./problem";

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface ActivityDay {
  /** Local `YYYY-MM-DD`. */
  date: string;
  count: number;
  level: ActivityLevel;
}

export interface ActivityItem {
  id: number;
  title: string;
  problemSlug: string;
  submittedAt: string;
  status: ApiSubmissionStatus;
  difficulty: Difficulty;
}

export interface ProblemBreakdown {
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
}

export interface SkillScore {
  name: string;
  value: number;
}

export interface AchievementBadge {
  id: string;
  name: string;
  icon: "star" | "trophy" | "zap" | "award" | "flame";
  earned: boolean;
}

export interface ProfileUser {
  username: string;
  email: string;
  role: string;
  stats: {
    problemsSolved: number;
    totalSubmissions: number;
    acceptance: number;
  };
}
