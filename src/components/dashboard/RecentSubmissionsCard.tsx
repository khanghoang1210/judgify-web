import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import type { Difficulty } from "../../types/problem";
import type { DashboardSubmission } from "../../types/dashboard";

interface RecentSubmissionsCardProps {
  submissions: DashboardSubmission[];
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-tertiary",
  Medium: "text-primary",
  Hard: "text-primary",
};

export function RecentSubmissionsCard({
  submissions,
}: RecentSubmissionsCardProps) {
  return (
    <div className="bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
        <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
          Recent Submissions
        </h3>
        <button className="text-on-surface-variant text-body-sm hover:text-on-surface inline-flex items-center gap-1">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high/50">
            <tr>
              {["Problem", "Status", "Runtime", "Language", "Time"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-label-caps uppercase font-jetbrains-mono text-on-surface-variant"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-surface-container-high transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface truncate max-w-55">
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
                  {submission.result === "accepted" ? (
                    <span className="inline-flex items-center gap-2 text-tertiary font-semibold">
                      <CheckCircle2 size={18} />
                      Accepted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-error font-semibold">
                      <XCircle size={18} />
                      Wrong Answer
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-code-md font-jetbrains-mono text-on-surface-variant">
                  {submission.runtime}
                </td>
                <td className="px-6 py-4 text-code-md font-jetbrains-mono text-on-surface-variant">
                  {submission.language}
                </td>
                <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                  {submission.timeAgo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
