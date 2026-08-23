import { useMemo } from "react";
import { useAuth } from "../lib/auth/authContext";
import { useOverview } from "../lib/data/overviewContext";
import {
  acceptanceRate,
  buildActivityDays,
  toActivityItems,
  toProblemBreakdown,
} from "../lib/derive";
import { achievementBadges, skillScores } from "../data/placeholders";
import type { ProfileUser } from "../types/profile";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { CodingActivityCard } from "../components/profile/CodingActivityCard";
import { RecentActivityCard } from "../components/profile/RecentActivityCard";
import { ProblemsBreakdownCard } from "../components/profile/ProblemsBreakdownCard";
import { SkillMatrixCard } from "../components/profile/SkillMatrixCard";
import { AchievementBadgesCard } from "../components/profile/AchievementBadgesCard";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

const RECENT_LIMIT = 6;

export function ProfilePage() {
  const { session } = useAuth();
  const { problems, mine, myRows, loading, error, reload } = useOverview();

  const user = useMemo<ProfileUser | null>(() => {
    if (!session) return null;
    return {
      username: session.username,
      email: session.email,
      role: session.role,
      stats: {
        problemsSolved: problems.filter((p) => p.status === "solved").length,
        totalSubmissions: mine.length,
        acceptance: acceptanceRate(mine),
      },
    };
  }, [session, problems, mine]);

  const breakdown = useMemo(() => toProblemBreakdown(problems), [problems]);
  const activity = useMemo(() => buildActivityDays(mine), [mine]);
  const recent = useMemo(() => toActivityItems(myRows.slice(0, RECENT_LIMIT)), [myRows]);

  return (
    <AsyncBoundary loading={loading} error={error} onRetry={reload}>
      {user && (
        <div className="space-y-6">
          <ProfileHeader user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <CodingActivityCard data={activity} totalSubmissions={mine.length} />
              <RecentActivityCard items={recent} />
            </div>

            {/* Right column — skills and badges have no API yet, see data/placeholders.ts */}
            <div className="flex flex-col gap-6">
              <ProblemsBreakdownCard data={breakdown} />
              <SkillMatrixCard skills={skillScores} />
              <AchievementBadgesCard badges={achievementBadges} />
            </div>
          </div>
        </div>
      )}
    </AsyncBoundary>
  );
}
