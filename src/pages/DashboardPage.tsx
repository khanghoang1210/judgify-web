import { dashboardData } from "../data/dashboard";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DailyChallengeCard } from "../components/dashboard/DailyChallengeCard";
import { ProgressSummaryGrid } from "../components/dashboard/ProgressSummaryGrid";
import { TopicMasteryCard } from "../components/dashboard/TopicMasteryCard";
import { RecommendedCard } from "../components/dashboard/RecommendedCard";
import { RecentSubmissionsCard } from "../components/dashboard/RecentSubmissionsCard";

export function DashboardPage() {
  const {
    userName,
    streakDays,
    challenge,
    stats,
    topics,
    recommended,
    submissions,
  } = dashboardData;

  return (
    <div className="space-y-8">
      <DashboardHeader userName={userName} streakDays={streakDays} />

      {/* Daily challenge + progress summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DailyChallengeCard challenge={challenge} />
        <ProgressSummaryGrid stats={stats} />
      </div>

      {/* Topic mastery + recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <TopicMasteryCard topics={topics} />
        <RecommendedCard problems={recommended} />
      </div>

      <RecentSubmissionsCard submissions={submissions} />
    </div>
  );
}
