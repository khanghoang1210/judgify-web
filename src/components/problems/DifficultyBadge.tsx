import type { Difficulty } from "../../types/problem";
import { cn } from "../../lib/cn";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const styles: Record<Difficulty, string> = {
  Easy: "bg-[var(--color-tertiary)]/20 text-[var(--color-tertiary)] border border-[var(--color-tertiary-container)]",
  Medium:
    "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border border-[var(--color-secondary)]",
  Hard: "bg-[var(--color-error)]/20 text-[var(--color-error)] border border-[var(--color-error)]",
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded font-(family-name:--font-jetbrains-mono)",
        styles[difficulty],
        className,
      )}
    >
      {difficulty}
    </span>
  );
}
