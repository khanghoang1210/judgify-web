import type { SubmissionDetail } from "../../types/submission";
import { STATUS_LABELS, formatMemory, formatRuntime } from "../../lib/format";
import { STATUS_ACCENT } from "../../lib/statusTone";

interface TestCasesPanelProps {
  submission: SubmissionDetail;
}

export function TestCasesPanel({ submission }: TestCasesPanelProps) {
  const { testResults, testCasesPassed, testCasesTotal, timeLimit, memoryLimit } = submission;
  const passRate = testCasesTotal === 0 ? 0 : Math.round((testCasesPassed / testCasesTotal) * 100);
  const allPassed = testCasesTotal > 0 && testCasesPassed === testCasesTotal;

  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
          Test Cases
        </h3>
        <span
          className={`text-body-sm font-bold ${
            testCasesTotal === 0 ? "text-on-surface-variant" : allPassed ? "text-tertiary" : "text-error"
          }`}
        >
          {testCasesTotal === 0 ? "Not judged" : `${passRate}% Passed`}
        </span>
      </div>

      {testResults.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant">
          {/* The judge writes one row per test case once it runs the submission. */}
          No per-test results yet.
        </p>
      ) : (
        <div className="grid grid-cols-8 gap-2">
          {testResults.map((result, idx) => {
            const accent = STATUS_ACCENT[result.status];
            return (
              <div
                key={result.id}
                title={`Case ${idx + 1}: ${STATUS_LABELS[result.status]} · ${formatRuntime(result.runtimeMs)} · ${formatMemory(result.memoryKb)}`}
                className="aspect-square rounded-xs transition-transform hover:scale-110 cursor-help"
                style={{
                  backgroundColor: `color-mix(in srgb, var(${accent}) 20%, transparent)`,
                  border: `1px solid color-mix(in srgb, var(${accent}) 40%, transparent)`,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-6 border-t border-outline-variant space-y-3">
        <div className="flex justify-between text-body-sm">
          <span className="text-on-surface-variant">Time Limit</span>
          <span className="text-on-surface font-semibold">{timeLimit}</span>
        </div>
        <div className="flex justify-between text-body-sm">
          <span className="text-on-surface-variant">Memory Limit</span>
          <span className="text-on-surface font-semibold">{memoryLimit}</span>
        </div>
      </div>
    </div>
  );
}
