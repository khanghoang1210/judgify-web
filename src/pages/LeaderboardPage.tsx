import { useState } from "react";
import { GlobalStandingCard } from "../components/leaderboard/GlobalStandingCard";
import { LeaderboardFilters } from "../components/leaderboard/LeaderboardFilters";
import { LeaderboardTable } from "../components/leaderboard/LeaderboardTable";
import { CTABanner } from "../components/leaderboard/CTABanner";
import {
  leaderboardEntries,
  globalStanding,
  ctaBanner,
  CURRENT_USER_ID,
  TOTAL_COMPETITORS,
} from "../data/leaderboard";
import type { LeaderboardPeriod } from "../types/leaderboard";

const PAGE_SIZE = 10;

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardPeriod>("global");
  const [page, setPage] = useState(1);

  // In a real app, tab/page would trigger different data fetches.
  // For now, all tabs show the same mock entries.
  const visibleEntries = leaderboardEntries.slice(0, PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Top row: Global Standing + placeholder stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <GlobalStandingCard data={globalStanding} />

        {/* Right stats card */}
        <div className="bg-surface-container rounded-xl border border-outline-variant p-6 flex flex-col justify-between gap-4">
          <h3 className="text-body-md font-semibold font-geist text-on-surface">
            Your Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Best Rank", value: "#1,240" },
              { label: "Contests", value: "12" },
              { label: "Top Score", value: "4,210" },
              { label: "Win Rate", value: "58%" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-surface-container-high rounded-lg p-3 border border-outline-variant"
              >
                <div className="text-headline-sm font-bold font-geist text-on-surface">
                  {s.value}
                </div>
                <div className="text-label-caps text-on-surface-variant font-jetbrains-mono mt-0.5 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <LeaderboardFilters activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Table */}
      <LeaderboardTable
        entries={visibleEntries}
        currentUserId={CURRENT_USER_ID}
        totalCompetitors={TOTAL_COMPETITORS}
        page={page}
        pageSize={PAGE_SIZE}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* CTA Banner */}
      <CTABanner data={ctaBanner} onPrimary={() => {}} onSecondary={() => {}} />
    </div>
  );
}
