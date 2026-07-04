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
      color: "text-primary",
      barColor: "bg-primary-container",
    },
    {
      label: "EASY SOLVED",
      solved: easySolved,
      total: easyTotal,
      color: "text-tertiary",
      barColor: "bg-tertiary",
    },
    {
      label: "MEDIUM SOLVED",
      solved: mediumSolved,
      total: mediumTotal,
      color: "text-secondary",
      barColor: "bg-secondary",
    },
    {
      label: "HARD SOLVED",
      solved: hardSolved,
      total: hardTotal,
      color: "text-error",
      barColor: "bg-error",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const pct = Math.round((stat.solved / stat.total) * 100);
        return (
          <div
            key={stat.label}
            className="bg-surface-container border border-outline-variant rounded-md px-5 py-4"
          >
            <p className="text-label-caps text-on-surface-variant font-jetbrains-mono mb-2">
              {stat.label}
            </p>
            <p
              className={`text-headline-md font-bold font-geist ${stat.color}`}
            >
              {stat.solved}{" "}
              <span className="text-body-sm font-normal text-on-surface-variant">
                / {stat.total.toLocaleString()}
              </span>
            </p>
            {/* Progress bar */}
            <div className="mt-3 h-1 bg-surface-container-high rounded-full overflow-hidden">
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
