interface Stat {
    label: string;
    solved: number;
    total: number;
    color: string;
    barColor: string;
}

interface ProblemStatsRowProps {
    totalSolved: number;
    totalProblems: number;
    easySolved: number;
    easyTotal: number;
    mediumSolved: number;
    mediumTotal: number;
    hardSolved: number;
    hardTotal: number;
}

export function ProblemStatsRow({
    totalSolved,
    totalProblems,
    easySolved,
    easyTotal,
    mediumSolved,
    mediumTotal,
    hardSolved,
    hardTotal,
}: ProblemStatsRowProps) {
    const stats: Stat[] = [
        {
            label: "SOLVED PROBLEMS",
            solved: totalSolved,
            total: totalProblems,
            color: "text-[var(--color-primary)]",
            barColor: "bg-[var(--color-primary-container)]",
        },
        {
            label: "EASY SOLVED",
            solved: easySolved,
            total: easyTotal,
            color: "text-[var(--color-tertiary)]",
            barColor: "bg-[var(--color-tertiary)]",
        },
        {
            label: "MEDIUM SOLVED",
            solved: mediumSolved,
            total: mediumTotal,
            color: "text-[#ffb347]",
            barColor: "bg-[#ffb347]",
        },
        {
            label: "HARD SOLVED",
            solved: hardSolved,
            total: hardTotal,
            color: "text-[var(--color-error)]",
            barColor: "bg-[var(--color-error)]",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const pct = Math.round((stat.solved / stat.total) * 100);
                return (
                    <div
                        key={stat.label}
                        className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-[var(--radius-md)] px-5 py-4"
                    >
                        <p className="text-[10px] font-semibold tracking-widest text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)] mb-2">
                            {stat.label}
                        </p>
                        <p className={`text-2xl font-bold font-[family-name:var(--font-geist)] ${stat.color}`}>
                            {stat.solved}{" "}
                            <span className="text-sm font-normal text-[var(--color-on-surface-variant)]">
                                / {stat.total.toLocaleString()}
                            </span>
                        </p>
                        {/* Progress bar */}
                        <div className="mt-3 h-1 bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${stat.barColor}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
