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
            color: "text-(--color-primary)",
            barColor: "bg-(--color-primary-container)",
        },
        {
            label: "EASY SOLVED",
            solved: easySolved,
            total: easyTotal,
            color: "text-(--color-tertiary)",
            barColor: "bg-(--color-tertiary)",
        },
        {
            label: "MEDIUM SOLVED",
            solved: mediumSolved,
            total: mediumTotal,
            color: "text-(--color-secondary)",
            barColor: "bg-(--color-secondary)",
        },
        {
            label: "HARD SOLVED",
            solved: hardSolved,
            total: hardTotal,
            color: "text-(--color-error)",
            barColor: "bg-(--color-error)",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const pct = Math.round((stat.solved / stat.total) * 100);
                return (
                    <div
                        key={stat.label}
                        className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-[var(--radius-md)] px-5 py-4"
                    >
                        <p className="text-[10px] font-semibold tracking-widest text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono) mb-2">
                            {stat.label}
                        </p>
                        <p className={`text-2xl font-bold font-(family-name:--font-geist) ${stat.color}`}>
                            {stat.solved}{" "}
                            <span className="text-sm font-normal text-(--color-on-surface-variant)">
                                / {stat.total.toLocaleString()}
                            </span>
                        </p>
                        {/* Progress bar */}
                        <div className="mt-3 h-1 bg-(--color-surface-container-high) rounded-full overflow-hidden">
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
