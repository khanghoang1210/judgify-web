import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import type {
  SubmissionListItem,
  SubmissionVerdict,
} from "../../types/submission";
import type { Difficulty } from "../../types/problem";

interface SubmissionsTableProps {
  submissions: SubmissionListItem[];
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-(--color-tertiary)",
  Medium: "text-(--color-secondary)",
  Hard: "text-(--color-error)",
};

function VerdictBadge({ verdict }: { verdict: SubmissionVerdict }) {
  const accepted = verdict === "Accepted";

  let icon: ReactNode;
  let color: string;

  if (accepted) {
    icon = <CheckCircle2 size={16} />;
    color = "text-(--color-tertiary)";
  } else if (verdict === "Time Limit Exceeded") {
    icon = <Clock size={16} />;
    color = "text-(--color-secondary)";
  } else if (verdict === "Runtime Error") {
    icon = <AlertTriangle size={16} />;
    color = "text-(--color-error)";
  } else {
    icon = <XCircle size={16} />;
    color = "text-(--color-error)";
  }

  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${color}`}>
      {icon}
      {verdict}
    </span>
  );
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-(--color-surface-container-low) rounded-xl border border-(--color-outline-variant) overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-(--color-surface-container-high)/50">
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
                  className="px-6 py-3 text-xs font-semibold tracking-wider uppercase font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-outline-variant)">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                onClick={() => navigate(`/submissions/${submission.id}`)}
                className="hover:bg-(--color-surface-container-high) transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-(--color-on-surface)">
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
                  <VerdictBadge verdict={submission.verdict} />
                </td>
                <td className="px-6 py-4 text-sm font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
                  {submission.runtime}
                </td>
                <td className="px-6 py-4 text-sm font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
                  {submission.memory}
                </td>
                <td className="px-6 py-4 text-sm font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
                  {submission.language}
                </td>
                <td className="px-6 py-4 text-sm text-(--color-on-surface-variant)">
                  {submission.submittedAgo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <div className="px-6 py-12 text-center text-(--color-on-surface-variant)">
          No submissions match your filters.
        </div>
      )}
    </div>
  );
}
