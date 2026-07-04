import type { Difficulty } from "../../types/problem";
import { cn } from "../../lib/cn";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const styles: Record<Difficulty, string> = {
  Easy: "bg-tertiary/20 text-tertiary border border-tertiary-container",
  Medium: "bg-secondary/20 text-secondary border border-secondary",
  Hard: "bg-error/20 text-error border border-error",
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-code-sm font-semibold rounded font-jetbrains-mono",
        styles[difficulty],
        className,
      )}
    >
      {difficulty}
    </span>
  );
}
