import { Trophy } from "lucide-react";
import type { GlobalStanding } from "../../types/leaderboard";

interface GlobalStandingCardProps {
  data: GlobalStanding;
}

export function GlobalStandingCard({ data }: GlobalStandingCardProps) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-body-md font-semibold font-geist text-on-surface">
            Global Standing
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            Your performance across all competitive segments.
          </p>
        </div>
        <Trophy size={18} className="text-on-surface-variant shrink-0 mt-0.5" />
      </div>

      {/* Rank */}
      <div className="flex items-center gap-3">
        <span className="text-display-lg font-bold font-geist text-on-surface">
          #{data.rank.toLocaleString()}
        </span>
        <span className="px-2.5 py-1 text-label-caps font-bold rounded-full bg-tertiary-container text-tertiary font-jetbrains-mono uppercase">
          {data.percentile}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-jetbrains-mono">
            {data.progressLabel}
          </span>
          <span className="text-on-surface font-semibold font-jetbrains-mono">
            {data.progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
          <div
            className="h-full rounded-full bg-tertiary transition-all"
            style={{ width: `${data.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
