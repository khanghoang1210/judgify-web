import { Timer } from "lucide-react";
import { problemDetail } from "../data/problemDetail";
import { DifficultyBadge } from "../components/problems/DifficultyBadge";
import { ProblemDescriptionPanel } from "../components/editor/ProblemDescriptionPanel";
import { CodeEditorPanel } from "../components/editor/CodeEditorPanel";

export function ProblemDetailPage() {
  const problem = problemDetail;

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold font-(family-name:--font-geist) text-(--color-primary)">
            {problem.title}
          </h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <div className="flex items-center gap-2 bg-(--color-surface-container-high) rounded-lg px-3 py-1.5 border border-(--color-outline-variant)">
          <Timer size={16} className="text-(--color-primary)" />
          <span className="font-(family-name:--font-jetbrains-mono) text-sm text-(--color-on-surface-variant)">
            00:42:15
          </span>
        </div>
      </div>

      {/* Split view */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProblemDescriptionPanel problem={problem} />
        <CodeEditorPanel problem={problem} />
      </div>
    </div>
  );
}
