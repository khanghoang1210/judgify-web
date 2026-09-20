import { useRef, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProblem, listProblemSubmissions } from "../lib/api/endpoints";
import { useAuth } from "../lib/auth/authContext";
import { useAsync } from "../hooks/useAsync";
import { toDifficulty } from "../lib/format";
import type { SubmissionResponse } from "../types/api";
import { DifficultyBadge } from "../components/problems/DifficultyBadge";
import { ProblemDescriptionPanel } from "../components/editor/ProblemDescriptionPanel";
import { CodeEditorPanel } from "../components/editor/CodeEditorPanel";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

export function ProblemDetailPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const problemState = useAsync((signal) => getProblem(slug, signal), [slug]);
  const problem = problemState.data;
  const problemId = problem?.id ?? null;
  const userId = session?.userId ?? null;

  const submissionState = useAsync<SubmissionResponse[]>(
    (signal) =>
      problemId == null || userId == null
        ? Promise.resolve([])
        : listProblemSubmissions(problemId, signal),
    [problemId, userId],
  );

  const mySubmissions = (submissionState.data ?? []).filter((s) => s.userId === userId);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = ((e.clientX - rect.left) / rect.width) * 100;
      if (next >= 30 && next <= 70) setLeftWidth(next);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* ── Unified header (replaces Topbar + sub-header) ── */}
      <header className="h-14 shrink-0 bg-background border-b border-outline-variant flex items-center gap-4 px-4">
        {/* Left: back · brand · problem title · difficulty */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/problems")}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-md"
            title="Back to problems"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-headline-sm font-bold font-geist text-primary">
            Judgify
          </span>

          <span className="w-px h-5 bg-outline-variant" />

          <h1 className="text-body-md font-bold font-geist text-primary">
            {problem?.title ?? slug}
          </h1>
          {problem && <DifficultyBadge difficulty={toDifficulty(problem.difficulty)} />}
        </div>

        {/* Right: signed-in user */}
        <div className="flex items-center gap-3 ml-auto">
          {session ? (
            <>
              <div className="text-right">
                <p className="text-label-caps text-on-surface-variant font-jetbrains-mono">
                  {session.role}
                </p>
                <p className="text-body-sm font-medium text-on-surface leading-tight">
                  {session.username}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-body-sm font-bold text-on-primary shrink-0">
                {session.username[0]?.toUpperCase()}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 rounded-md bg-primary-container text-on-primary-container text-body-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>
          )}
        </div>
      </header>

      <AsyncBoundary
        loading={problemState.loading}
        error={problemState.error}
        onRetry={problemState.reload}
      >
        {problem && (
          /* ── Resizable split panels ── */
          <div ref={containerRef} className="flex-1 min-h-0 flex overflow-hidden">
            {/* Left – Problem Description */}
            <div className="overflow-hidden" style={{ width: `${leftWidth}%` }}>
              <div className="h-full">
                <ProblemDescriptionPanel
                  problem={problem}
                  submissions={mySubmissions}
                  submissionsLoading={submissionState.loading}
                />
              </div>
            </div>

            {/* Drag handle */}
            <div
              className="w-1 bg-outline-variant hover:bg-primary cursor-col-resize transition-colors relative group shrink-0"
              onMouseDown={() => setIsDragging(true)}
            >
              {/* Wider invisible hit area */}
              <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
              {/* Visual pill on hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-9 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Right – Code Editor */}
            <div
              className="overflow-hidden"
              style={{ width: `${100 - leftWidth}%` }}
            >
              <div className="h-full">
                <CodeEditorPanel problem={problem} sampleTestCases={problem.samples} />
              </div>
            </div>
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
