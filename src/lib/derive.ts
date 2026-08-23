/**
 * Pure derivations over what the API actually serves. The backend has no
 * aggregate endpoints (no acceptance rate, no per-user submission feed, no
 * streaks), so the app fetches problems plus their submissions and computes
 * these numbers here.
 */
import type { ProblemSummary, SubmissionResponse } from "../types/api";
import type { ActivityDay, ActivityLevel, ActivityItem, ProblemBreakdown } from "../types/profile";
import type { Difficulty, Problem, ProblemStats, ProblemStatus } from "../types/problem";
import type { DashboardSubmission, RecommendedProblem } from "../types/dashboard";
import type { SubmissionListItem } from "../types/submission";
import { formatMemory, formatRuntime, isPendingStatus, toDateKey, toDifficulty } from "./format";

/** Everything one fan-out over the API yields. */
export interface Overview {
  problems: ProblemSummary[];
  /** Submissions of every user, across every problem. */
  submissions: SubmissionResponse[];
}

const newestFirst = (a: SubmissionResponse, b: SubmissionResponse) =>
  b.createdAt.localeCompare(a.createdAt);

export const mySubmissions = (overview: Overview, userId: number | null) =>
  userId == null
    ? []
    : overview.submissions.filter((s) => s.userId === userId).sort(newestFirst);

/* ------------------------------------------------------------------ problems */

function acceptanceFor(submissions: SubmissionResponse[]): number | null {
  const judged = submissions.filter((s) => !isPendingStatus(s.status));
  if (judged.length === 0) return null;
  const accepted = judged.filter((s) => s.status === "ACCEPTED").length;
  return Math.round((accepted / judged.length) * 1000) / 10;
}

function statusFor(submissions: SubmissionResponse[]): ProblemStatus {
  if (submissions.length === 0) return "unsolved";
  return submissions.some((s) => s.status === "ACCEPTED") ? "solved" : "attempted";
}

export function toProblemRows(overview: Overview, userId: number | null): Problem[] {
  const byProblem = new Map<number, SubmissionResponse[]>();
  for (const submission of overview.submissions) {
    if (submission.problemId == null) continue;
    const bucket = byProblem.get(submission.problemId);
    if (bucket) bucket.push(submission);
    else byProblem.set(submission.problemId, [submission]);
  }

  return overview.problems.map((problem) => {
    const all = byProblem.get(problem.id) ?? [];
    const mine = userId == null ? [] : all.filter((s) => s.userId === userId);
    const latest = mine.sort(newestFirst)[0];

    return {
      id: problem.id,
      slug: problem.slug,
      title: problem.title,
      difficulty: toDifficulty(problem.difficulty),
      acceptance: acceptanceFor(all),
      status: statusFor(mine),
      lastSubmitted: latest?.createdAt ?? null,
    };
  });
}

export function deriveProblemStats(rows: Problem[]): ProblemStats {
  const count = (difficulty: Difficulty, onlySolved: boolean) =>
    rows.filter((r) => r.difficulty === difficulty && (!onlySolved || r.status === "solved")).length;

  return {
    totalSolved: rows.filter((r) => r.status === "solved").length,
    totalProblems: rows.length,
    easySolved: count("Easy", true),
    easyTotal: count("Easy", false),
    mediumSolved: count("Medium", true),
    mediumTotal: count("Medium", false),
    hardSolved: count("Hard", true),
    hardTotal: count("Hard", false),
  };
}

export function toProblemBreakdown(rows: Problem[]): ProblemBreakdown {
  const stats = deriveProblemStats(rows);
  return {
    easy: { solved: stats.easySolved, total: stats.easyTotal },
    medium: { solved: stats.mediumSolved, total: stats.mediumTotal },
    hard: { solved: stats.hardSolved, total: stats.hardTotal },
  };
}

export const unsolvedProblems = (rows: Problem[], limit: number): RecommendedProblem[] =>
  rows
    .filter((r) => r.status !== "solved")
    .slice(0, limit)
    .map(({ slug, title, difficulty }) => ({ slug, title, difficulty }));

/* --------------------------------------------------------------- submissions */

/** Indexes problems by id so submissions can be labelled with title/difficulty. */
export const problemIndex = (problems: ProblemSummary[]) =>
  new Map(problems.map((problem) => [problem.id, problem]));

export function toSubmissionRows(
  submissions: SubmissionResponse[],
  problems: ProblemSummary[],
): SubmissionListItem[] {
  const index = problemIndex(problems);

  return submissions.flatMap((submission) => {
    const problem = submission.problemId == null ? undefined : index.get(submission.problemId);
    if (!problem) return [];
    return [
      {
        id: submission.id,
        problemId: problem.id,
        problemSlug: problem.slug,
        problemTitle: problem.title,
        difficulty: toDifficulty(problem.difficulty),
        status: submission.status,
        language: submission.language,
        runtime: formatRuntime(submission.executionTimeMs),
        memory: formatMemory(submission.memoryUsedKb),
        submittedAt: submission.createdAt,
      },
    ];
  });
}

export const toDashboardSubmissions = (rows: SubmissionListItem[]): DashboardSubmission[] =>
  rows.map((row) => ({
    id: row.id,
    problemSlug: row.problemSlug,
    problemTitle: row.problemTitle,
    difficulty: row.difficulty,
    status: row.status,
    runtime: row.runtime,
    language: row.language,
    submittedAt: row.submittedAt,
  }));

export const toActivityItems = (rows: SubmissionListItem[]): ActivityItem[] =>
  rows.map((row) => ({
    id: row.id,
    title: row.problemTitle,
    problemSlug: row.problemSlug,
    submittedAt: row.submittedAt,
    status: row.status,
    difficulty: row.difficulty,
  }));

/** Accepted share of judged submissions, 0–100 with one decimal. */
export function acceptanceRate(submissions: SubmissionResponse[]): number {
  const judged = submissions.filter((s) => !isPendingStatus(s.status));
  if (judged.length === 0) return 0;
  const accepted = judged.filter((s) => s.status === "ACCEPTED").length;
  return Math.round((accepted / judged.length) * 1000) / 10;
}

/** Distinct users who solved a problem — the closest thing to a "solved count". */
export function solvedByCount(overview: Overview, problemId: number): number {
  const solvers = new Set<number>();
  for (const submission of overview.submissions) {
    if (submission.problemId === problemId && submission.status === "ACCEPTED" && submission.userId != null) {
      solvers.add(submission.userId);
    }
  }
  return solvers.size;
}

/* ----------------------------------------------------------------- activity */

/** Consecutive days ending today (or yesterday) that have at least one submission. */
export function computeStreak(submissions: SubmissionResponse[], today = new Date()): number {
  const days = new Set(submissions.map((s) => toDateKey(new Date(s.createdAt))));
  if (days.size === 0) return 0;

  const cursor = new Date(today);
  if (!days.has(toDateKey(cursor))) {
    // A streak survives until the end of the next day.
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(toDateKey(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const activityLevel = (count: number): ActivityLevel =>
  count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4;

/** A GitHub-style heatmap of the trailing `days` days, oldest first. */
export function buildActivityDays(
  submissions: SubmissionResponse[],
  days = 364,
  today = new Date(),
): ActivityDay[] {
  const counts = new Map<string, number>();
  for (const submission of submissions) {
    const key = toDateKey(new Date(submission.createdAt));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const result: ActivityDay[] = [];
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const key = toDateKey(cursor);
    const count = counts.get(key) ?? 0;
    result.push({ date: key, count, level: activityLevel(count) });
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}
