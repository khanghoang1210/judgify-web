import { BarChart3, ChevronRight, Eye, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

interface Step {
  icon: ReactNode;
  label: string;
}

const steps: Step[] = [
  {
    icon: <Eye size={20} className="text-(--color-primary)" />,
    label: "View submission",
  },
  {
    icon: <BarChart3 size={20} className="text-(--color-secondary)" />,
    label: "Run complexity analysis",
  },
  {
    icon: <MessageSquare size={20} className="text-(--color-tertiary)" />,
    label: "Ask AI to optimize",
  },
];

export function NextStepsPanel() {
  return (
    <div className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface)">
        Next Steps
      </h3>
      {steps.map((step) => (
        <button
          key={step.label}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-(--color-surface-container-high) border border-(--color-outline-variant) hover:border-(--color-primary) transition-all group"
        >
          <div className="flex items-center gap-3">
            {step.icon}
            <span className="text-(--color-on-surface)">{step.label}</span>
          </div>
          <ChevronRight
            size={18}
            className="text-(--color-on-surface-variant) group-hover:translate-x-1 transition-transform"
          />
        </button>
      ))}
    </div>
  );
}
