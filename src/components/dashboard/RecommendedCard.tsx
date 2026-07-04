import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import type { Difficulty } from "../../types/problem";
import type { RecommendedProblem } from "../../types/dashboard";

interface RecommendedCardProps {
  problems: RecommendedProblem[];
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "text-tertiary border-tertiary/30 bg-tertiary/5",
  Medium: "text-primary border-primary/30 bg-primary/5",
  Hard: "text-error border-error/30 bg-error/5",
};

const difficultyLabel: Record<Difficulty, string> = {
  Easy: "Easy",
  Medium: "Med",
  Hard: "Hard",
};

export function RecommendedCard({ problems }: RecommendedCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-low rounded-lg border border-outline-variant p-6">
      <h3 className="text-headline-sm font-semibold font-geist text-on-surface mb-4">
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
              <p className="text-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                {problem.title}
              </p>
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border ${difficultyStyles[problem.difficulty]}`}
              >
                {difficultyLabel[problem.difficulty]}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-on-surface-variant">
              <History size={14} />
              {problem.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
