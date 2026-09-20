import type { ReactNode } from "react";

interface PerformanceStatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

/**
 * A single judge metric. There is no percentile endpoint, so this shows the
 * measured value rather than a "beats N%" comparison.
 */
export function PerformanceStatCard({ label, value, icon }: PerformanceStatCardProps) {
  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl p-4 relative group overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10 gap-3">
        <div>
          <p className="text-label-caps uppercase font-jetbrains-mono text-on-surface-variant mb-2">
            {label}
          </p>
          <h3 className="text-headline-md font-bold font-geist text-on-surface">{value}</h3>
        </div>
        {icon && <div className="text-primary shrink-0">{icon}</div>}
      </div>
    </div>
  );
}
