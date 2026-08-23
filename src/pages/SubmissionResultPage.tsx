import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Clock, Cpu, RefreshCw } from "lucide-react";
import { getProblem } from "../lib/api/endpoints";
import { useAsync } from "../hooks/useAsync";
import { useSubmission } from "../hooks/useSubmission";
import { useOverview } from "../lib/data/overviewContext";
import { problemIndex } from "../lib/derive";
import {
  formatMemory,
  formatMemoryLimit,
  formatRuntime,
  formatTimeLimit,
  sourceFileName,
} from "../lib/format";
import type { SubmissionDetail } from "../types/submission";
import { SubmissionStatusBanner } from "../components/submissions/SubmissionStatusBanner";
import { PerformanceStatCard } from "../components/submissions/PerformanceStatCard";
import { TestCasesPanel } from "../components/submissions/TestCasesPanel";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

export function SubmissionResultPage() {
  const navigate = useNavigate();
  const { submissionId = "" } = useParams();
  const { overview } = useOverview();

  const submissionState = useSubmission(Number(submissionId));
  const submission = submissionState.data;

  // The submission only carries a problem id; the slug comes from the problem list.
  const problemId = submission?.problemId ?? null;
  const problemSlug =
    overview && problemId != null
      ? (problemIndex(overview.problems).get(problemId)?.slug ?? null)
      : null;

  // Limits live on the problem detail resource, which is addressed by slug.
  const problemState = useAsync(
    (signal) => (problemSlug ? getProblem(problemSlug, signal) : Promise.resolve(null)),
    [problemSlug],
  );
  const problem = problemState.data;

  const detail = useMemo<SubmissionDetail | null>(() => {
    if (!submission) return null;
    const testResults = submission.testResults ?? [];
    return {
      id: submission.id,
      problemId: submission.problemId ?? 0,
      problemSlug: problemSlug ?? "",
      problemTitle: problem?.title ?? "Problem",
      status: submission.status,
      language: submission.language,
      fileName: sourceFileName(submission.language),
      submittedAt: submission.createdAt,
      errorMessage: submission.errorMessage,
      testResults,
      testCasesPassed: testResults.filter((result) => result.status === "ACCEPTED").length,
      testCasesTotal: testResults.length,
      runtime: formatRuntime(submission.executionTimeMs),
      memory: formatMemory(submission.memoryUsedKb),
      timeLimit: problem ? formatTimeLimit(problem.timeLimitMs) : "—",
      memoryLimit: problem ? formatMemoryLimit(problem.memoryLimitMb) : "—",
    };
  }, [submission, problem, problemSlug]);

  const problemHref = problemSlug ? `/problems/${problemSlug}` : "/problems";

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
              onClick={() => navigate(problemHref)}
              className="hover:text-primary transition-colors"
            >
              {detail?.problemTitle ?? "—"}
            </button>
            <ChevronRight size={14} />
            <span className="text-on-surface">Submission #{submissionId}</span>
          </nav>
          <h1 className="text-headline-md font-bold font-geist text-on-surface">
            Submission Result
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(problemHref)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant text-on-surface hover:border-primary transition-all text-body-sm"
          >
            <ArrowLeft size={20} />
            Back to problem
          </button>
          <button
            onClick={() => navigate(problemHref)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container transition-all text-body-sm"
          >
            <RefreshCw size={20} />
            Try again
          </button>
        </div>
      </div>

      <AsyncBoundary
        loading={submissionState.loading}
        error={submissionState.error}
        onRetry={submissionState.reload}
      >
        {detail && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-8 space-y-6">
              <SubmissionStatusBanner submission={detail} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformanceStatCard
                  label="Runtime"
                  value={detail.runtime}
                  icon={<Clock size={22} />}
                />
                <PerformanceStatCard
                  label="Memory Usage"
                  value={detail.memory}
                  icon={<Cpu size={22} />}
                />
              </div>

              {/*
                The API's submission resource does not return `sourceCode`, so the
                submitted code cannot be shown back to the user yet.
              */}
              <div className="bg-surface-container border border-outline-variant rounded-xl p-6">
                <p className="text-label-caps uppercase font-jetbrains-mono text-on-surface-variant mb-2">
                  Source file
                </p>
                <p className="font-jetbrains-mono text-code-md text-on-surface">
                  {detail.fileName}
                </p>
                <p className="text-body-sm text-on-surface-variant mt-3">
                  The API does not return submitted source code, so it cannot be shown here.
                </p>
              </div>
            </div>

            {/* Side panel */}
            <div className="lg:col-span-4 space-y-6">
              <TestCasesPanel submission={detail} />
            </div>
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
