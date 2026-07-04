import { CheckCircle2, Flame, Percent, TrendingUp } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard";

interface ProgressSummaryGridProps {
  stats: DashboardStats;
}

export function ProgressSummaryGrid({ stats }: ProgressSummaryGridProps) {
  const cardClass =
    "bg-surface-container-high rounded-lg border border-outline-variant p-5 flex flex-col justify-between gap-4";
  const labelClass =
    "text-label-caps font-jetbrains-mono text-on-surface-variant";
  const valueClass =
    "text-headline-md font-semibold font-geist text-on-surface";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={cardClass}>
        <CheckCircle2 size={22} className="text-primary" />
        <div>
          <p className={labelClass}>TOTAL SOLVED</p>
          <p className={valueClass}>
            {stats.totalSolved}
            <span className="text-body-md text-on-surface-variant">
              /{stats.totalProblems}
            </span>
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <Flame size={22} className="text-tertiary" />
        <div>
          <p className={labelClass}>STREAK</p>
          <p className={valueClass}>
            {stats.streakDays}{" "}
            <span className="text-body-md text-on-surface-variant">days</span>
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <Percent size={22} className="text-secondary" />
        <div>
          <p className={labelClass}>ACCEPTANCE</p>
          <p className={valueClass}>{stats.acceptance}%</p>
        </div>
      </div>

      <div className={cardClass}>
        <TrendingUp size={22} className="text-error" />
        <div>
          <p className={labelClass}>DIFFICULTY</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span className="text-xs text-on-surface font-semibold">
              {stats.difficultyBreakdown.easy}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary ml-2" />
            <span className="text-xs text-on-surface font-semibold">
              {stats.difficultyBreakdown.medium}
            </span>
            <span className="w-2 h-2 rounded-full bg-error ml-2" />
            <span className="text-xs text-on-surface font-semibold">
              {stats.difficultyBreakdown.hard}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
