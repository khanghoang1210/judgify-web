import type { ActivityDay } from "../../types/profile";

interface CodingActivityCardProps {
  data: ActivityDay[];
  totalSubmissions: number;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-surface-container-high",
  1: "var(--color-heatmap-1)",
  2: "var(--color-heatmap-2)",
  3: "var(--color-heatmap-3)",
  4: "var(--color-tertiary)",
};

function getCellStyle(level: number): React.CSSProperties | undefined {
  if (level === 0) return undefined;
  return { backgroundColor: LEVEL_COLORS[level] };
}

function getCellClass(level: number): string {
  if (level === 0) return "bg-surface-container-high";
  return "";
}

export function CodingActivityCard({
  data,
  totalSubmissions,
}: CodingActivityCardProps) {
  // Group days into columns of 7 (one week per column)
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-body-md font-semibold font-geist text-on-surface">
          Coding Activity
        </h3>
        {/* Legend */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-on-surface-variant mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className={`w-3 h-3 rounded-sm ${getCellClass(l)}`}
              style={getCellStyle(l)}
            />
          ))}
          <span className="text-xs text-on-surface-variant ml-1">More</span>
        </div>
      </div>

      {/* Heatmap — grid stretches to fill full width */}
      <div
        className="grid gap-[4px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[4px]">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                className={`aspect-square w-full rounded-[2px] ${getCellClass(day.level)}`}
                style={getCellStyle(day.level)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between text-code-sm text-on-surface-variant font-jetbrains-mono tracking-wider">
        <span>LAST 365 DAYS</span>
        <span>TOTAL SUBMISSIONS: {totalSubmissions.toLocaleString()}</span>
      </div>
    </div>
  );
}
