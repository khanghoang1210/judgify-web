import type { PerformanceStat } from "../../types/submission";

interface PerformanceStatCardProps {
  stat: PerformanceStat;
}

export function PerformanceStatCard({ stat }: PerformanceStatCardProps) {
  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl p-6 relative group overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10 gap-3">
        <div>
          <p className="text-label-caps uppercase font-jetbrains-mono text-on-surface-variant mb-2">
            {stat.label}
          </p>
          <h3 className="text-headline-md font-bold font-geist text-on-surface">
            {stat.value}
          </h3>
        </div>
        <div className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold border border-tertiary/20 whitespace-nowrap">
          Beats {stat.beats}%
        </div>
      </div>
      <div className="mt-6 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${stat.beats}%` }}
        />
      </div>
    </div>
  );
}
