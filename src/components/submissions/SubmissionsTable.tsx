import { useNavigate } from "react-router-dom";
import type { SubmissionListItem } from "../../types/submission";
import type { Difficulty } from "../../types/problem";
import { LANGUAGE_LABELS, timeAgo } from "../../lib/format";
import { StatusBadge } from "./StatusBadge";

interface SubmissionsTableProps {
  submissions: SubmissionListItem[];
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-tertiary",
  Medium: "text-secondary",
  Hard: "text-error",
};

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high/50">
            <tr>
              {[
                "Problem",
                "Status",
                "Runtime",
                "Memory",
                "Language",
                "Submitted",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-label-caps uppercase font-jetbrains-mono text-on-surface-variant"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                onClick={() => navigate(`/submissions/${submission.id}`)}
                className="hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">
                      {submission.problemTitle}
                    </span>
                    <span
                      className={`text-xs ${difficultyColor[submission.difficulty]}`}
                    >
                      {submission.difficulty}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={submission.status} />
                </td>
                <td className="px-6 py-4 text-code-md font-jetbrains-mono text-on-surface-variant">
                  {submission.runtime}
                </td>
                <td className="px-6 py-4 text-code-md font-jetbrains-mono text-on-surface-variant">
                  {submission.memory}
                </td>
                <td className="px-6 py-4 text-code-md font-jetbrains-mono text-on-surface-variant">
                  {LANGUAGE_LABELS[submission.language]}
                </td>
                <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                  {timeAgo(submission.submittedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <div className="px-6 py-12 text-center text-on-surface-variant">
          No submissions match your filters.
        </div>
      )}
    </div>
  );
}
