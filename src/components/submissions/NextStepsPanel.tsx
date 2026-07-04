import { BarChart3, ChevronRight, Eye, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

interface Step {
  icon: ReactNode;
  label: string;
}

const steps: Step[] = [
  {
    icon: <Eye size={20} className="text-primary" />,
    label: "View submission",
  },
  {
    icon: <BarChart3 size={20} className="text-secondary" />,
    label: "Run complexity analysis",
  },
  {
    icon: <MessageSquare size={20} className="text-tertiary" />,
    label: "Ask AI to optimize",
  },
];

export function NextStepsPanel() {
  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
      <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
        Next Steps
      </h3>
      {steps.map((step) => (
        <button
          key={step.label}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary transition-all group"
        >
          <div className="flex items-center gap-3">
            {step.icon}
            <span className="text-on-surface">{step.label}</span>
          </div>
          <ChevronRight
            size={18}
            className="text-on-surface-variant group-hover:translate-x-1 transition-transform"
          />
        </button>
      ))}
    </div>
  );
}
