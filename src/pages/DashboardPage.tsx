import { useMemo } from "react";
import { getProblem } from "../lib/api/endpoints";
import { useAsync } from "../hooks/useAsync";
import { useAuth } from "../lib/auth/authContext";
import { useOverview } from "../lib/data/overviewContext";
import {
  acceptanceRate,
  computeStreak,
  deriveProblemStats,
  solvedByCount,
  toDashboardSubmissions,
  unsolvedProblems,
} from "../lib/derive";
import { excerpt, formatCount } from "../lib/format";
import type { DashboardStats } from "../types/dashboard";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DailyChallengeCard } from "../components/dashboard/DailyChallengeCard";
import { ProgressSummaryGrid } from "../components/dashboard/ProgressSummaryGrid";
import { RecommendedCard } from "../components/dashboard/RecommendedCard";
import { RecentSubmissionsCard } from "../components/dashboard/RecentSubmissionsCard";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

const RECENT_LIMIT = 5;

/** Same problem for everyone on a given day, without needing a backend endpoint. */
function pickDailyIndex(count: number, today = new Date()): number {
  if (count === 0) return -1;
  const daysSinceEpoch = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000,
  );
  return daysSinceEpoch % count;
}

export function DashboardPage() {
  const { session } = useAuth();
  const { overview, problems, mine, myRows, loading, error, reload } = useOverview();

  const dailyIndex = pickDailyIndex(problems.length);
  const daily = dailyIndex >= 0 ? problems[dailyIndex] : null;

  // The list projection has no description, so the daily problem is fetched in full.
  const dailyDetail = useAsync(
    (signal) => (daily ? getProblem(daily.slug, signal) : Promise.resolve(null)),
    [daily?.slug],
  );

  const stats = useMemo<DashboardStats>(() => {
    const problemStats = deriveProblemStats(problems);
    const solvedByDifficulty = (difficulty: "Easy" | "Medium" | "Hard") =>
      problems.filter((p) => p.difficulty === difficulty && p.status === "solved").length;

    return {
      totalSolved: problemStats.totalSolved,
      totalProblems: problemStats.totalProblems,
      streakDays: computeStreak(mine),
      acceptance: acceptanceRate(mine),
      difficultyBreakdown: {
        easy: solvedByDifficulty("Easy"),
        medium: solvedByDifficulty("Medium"),
        hard: solvedByDifficulty("Hard"),
      },
    };
  }, [problems, mine]);

  const challenge = useMemo(() => {
    if (!daily || !overview) return null;
    return {
      slug: daily.slug,
      title: daily.title,
      difficulty: daily.difficulty,
      solvedCount: formatCount(solvedByCount(overview, daily.id)),
      description: excerpt(dailyDetail.data?.description),
      languages: ["Python 3", "C++17"],
    };
  }, [daily, overview, dailyDetail.data]);

  const recommended = useMemo(() => unsolvedProblems(problems, 4), [problems]);
  const recent = useMemo(
    () => toDashboardSubmissions(myRows.slice(0, RECENT_LIMIT)),
    [myRows],
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        userName={session?.username ?? "guest"}
        streakDays={stats.streakDays}
        signedIn={Boolean(session)}
      />

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={reload}
        empty={problems.length === 0}
        emptyMessage="No published problems yet — seed the backend to get started."
      >
        <div className="space-y-6">
          {/* Daily challenge + progress summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {challenge && <DailyChallengeCard challenge={challenge} />}
            <ProgressSummaryGrid stats={stats} />
          </div>

          {/* Topic mastery is gone: the API has no tags or topics on problems. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RecentSubmissionsCard submissions={recent} />
            </div>
            <RecommendedCard problems={recommended} />
          </div>
        </div>
      </AsyncBoundary>
    </div>
  );
}
