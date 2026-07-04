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
    <div className="bg-surface-container border border-outline-variant rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
          Test Cases
        </h3>
        <span
          className={`text-body-sm font-bold ${
            allPassed ? "text-tertiary" : "text-error"
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
                  ? "bg-tertiary/20 border border-tertiary/40"
                  : "bg-error/20 border border-error/40"
              }`}
            />
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-outline-variant space-y-3">
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
