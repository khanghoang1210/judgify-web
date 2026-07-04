import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import type { LeaderboardEntry } from "../../types/leaderboard";

// Gold / Silver / Bronze colors for top 3
const RANK_COLORS: Record<number, string> = {
  1: "var(--color-medal-gold)",
  2: "var(--color-medal-silver)",
  3: "var(--color-medal-bronze)",
};

function RankChangeIcon({
  change,
}: {
  change: LeaderboardEntry["rankChange"];
}) {
  if (change === "up") return <ChevronUp size={12} className="text-tertiary" />;
  if (change === "down")
    return <ChevronDown size={12} className="text-error" />;
  return <Minus size={12} className="text-on-surface-variant" />;
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
    <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[56px_40px_minmax(160px,1fr)_80px_minmax(130px,160px)_90px_72px] items-center bg-surface-container-high border-b border-outline-variant px-4 py-3">
        {["", "RANK", "USER", "SOLVED", "ACCEPTANCE", "SCORE", "STREAK"].map(
          (h) => (
            <div
              key={h}
              className="text-label-caps text-on-surface-variant font-jetbrains-mono"
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
            className={`grid grid-cols-[56px_40px_minmax(160px,1fr)_80px_minmax(130px,160px)_90px_72px] items-center px-4 py-3.5 border-b border-outline-variant last:border-b-0 transition-colors ${
              isCurrentUser
                ? "bg-primary-container/10 hover:bg-primary-container/15"
                : "hover:bg-surface-container-high"
            }`}
          >
            {/* Rank change */}
            <div className="flex items-center justify-center">
              <RankChangeIcon change={entry.rankChange} />
            </div>

            {/* Rank number */}
            <div
              className="text-code-md font-bold font-jetbrains-mono"
              style={{ color: rankColor ?? "var(--color-on-surface-variant)" }}
            >
              {String(entry.rank).padStart(2, "0")}
            </div>

            {/* User */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-linear-to-br from-primary-container to-secondary-container text-body-sm font-bold text-on-surface">
                {entry.avatarInitial}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-body-sm font-medium truncate ${
                    isCurrentUser ? "text-primary" : "text-on-surface"
                  }`}
                >
                  {entry.username}
                </p>
                <p className="text-code-sm text-on-surface-variant font-jetbrains-mono">
                  {entry.tier}
                </p>
              </div>
            </div>

            {/* Solved */}
            <div className="text-code-md text-on-surface font-jetbrains-mono">
              {entry.solved}
            </div>

            {/* Acceptance */}
            <div className="flex items-center gap-2 pr-2">
              <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden min-w-0">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${entry.acceptance}%`,
                    backgroundColor:
                      entry.acceptance >= 80
                        ? "var(--color-tertiary)"
                        : entry.acceptance >= 65
                          ? "var(--color-warning)"
                          : "var(--color-error)",
                  }}
                />
              </div>
              <span className="text-code-sm text-on-surface-variant font-jetbrains-mono shrink-0 w-10 text-right">
                {entry.acceptance.toFixed(1)}%
              </span>
            </div>

            {/* Score */}
            <div className="text-code-md font-medium text-on-surface font-jetbrains-mono">
              {entry.score.toLocaleString()}
            </div>

            {/* Streak */}
            <div>
              <span className="inline-flex items-center justify-center min-w-8 px-2 py-1 rounded-md text-code-sm font-bold font-jetbrains-mono bg-tertiary-container text-tertiary">
                {entry.streak}
              </span>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-surface-container-low border-t border-outline-variant">
        <span className="text-code-sm text-on-surface-variant font-jetbrains-mono">
          Showing top {showing} of {totalCompetitors.toLocaleString()}{" "}
          competitors
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={page <= 1}
            className="px-3 py-1.5 text-code-sm rounded-md border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-jetbrains-mono"
          >
            Previous
          </button>
          <span className="text-code-sm text-on-surface-variant font-jetbrains-mono px-1">
            {page} / {totalPages}
          </span>
          <button
            onClick={onNext}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-code-sm rounded-md border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-jetbrains-mono"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
