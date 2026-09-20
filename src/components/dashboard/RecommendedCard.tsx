import { useNavigate } from "react-router-dom";
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

/** Problems you have not solved yet — the closest thing to a recommendation the API supports. */
export function RecommendedCard({ problems }: RecommendedCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-low rounded-lg border border-outline-variant p-4">
      <h3 className="text-headline-sm font-semibold font-geist text-on-surface mb-4">
        Up next
      </h3>
      {problems.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant">
          You have solved everything published. Nice.
        </p>
      ) : (
        <div className="space-y-4">
          {problems.map((problem) => (
            <div
              key={problem.slug}
              onClick={() => navigate(`/problems/${problem.slug}`)}
              className="group cursor-pointer flex items-center justify-between gap-2"
            >
              <p className="text-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                {problem.title}
              </p>
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border ${difficultyStyles[problem.difficulty]}`}
              >
                {difficultyLabel[problem.difficulty]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
