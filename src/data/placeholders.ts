/**
 * The last of the mock data. Everything here has no backend endpoint yet:
 * per-topic skill scores, achievements and the leaderboard (`src/data/leaderboard.ts`)
 * are all out of scope for the API's MVP. Replace these when the endpoints land.
 */
import type { AchievementBadge, SkillScore } from "../types/profile";

export const skillScores: SkillScore[] = [
  { name: "DP", value: 85 },
  { name: "MATH", value: 70 },
  { name: "GRAPHS", value: 60 },
  { name: "STRING", value: 75 },
  { name: "SEARCH", value: 65 },
];

export const achievementBadges: AchievementBadge[] = [
  { id: "first-sub", name: "First Submission", icon: "star", earned: true },
  { id: "weekly-winner", name: "Weekly Winner", icon: "trophy", earned: true },
  { id: "lan-solver", name: "Lan Solver", icon: "zap", earned: false },
];
