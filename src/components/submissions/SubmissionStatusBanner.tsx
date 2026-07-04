import { CheckCircle2, XCircle } from "lucide-react";
import type { SubmissionResult } from "../../types/submission";

interface SubmissionStatusBannerProps {
  submission: SubmissionResult;
}

export function SubmissionStatusBanner({
  submission,
}: SubmissionStatusBannerProps) {
  const accepted = submission.verdict === "Accepted";
  const accent = accepted ? "--color-tertiary" : "--color-error";

  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden relative">
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: `var(${accent})` }}
      />
      <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, var(${accent}) 10%, transparent)`,
              border: `1px solid color-mix(in srgb, var(${accent}) 20%, transparent)`,
            }}
          >
            {accepted ? (
              <CheckCircle2
                size={40}
                className="text-tertiary"
                fill="currentColor"
                fillOpacity={0.15}
              />
            ) : (
              <XCircle size={40} className="text-error" />
            )}
          </div>
          <div>
            <h2
              className="text-[32px] font-bold leading-none"
              style={{ color: `var(${accent})` }}
            >
              {submission.verdict}
            </h2>
            <p className="text-on-surface-variant mt-2 text-body-sm">
              Submitted {submission.submittedAgo} •{" "}
              <span className="text-on-surface">{submission.language}</span>
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="block mb-1 text-label-caps font-jetbrains-mono text-on-surface-variant">
            TEST CASES
          </span>
          <span className="text-[32px] font-bold font-geist text-on-surface">
            {submission.testCasesPassed}/{submission.testCasesTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
