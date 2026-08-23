import { useState } from "react";
import { BookOpen, Clock, Cpu, FileText, History, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ProblemDetailResponse, SubmissionResponse } from "../../types/api";
import {
  LANGUAGE_LABELS,
  formatMemory,
  formatMemoryLimit,
  formatRuntime,
  formatTimeLimit,
  timeAgo,
  toDifficulty,
} from "../../lib/format";
import { Markdown } from "../markdown/Markdown";
import { DifficultyBadge } from "../problems/DifficultyBadge";
import { StatusBadge } from "../submissions/StatusBadge";

interface ProblemDescriptionPanelProps {
  problem: ProblemDetailResponse;
  /** Your own submissions for this problem, newest first. */
  submissions: SubmissionResponse[];
  submissionsLoading: boolean;
}

type TabId = "description" | "editorial" | "solutions" | "submissions";

const tabs: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: "description", label: "Description", icon: <FileText size={18} /> },
  { id: "editorial", label: "Editorial", icon: <BookOpen size={18} /> },
  { id: "solutions", label: "Solutions", icon: <Lightbulb size={18} /> },
  { id: "submissions", label: "Submissions", icon: <History size={18} /> },
];

export function ProblemDescriptionPanel({
  problem,
  submissions,
  submissionsLoading,
}: ProblemDescriptionPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <section className="flex flex-col h-full overflow-hidden bg-surface-container-lowest">
      {/* Tabs */}
      <div className="flex bg-surface-container-low px-2 border-b border-outline-variant overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 border-b-2 font-medium text-body-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "description" && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-headline-md font-semibold font-geist text-on-surface">
                {problem.id}. {problem.title}
              </h2>
              <DifficultyBadge difficulty={toDifficulty(problem.difficulty)} />
            </div>

            {/* Judge limits */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-container-high border border-outline-variant text-code-sm font-jetbrains-mono text-on-surface-variant">
                <Clock size={14} className="text-primary" />
                {formatTimeLimit(problem.timeLimitMs)}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-container-high border border-outline-variant text-code-sm font-jetbrains-mono text-on-surface-variant">
                <Cpu size={14} className="text-primary" />
                {formatMemoryLimit(problem.memoryLimitMb)}
              </span>
            </div>

            {problem.description ? (
              <Markdown source={problem.description} />
            ) : (
              <p className="text-on-surface-variant">
                This problem has no description yet.
              </p>
            )}
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="max-w-3xl mx-auto">
            {submissionsLoading ? (
              <p className="text-body-sm text-on-surface-variant">Loading your submissions…</p>
            ) : submissions.length === 0 ? (
              <p className="text-body-sm text-on-surface-variant">
                You have not submitted to this problem yet.
              </p>
            ) : (
              <ul className="divide-y divide-outline-variant border border-outline-variant rounded-lg overflow-hidden">
                {submissions.map((submission) => (
                  <li key={submission.id}>
                    <Link
                      to={`/submissions/${submission.id}`}
                      className="flex items-center gap-4 px-4 py-3 bg-surface-container hover:bg-surface-container-high transition-colors"
                    >
                      <StatusBadge status={submission.status} />
                      <span className="ml-auto text-code-sm font-jetbrains-mono text-on-surface-variant">
                        {LANGUAGE_LABELS[submission.language]}
                      </span>
                      <span className="text-code-sm font-jetbrains-mono text-on-surface-variant w-16 text-right">
                        {formatRuntime(submission.executionTimeMs)}
                      </span>
                      <span className="text-code-sm font-jetbrains-mono text-on-surface-variant w-20 text-right">
                        {formatMemory(submission.memoryUsedKb)}
                      </span>
                      <span className="text-body-sm text-on-surface-variant w-32 text-right">
                        {timeAgo(submission.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {(activeTab === "editorial" || activeTab === "solutions") && (
          <div className="h-full flex items-center justify-center text-on-surface-variant">
            Nothing here yet.
          </div>
        )}
      </div>
    </section>
  );
}
