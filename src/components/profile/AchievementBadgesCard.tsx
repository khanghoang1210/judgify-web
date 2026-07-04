import { Star, Trophy, Zap, Award, Flame } from "lucide-react";
import type { AchievementBadge } from "../../types/profile";

interface AchievementBadgesCardProps {
  badges: AchievementBadge[];
}

const ICON_MAP = {
  star: Star,
  trophy: Trophy,
  zap: Zap,
  award: Award,
  flame: Flame,
};

export function AchievementBadgesCard({ badges }: AchievementBadgesCardProps) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-5">
      <h3 className="text-body-md font-semibold font-geist text-on-surface mb-4">
        Achievement Badges
      </h3>
      <div className="flex gap-3 justify-around">
        {badges.map((badge) => {
          const Icon = ICON_MAP[badge.icon];
          return (
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-opacity ${
                  badge.earned
                    ? "bg-surface-container-high border-primary"
                    : "bg-surface-container-high border-outline-variant opacity-40"
                }`}
              >
                <Icon
                  size={22}
                  className={
                    badge.earned ? "text-primary" : "text-on-surface-variant"
                  }
                />
              </div>
              <span className="text-label-caps text-on-surface-variant text-center font-jetbrains-mono uppercase tracking-wide leading-tight max-w-[64px]">
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
