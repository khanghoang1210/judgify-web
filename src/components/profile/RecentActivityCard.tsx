import { CheckCircle2, XCircle } from "lucide-react";
import type { ActivityItem } from "../../types/profile";
import { DifficultyBadge } from "../problems/DifficultyBadge";

interface RecentActivityCardProps {
  items: ActivityItem[];
}

export function RecentActivityCard({ items }: RecentActivityCardProps) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
        <h3 className="text-body-md font-semibold font-geist text-on-surface">
          Recent Activity
        </h3>
        <button className="text-label-caps text-primary font-jetbrains-mono hover:underline">
          VIEW ALL
        </button>
      </div>

      {/* Rows */}
      <div>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-5 py-4 ${
              idx < items.length - 1 ? "border-b border-outline-variant" : ""
            } hover:bg-surface-container-high transition-colors`}
          >
            {/* Status icon */}
            <div className="shrink-0">
              {item.result === "accepted" ? (
                <CheckCircle2 size={20} className="text-tertiary" />
              ) : (
                <XCircle size={20} className="text-error" />
              )}
            </div>

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-on-surface truncate">
                {item.title}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {item.category} • {item.timeAgo}
              </p>
            </div>

            {/* Result badge + difficulty */}
            <div className="shrink-0 text-right flex flex-col items-end gap-1">
              {item.result === "accepted" && item.points != null ? (
                <span className="text-code-md font-bold text-tertiary font-jetbrains-mono">
                  +{item.points} pts
                </span>
              ) : (
                <span className="text-code-sm font-bold text-error font-jetbrains-mono tracking-wide">
                  WRONG ANSWER
                </span>
              )}
              <DifficultyBadge difficulty={item.difficulty} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
