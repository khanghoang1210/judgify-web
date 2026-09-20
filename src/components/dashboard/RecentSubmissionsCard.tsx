import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Difficulty } from "../../types/problem";
import type { DashboardSubmission } from "../../types/dashboard";
import { LANGUAGE_LABELS, timeAgo } from "../../lib/format";
import { StatusBadge } from "../submissions/StatusBadge";

interface RecentSubmissionsCardProps {
  submissions: DashboardSubmission[];
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-tertiary",
  Medium: "text-primary",
  Hard: "text-error",
};

export function RecentSubmissionsCard({ submissions }: RecentSubmissionsCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden">
      <div className="px-4 py-4 border-b border-outline-variant flex items-center justify-between">
        <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
          Recent Submissions
        </h3>
        <Link
          to="/submissions"
          className="text-on-surface-variant text-body-sm hover:text-on-surface inline-flex items-center gap-1"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      {submissions.length === 0 ? (
        <p className="px-4 py-8 text-center text-body-sm text-on-surface-variant">
          No submissions yet. Pick a problem and ship something.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/50">
              <tr>
                {["Problem", "Status", "Runtime", "Language", "Time"].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-label-caps uppercase font-jetbrains-mono text-on-surface-variant"
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
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface truncate max-w-55">
                        {submission.problemTitle}
                      </span>
                      <span className={`text-xs ${difficultyColor[submission.difficulty]}`}>
                        {submission.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={submission.status} size={16} />
                  </td>
                  <td className="px-4 py-3 text-code-md font-jetbrains-mono text-on-surface-variant">
                    {submission.runtime}
                  </td>
                  <td className="px-4 py-3 text-code-md font-jetbrains-mono text-on-surface-variant">
                    {LANGUAGE_LABELS[submission.language]}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-on-surface-variant">
                    {timeAgo(submission.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
