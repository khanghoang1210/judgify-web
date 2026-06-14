import { CheckCircle2, XCircle } from "lucide-react";
import type { ActivityItem } from "../../types/profile";
import { DifficultyBadge } from "../problems/DifficultyBadge";

interface RecentActivityCardProps {
    items: ActivityItem[];
}

export function RecentActivityCard({ items }: RecentActivityCardProps) {
    return (
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-outline-variant)]">
                <h3 className="text-base font-semibold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Recent Activity
                </h3>
                <button className="text-xs font-semibold text-[var(--color-primary)] font-[family-name:var(--font-jetbrains-mono)] tracking-wider hover:underline">
                    VIEW ALL
                </button>
            </div>

            {/* Rows */}
            <div>
                {items.map((item, idx) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-4 px-5 py-4 ${idx < items.length - 1
                                ? "border-b border-[var(--color-outline-variant)]"
                                : ""
                            } hover:bg-[var(--color-surface-container-high)] transition-colors`}
                    >
                        {/* Status icon */}
                        <div className="shrink-0">
                            {item.result === "accepted" ? (
                                <CheckCircle2 size={20} className="text-[var(--color-tertiary)]" />
                            ) : (
                                <XCircle size={20} className="text-[var(--color-error)]" />
                            )}
                        </div>

                        {/* Title + meta */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-on-surface)] truncate">
                                {item.title}
                            </p>
                            <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                                {item.category} • {item.timeAgo}
                            </p>
                        </div>

                        {/* Result badge + difficulty */}
                        <div className="shrink-0 text-right flex flex-col items-end gap-1">
                            {item.result === "accepted" && item.points != null ? (
                                <span className="text-sm font-bold text-[var(--color-tertiary)] font-[family-name:var(--font-jetbrains-mono)]">
                                    +{item.points} pts
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-[var(--color-error)] font-[family-name:var(--font-jetbrains-mono)] tracking-wide">
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
