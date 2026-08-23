export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemStatus = "solved" | "attempted" | "unsolved";

/**
 * A problem row as the UI shows it. `acceptance`, `status` and `lastSubmitted`
 * are derived from submissions, which the API only serves to signed-in users —
 * hence the nullable fields.
 */
export interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  /** Accepted / total submissions across all users, or null when unknown. */
  acceptance: number | null;
  status: ProblemStatus;
  /** ISO timestamp of your latest submission, or null. */
  lastSubmitted: string | null;
}

export interface ProblemStats {
  totalSolved: number;
  totalProblems: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}
