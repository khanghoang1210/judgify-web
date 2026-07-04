import type { SubmissionResult } from "../../types/submission";

interface TestCasesPanelProps {
  submission: SubmissionResult;
}

export function TestCasesPanel({ submission }: TestCasesPanelProps) {
  const { testCasesPassed, testCasesTotal, timeLimit, memoryLimit } =
    submission;
  const allPassed = testCasesPassed === testCasesTotal;
  const passRate = Math.round((testCasesPassed / testCasesTotal) * 100);

  return (
    <div className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface)">
          Test Cases
        </h3>
        <span
          className={`text-sm font-bold ${
            allPassed ? "text-(--color-tertiary)" : "text-(--color-error)"
          }`}
        >
          {passRate}% Passed
        </span>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: testCasesTotal }).map((_, idx) => {
          const passed = idx < testCasesPassed;
          return (
            <div
              key={idx}
              title={`Case ${idx + 1}: ${passed ? "Passed" : "Failed"}`}
              className={`aspect-square rounded-[2px] transition-transform hover:scale-110 cursor-help ${
                passed
                  ? "bg-(--color-tertiary)/20 border border-(--color-tertiary)/40"
                  : "bg-(--color-error)/20 border border-(--color-error)/40"
              }`}
            />
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-(--color-outline-variant) space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-(--color-on-surface-variant)">Time Limit</span>
          <span className="text-(--color-on-surface) font-semibold">
            {timeLimit}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-(--color-on-surface-variant)">
            Memory Limit
          </span>
          <span className="text-(--color-on-surface) font-semibold">
            {memoryLimit}
          </span>
        </div>
      </div>
    </div>
  );
}
