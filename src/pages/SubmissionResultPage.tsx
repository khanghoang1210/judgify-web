import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, RefreshCw } from "lucide-react";
import { submissionResult } from "../data/submissions";
import { SubmissionStatusBanner } from "../components/submissions/SubmissionStatusBanner";
import { PerformanceStatCard } from "../components/submissions/PerformanceStatCard";
import { CodePreviewCard } from "../components/submissions/CodePreviewCard";
import { NextStepsPanel } from "../components/submissions/NextStepsPanel";
import { TestCasesPanel } from "../components/submissions/TestCasesPanel";
import { RankUpCard } from "../components/submissions/RankUpCard";

export function SubmissionResultPage() {
  const navigate = useNavigate();
  const submission = submissionResult;

  return (
    <div className="space-y-6">
      {/* Header & breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex flex-wrap items-center gap-2 text-on-surface-variant text-label-caps uppercase font-jetbrains-mono mb-2">
            <button
              onClick={() => navigate("/problems")}
              className="hover:text-primary transition-colors"
            >
              Problems
            </button>
            <ChevronRight size={14} />
            <button
              onClick={() => navigate(`/problems/${submission.problemId}`)}
              className="hover:text-primary transition-colors"
            >
              {submission.problemTitle}
            </button>
            <ChevronRight size={14} />
            <span className="text-on-surface">Submission #{submission.id}</span>
          </nav>
          <h1 className="text-headline-md font-bold font-geist text-on-surface">
            Submission Result
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/problems/${submission.problemId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant text-on-surface hover:border-primary transition-all text-body-sm"
          >
            <ArrowLeft size={20} />
            Back to problem
          </button>
          <button
            onClick={() => navigate(`/problems/${submission.problemId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container transition-all text-body-sm"
          >
            <RefreshCw size={20} />
            Try again
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-6">
          <SubmissionStatusBanner submission={submission} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceStatCard stat={submission.runtime} />
            <PerformanceStatCard stat={submission.memory} />
          </div>

          <CodePreviewCard
            fileName={submission.fileName}
            code={submission.code}
          />
        </div>

        {/* Side panel */}
        <div className="lg:col-span-4 space-y-6">
          <NextStepsPanel />
          <TestCasesPanel submission={submission} />
          <RankUpCard
            title={submission.rankUpTitle}
            message={submission.rankUpMessage}
          />
        </div>
      </div>
    </div>
  );
}
