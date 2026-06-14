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
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-5">
            <h3 className="text-base font-semibold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)] mb-4">
                Achievement Badges
            </h3>
            <div className="flex gap-3 justify-around">
                {badges.map((badge) => {
                    const Icon = ICON_MAP[badge.icon];
                    return (
                        <div key={badge.id} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-opacity ${badge.earned
                                        ? "bg-[var(--color-surface-container-high)] border-[var(--color-primary)]"
                                        : "bg-[var(--color-surface-container-high)] border-[var(--color-outline-variant)] opacity-40"
                                    }`}
                            >
                                <Icon
                                    size={22}
                                    className={
                                        badge.earned
                                            ? "text-[var(--color-primary)]"
                                            : "text-[var(--color-on-surface-variant)]"
                                    }
                                />
                            </div>
                            <span className="text-[10px] text-[var(--color-on-surface-variant)] text-center font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wide leading-tight max-w-[64px]">
                                {badge.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
