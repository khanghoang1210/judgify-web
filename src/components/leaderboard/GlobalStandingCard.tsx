import { Trophy } from "lucide-react";
import type { GlobalStanding } from "../../types/leaderboard";

interface GlobalStandingCardProps {
  data: GlobalStanding;
}

export function GlobalStandingCard({ data }: GlobalStandingCardProps) {
  return (
    <div className="bg-(--color-surface-container) rounded-xl border border-(--color-outline-variant) p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold font-(family-name:--font-geist) text-(--color-on-surface)">
            Global Standing
          </h2>
          <p className="text-sm text-(--color-on-surface-variant) mt-0.5">
            Your performance across all competitive segments.
          </p>
        </div>
        <Trophy
          size={18}
          className="text-(--color-on-surface-variant) shrink-0 mt-0.5"
        />
      </div>

      {/* Rank */}
      <div className="flex items-center gap-3">
        <span className="text-5xl font-bold font-(family-name:--font-geist) text-(--color-on-surface)">
          #{data.rank.toLocaleString()}
        </span>
        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-(--color-tertiary-container) text-(--color-tertiary) font-(family-name:--font-jetbrains-mono) uppercase tracking-wider">
          {data.percentile}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono)">
            {data.progressLabel}
          </span>
          <span className="text-(--color-on-surface) font-semibold font-(family-name:--font-jetbrains-mono)">
            {data.progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-(--color-surface-container-high) overflow-hidden">
          <div
            className="h-full rounded-full bg-(--color-tertiary) transition-all"
            style={{ width: `${data.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
