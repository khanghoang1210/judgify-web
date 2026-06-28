import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import type { LeaderboardEntry } from "../../types/leaderboard";

// Gold / Silver / Bronze colors for top 3
const RANK_COLORS: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

function RankChangeIcon({
  change,
}: {
  change: LeaderboardEntry["rankChange"];
}) {
  if (change === "up")
    return <ChevronUp size={12} className="text-(--color-tertiary)" />;
  if (change === "down")
    return <ChevronDown size={12} className="text-(--color-error)" />;
  return <Minus size={12} className="text-(--color-on-surface-variant)" />;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  totalCompetitors: number;
  page: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}

export function LeaderboardTable({
  entries,
  currentUserId,
  totalCompetitors,
  page,
  pageSize,
  onPrev,
  onNext,
}: LeaderboardTableProps) {
  const totalPages = Math.ceil(totalCompetitors / pageSize);
  const showing = Math.min(entries.length, pageSize);

  return (
    <div className="bg-(--color-surface-container) rounded-xl border border-(--color-outline-variant) overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[56px_40px_minmax(160px,1fr)_80px_minmax(130px,160px)_90px_72px] items-center bg-(--color-surface-container-high) border-b border-(--color-outline-variant) px-4 py-3">
        {["", "RANK", "USER", "SOLVED", "ACCEPTANCE", "SCORE", "STREAK"].map(
          (h) => (
            <div
              key={h}
              className="text-xs font-semibold text-(--color-on-surface-variant) tracking-wider font-(family-name:--font-jetbrains-mono)"
            >
              {h}
            </div>
          ),
        )}
      </div>

      {/* Rows */}
      {entries.map((entry) => {
        const isCurrentUser = entry.userId === currentUserId;
        const rankColor = RANK_COLORS[entry.rank];

        return (
          <div
            key={entry.userId}
            className={`grid grid-cols-[56px_40px_minmax(160px,1fr)_80px_minmax(130px,160px)_90px_72px] items-center px-4 py-3.5 border-b border-(--color-outline-variant) last:border-b-0 transition-colors ${
              isCurrentUser
                ? "bg-(--color-primary-container)/10 hover:bg-(--color-primary-container)/15"
                : "hover:bg-(--color-surface-container-high)"
            }`}
          >
            {/* Rank change */}
            <div className="flex items-center justify-center">
              <RankChangeIcon change={entry.rankChange} />
            </div>

            {/* Rank number */}
            <div
              className="text-sm font-bold font-(family-name:--font-jetbrains-mono)"
              style={{ color: rankColor ?? "var(--color-on-surface-variant)" }}
            >
              {String(entry.rank).padStart(2, "0")}
            </div>

            {/* User */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-(--color-primary-container) to-(--color-secondary-container) text-sm font-bold text-white">
                {entry.avatarInitial}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isCurrentUser
                      ? "text-(--color-primary)"
                      : "text-(--color-on-surface)"
                  }`}
                >
                  {entry.username}
                </p>
                <p className="text-xs text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono)">
                  {entry.tier}
                </p>
              </div>
            </div>

            {/* Solved */}
            <div className="text-sm text-(--color-on-surface) font-(family-name:--font-jetbrains-mono)">
              {entry.solved}
            </div>

            {/* Acceptance */}
            <div className="flex items-center gap-2 pr-2">
              <div className="flex-1 h-1.5 rounded-full bg-(--color-surface-container-high) overflow-hidden min-w-0">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${entry.acceptance}%`,
                    backgroundColor:
                      entry.acceptance >= 80
                        ? "var(--color-tertiary)"
                        : entry.acceptance >= 65
                          ? "#ffb347"
                          : "var(--color-error)",
                  }}
                />
              </div>
              <span className="text-xs text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono) shrink-0 w-10 text-right">
                {entry.acceptance.toFixed(1)}%
              </span>
            </div>

            {/* Score */}
            <div className="text-sm font-medium text-(--color-on-surface) font-(family-name:--font-jetbrains-mono)">
              {entry.score.toLocaleString()}
            </div>

            {/* Streak */}
            <div>
              <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-md text-xs font-bold font-(family-name:--font-jetbrains-mono) bg-(--color-tertiary-container) text-(--color-tertiary)">
                {entry.streak}
              </span>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-(--color-surface-container-low) border-t border-(--color-outline-variant)">
        <span className="text-xs text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono)">
          Showing top {showing} of {totalCompetitors.toLocaleString()}{" "}
          competitors
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={page <= 1}
            className="px-3 py-1.5 text-xs rounded-md border border-(--color-outline-variant) text-(--color-on-surface-variant) hover:text-(--color-on-surface) hover:border-(--color-outline) transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-(family-name:--font-jetbrains-mono)"
          >
            Previous
          </button>
          <span className="text-xs text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono) px-1">
            {page} / {totalPages}
          </span>
          <button
            onClick={onNext}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-xs rounded-md border border-(--color-outline-variant) text-(--color-on-surface-variant) hover:text-(--color-on-surface) hover:border-(--color-outline) transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-(family-name:--font-jetbrains-mono)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
