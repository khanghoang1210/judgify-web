import { Link } from "react-router-dom";
import type { ActivityItem } from "../../types/profile";
import { timeAgo } from "../../lib/format";
import { DifficultyBadge } from "../problems/DifficultyBadge";
import { StatusBadge } from "../submissions/StatusBadge";

interface RecentActivityCardProps {
  items: ActivityItem[];
}

export function RecentActivityCard({ items }: RecentActivityCardProps) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
        <h3 className="text-body-md font-semibold font-geist text-on-surface">
          Recent Activity
        </h3>
        <Link
          to="/submissions"
          className="text-label-caps text-primary font-jetbrains-mono hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="px-4 py-8 text-center text-body-sm text-on-surface-variant">
          No submissions yet.
        </p>
      ) : (
        <div>
          {items.map((item, idx) => (
            <Link
              key={item.id}
              to={`/submissions/${item.id}`}
              className={`flex items-center gap-4 px-4 py-3 ${
                idx < items.length - 1 ? "border-b border-outline-variant" : ""
              } hover:bg-surface-container-high transition-colors`}
            >
              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-medium text-on-surface truncate">
                  {item.title}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {timeAgo(item.submittedAt)}
                </p>
              </div>

              {/* Verdict + difficulty */}
              <div className="shrink-0 text-right flex flex-col items-end gap-1">
                <StatusBadge status={item.status} size={14} className="text-code-sm" />
                <DifficultyBadge difficulty={item.difficulty} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
