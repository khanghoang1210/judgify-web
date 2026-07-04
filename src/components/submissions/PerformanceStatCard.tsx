import type { PerformanceStat } from "../../types/submission";

interface PerformanceStatCardProps {
  stat: PerformanceStat;
}

export function PerformanceStatCard({ stat }: PerformanceStatCardProps) {
  return (
    <div className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-xl p-6 relative group overflow-hidden">
      <div className="absolute inset-0 bg-(--color-primary)/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10 gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant) mb-2">
            {stat.label}
          </p>
          <h3 className="text-2xl font-bold font-(family-name:--font-geist) text-(--color-on-surface)">
            {stat.value}
          </h3>
        </div>
        <div className="bg-(--color-tertiary)/10 text-(--color-tertiary) px-3 py-1 rounded-full text-xs font-bold border border-(--color-tertiary)/20 whitespace-nowrap">
          Beats {stat.beats}%
        </div>
      </div>
      <div className="mt-6 h-1 w-full bg-(--color-surface-container-highest) rounded-full overflow-hidden">
        <div
          className="h-full bg-(--color-primary)"
          style={{ width: `${stat.beats}%` }}
        />
      </div>
    </div>
  );
}
