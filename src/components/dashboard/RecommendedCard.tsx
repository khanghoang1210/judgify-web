import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import type { Difficulty } from "../../types/problem";
import type { RecommendedProblem } from "../../types/dashboard";

interface RecommendedCardProps {
  problems: RecommendedProblem[];
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "text-(--color-tertiary) border-(--color-tertiary)/30 bg-(--color-tertiary)/5",
  Medium:
    "text-(--color-primary) border-(--color-primary)/30 bg-(--color-primary)/5",
  Hard: "text-(--color-error) border-(--color-error)/30 bg-(--color-error)/5",
};

const difficultyLabel: Record<Difficulty, string> = {
  Easy: "Easy",
  Medium: "Med",
  Hard: "Hard",
};

export function RecommendedCard({ problems }: RecommendedCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-(--color-surface-container-low) rounded-[var(--radius-lg)] border border-(--color-outline-variant) p-6">
      <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface) mb-4">
        Recommended
      </h3>
      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => navigate(`/problems/${problem.id}`)}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1 gap-2">
              <p className="text-sm font-semibold text-(--color-on-surface) group-hover:text-(--color-primary) transition-colors truncate">
                {problem.title}
              </p>
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-[var(--radius-sm)] border ${difficultyStyles[problem.difficulty]}`}
              >
                {difficultyLabel[problem.difficulty]}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-(--color-on-surface-variant)">
              <History size={14} />
              {problem.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
