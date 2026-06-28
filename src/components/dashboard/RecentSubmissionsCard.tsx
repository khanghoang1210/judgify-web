import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import type { Difficulty } from "../../types/problem";
import type { DashboardSubmission } from "../../types/dashboard";

interface RecentSubmissionsCardProps {
  submissions: DashboardSubmission[];
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-(--color-tertiary)",
  Medium: "text-(--color-primary)",
  Hard: "text-(--color-primary)",
};

export function RecentSubmissionsCard({
  submissions,
}: RecentSubmissionsCardProps) {
  return (
    <div className="bg-(--color-surface-container-low) rounded-[var(--radius-lg)] border border-(--color-outline-variant) overflow-hidden">
      <div className="px-6 py-5 border-b border-(--color-outline-variant) flex items-center justify-between">
        <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface)">
          Recent Submissions
        </h3>
        <button className="text-(--color-on-surface-variant) text-sm hover:text-(--color-on-surface) inline-flex items-center gap-1">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-(--color-surface-container-high)/50">
            <tr>
              {["Problem", "Status", "Runtime", "Language", "Time"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-xs font-semibold tracking-wider uppercase font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-outline-variant)">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-(--color-surface-container-high) transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-(--color-on-surface) truncate max-w-[220px]">
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
                    <span className="inline-flex items-center gap-2 text-(--color-tertiary) font-semibold">
                      <CheckCircle2 size={18} />
                      Accepted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-(--color-error) font-semibold">
                      <XCircle size={18} />
                      Wrong Answer
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
                  {submission.runtime}
                </td>
                <td className="px-6 py-4 text-sm font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
                  {submission.language}
                </td>
                <td className="px-6 py-4 text-sm text-(--color-on-surface-variant)">
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
