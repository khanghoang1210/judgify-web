import type { Difficulty } from "../../types/problem";
import { cn } from "../../lib/cn";

interface DifficultyBadgeProps {
    difficulty: Difficulty;
    className?: string;
}

const styles: Record<Difficulty, string> = {
    Easy: "bg-[#003824] text-[var(--color-tertiary)] border border-[var(--color-tertiary-container)]",
    Medium: "bg-[#2d1a00] text-[#ffb347] border border-[#7a4800]",
    Hard: "bg-[var(--color-error)] text-[var(--color-on-error)] border border-[#5a0008]",
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded font-[family-name:var(--font-jetbrains-mono)]",
                styles[difficulty],
                className
            )}
        >
            {difficulty}
        </span>
    );
}
