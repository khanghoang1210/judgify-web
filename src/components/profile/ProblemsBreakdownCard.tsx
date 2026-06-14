import type { ProblemBreakdown } from "../../types/profile";

interface ProblemsBreakdownCardProps {
    data: ProblemBreakdown;
}

const SEGMENTS = [
    { key: "easy" as const, label: "Easy", color: "#4edea3" },
    { key: "medium" as const, label: "Medium", color: "#ffb347" },
    { key: "hard" as const, label: "Hard", color: "#ffb4ab" },
];

export function ProblemsBreakdownCard({ data }: ProblemsBreakdownCardProps) {
    const cx = 90;
    const cy = 90;
    const r = 62;
    const strokeWidth = 18;
    const C = 2 * Math.PI * r;

    const solved = {
        easy: data.easy.solved,
        medium: data.medium.solved,
        hard: data.hard.solved,
    };
    const total = solved.easy + solved.medium + solved.hard;

    // Compute stroke-dasharray segments.
    // All circles are rotated -90° so segment 1 starts at 12 o'clock.
    // Each segment: dasharray="fraction*C rest" dashoffset=-cumulativeFraction*C
    let cumulativeC = 0;
    const paths = SEGMENTS.map((seg) => {
        const fraction = total > 0 ? solved[seg.key] / total : 0;
        const dash = fraction * C;
        const offset = -cumulativeC;
        cumulativeC += dash;
        return { ...seg, dash, offset };
    });

    return (
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-5">
            <h3 className="text-base font-semibold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)] mb-4">
                Problems Breakdown
            </h3>

            {/* Donut chart */}
            <div className="flex justify-center mb-5">
                <svg width="180" height="180" viewBox="0 0 180 180">
                    <g transform={`rotate(-90, ${cx}, ${cy})`}>
                        {/* Background ring */}
                        <circle
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill="none"
                            stroke="var(--color-surface-container-high)"
                            strokeWidth={strokeWidth}
                        />
                        {/* Colored segments */}
                        {paths.map((seg) => (
                            <circle
                                key={seg.key}
                                cx={cx}
                                cy={cy}
                                r={r}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${seg.dash} ${C - seg.dash}`}
                                strokeDashoffset={seg.offset}
                                strokeLinecap="butt"
                            />
                        ))}
                    </g>
                    {/* Center label */}
                    <text
                        x={cx}
                        y={cy - 8}
                        textAnchor="middle"
                        fill="var(--color-on-surface)"
                        fontSize="30"
                        fontWeight="bold"
                        fontFamily="var(--font-geist)"
                    >
                        {total}
                    </text>
                    <text
                        x={cx}
                        y={cy + 11}
                        textAnchor="middle"
                        fill="var(--color-on-surface-variant)"
                        fontSize="10"
                        fontFamily="var(--font-jetbrains-mono)"
                        letterSpacing="1.5"
                    >
                        TOTAL
                    </text>
                </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2.5">
                {SEGMENTS.map((seg) => (
                    <div key={seg.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: seg.color }}
                            />
                            <span className="text-sm text-[var(--color-on-surface-variant)]">
                                {seg.label}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-[var(--color-on-surface)] font-[family-name:var(--font-jetbrains-mono)]">
                            {data[seg.key].solved}/{data[seg.key].total}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
