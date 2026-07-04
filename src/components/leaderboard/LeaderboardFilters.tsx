import type { LeaderboardPeriod } from "../../types/leaderboard";
import { SlidersHorizontal } from "lucide-react";

const TABS: { id: LeaderboardPeriod; label: string }[] = [
  { id: "global", label: "Global" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

interface LeaderboardFiltersProps {
  activeTab: LeaderboardPeriod;
  onTabChange: (tab: LeaderboardPeriod) => void;
}

export function LeaderboardFilters({
  activeTab,
  onTabChange,
}: LeaderboardFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Tabs */}
      <div className="flex rounded-lg bg-surface-container-high p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1.5 text-code-md font-medium rounded-md transition-colors font-jetbrains-mono ${
              activeTab === tab.id
                ? "bg-surface-container-highest text-on-surface"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter button */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors">
        <SlidersHorizontal size={14} />
        <span className="font-jetbrains-mono">Filter</span>
      </button>
    </div>
  );
}
