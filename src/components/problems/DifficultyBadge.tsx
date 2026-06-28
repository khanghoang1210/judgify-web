import type { Difficulty } from "../../types/problem";
import { cn } from "../../lib/cn";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const styles: Record<Difficulty, string> = {
  Easy: "bg-(--color-tertiary)/20 text-(--color-tertiary) border border-(--color-tertiary-container)",
  Medium:
    "bg-(--color-secondary)/20 text-(--color-secondary) border border-(--color-secondary)",
  Hard: "bg-(--color-error)/20 text-(--color-error) border border-(--color-error)",
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
