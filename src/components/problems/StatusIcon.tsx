import type { ProblemStatus } from "../../types/problem";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface StatusIconProps {
    status: ProblemStatus;
}

export function StatusIcon({ status }: StatusIconProps) {
    if (status === "solved") {
        return <CheckCircle2 size={18} className="text-[var(--color-tertiary)]" />;
    }
    if (status === "attempted") {
        return <Clock size={18} className="text-[#ffb347]" />;
    }
    return <Circle size={18} className="text-[var(--color-outline)]" />;
}
