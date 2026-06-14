import { ProfileHeader } from "../components/profile/ProfileHeader";
import { CodingActivityCard } from "../components/profile/CodingActivityCard";
import { RecentActivityCard } from "../components/profile/RecentActivityCard";
import { ProblemsBreakdownCard } from "../components/profile/ProblemsBreakdownCard";
import { SkillMatrixCard } from "../components/profile/SkillMatrixCard";
import { AchievementBadgesCard } from "../components/profile/AchievementBadgesCard";
import {
    profileUser,
    recentActivity,
    problemBreakdown,
    skillScores,
    achievementBadges,
    activityData,
    totalSubmissions,
} from "../data/profile";

export function ProfilePage() {
    return (
        <div className="space-y-6">
            <ProfileHeader user={profileUser} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                {/* Left column */}
                <div className="flex flex-col gap-6">
                    <CodingActivityCard data={activityData} totalSubmissions={totalSubmissions} />
                    <RecentActivityCard items={recentActivity} />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6">
                    <ProblemsBreakdownCard data={problemBreakdown} />
                    <SkillMatrixCard skills={skillScores} />
                    <AchievementBadgesCard badges={achievementBadges} />
                </div>
            </div>
        </div>
    );
}
