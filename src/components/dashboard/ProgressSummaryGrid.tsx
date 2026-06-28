import { CheckCircle2, Flame, Percent, TrendingUp } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard";

interface ProgressSummaryGridProps {
  stats: DashboardStats;
}

export function ProgressSummaryGrid({ stats }: ProgressSummaryGridProps) {
  const cardClass =
    "bg-(--color-surface-container-high) rounded-[var(--radius-lg)] border border-(--color-outline-variant) p-5 flex flex-col justify-between gap-4";
  const labelClass =
    "text-xs font-semibold tracking-wider font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)";
  const valueClass =
    "text-2xl font-semibold font-(family-name:--font-geist) text-(--color-on-surface)";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={cardClass}>
        <CheckCircle2 size={22} className="text-(--color-primary)" />
        <div>
          <p className={labelClass}>TOTAL SOLVED</p>
          <p className={valueClass}>
            {stats.totalSolved}
            <span className="text-base text-(--color-on-surface-variant)">
              /{stats.totalProblems}
            </span>
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <Flame size={22} className="text-(--color-tertiary)" />
        <div>
          <p className={labelClass}>STREAK</p>
          <p className={valueClass}>
            {stats.streakDays}{" "}
            <span className="text-base text-(--color-on-surface-variant)">
              days
            </span>
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <Percent size={22} className="text-(--color-secondary)" />
        <div>
          <p className={labelClass}>ACCEPTANCE</p>
          <p className={valueClass}>{stats.acceptance}%</p>
        </div>
      </div>

      <div className={cardClass}>
        <TrendingUp size={22} className="text-(--color-error)" />
        <div>
          <p className={labelClass}>DIFFICULTY</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-(--color-tertiary)" />
            <span className="text-xs text-(--color-on-surface) font-semibold">
              {stats.difficultyBreakdown.easy}
            </span>
            <span className="w-2 h-2 rounded-full bg-(--color-primary) ml-2" />
            <span className="text-xs text-(--color-on-surface) font-semibold">
              {stats.difficultyBreakdown.medium}
            </span>
            <span className="w-2 h-2 rounded-full bg-(--color-error) ml-2" />
            <span className="text-xs text-(--color-on-surface) font-semibold">
              {stats.difficultyBreakdown.hard}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
