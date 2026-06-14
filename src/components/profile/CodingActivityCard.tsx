import type { ActivityDay } from "../../types/profile";

interface CodingActivityCardProps {
    data: ActivityDay[];
    totalSubmissions: number;
}

const LEVEL_COLORS: Record<number, string> = {
    0: "bg-[var(--color-surface-container-high)]",
    1: "#1a4731",
    2: "#1d6a42",
    3: "#239952",
    4: "var(--color-tertiary)",
};

function getCellStyle(level: number): React.CSSProperties | undefined {
    if (level === 0) return undefined;
    return { backgroundColor: LEVEL_COLORS[level] };
}

function getCellClass(level: number): string {
    if (level === 0) return "bg-[var(--color-surface-container-high)]";
    return "";
}

export function CodingActivityCard({ data, totalSubmissions }: CodingActivityCardProps) {
    // Group days into columns of 7 (one week per column)
    const weeks: ActivityDay[][] = [];
    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }

    return (
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Coding Activity
                </h3>
                {/* Legend */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[var(--color-on-surface-variant)] mr-1">Less</span>
                    {[0, 1, 2, 3, 4].map((l) => (
                        <div
                            key={l}
                            className={`w-3 h-3 rounded-sm ${getCellClass(l)}`}
                            style={getCellStyle(l)}
                        />
                    ))}
                    <span className="text-xs text-[var(--color-on-surface-variant)] ml-1">More</span>
                </div>
            </div>

            {/* Heatmap */}
            <div className="flex gap-[3px] overflow-x-auto pb-1">
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px] shrink-0">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                title={`${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                                className={`w-[11px] h-[11px] rounded-[2px] ${getCellClass(day.level)}`}
                                style={getCellStyle(day.level)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-3 flex justify-between text-xs text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)]">
                <span>LAST 365 DAYS</span>
                <span>TOTAL SUBMISSIONS: {totalSubmissions.toLocaleString()}</span>
            </div>
        </div>
    );
}
