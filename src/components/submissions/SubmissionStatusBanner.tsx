import { AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { SubmissionDetail } from "../../types/submission";
import { LANGUAGE_LABELS, STATUS_LABELS, isPendingStatus, timeAgo } from "../../lib/format";
import { STATUS_ACCENT } from "../../lib/statusTone";

interface SubmissionStatusBannerProps {
  submission: SubmissionDetail;
}

export function SubmissionStatusBanner({ submission }: SubmissionStatusBannerProps) {
  const { status } = submission;
  const accent = STATUS_ACCENT[status];
  const pending = isPendingStatus(status);

  return (
    <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden relative">
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: `var(${accent})` }}
      />
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, var(${accent}) 10%, transparent)`,
              border: `1px solid color-mix(in srgb, var(${accent}) 20%, transparent)`,
            }}
          >
            {pending ? (
              <Loader2 size={28} style={{ color: `var(${accent})` }} className="animate-spin" />
            ) : status === "ACCEPTED" ? (
              <CheckCircle2
                size={32}
                className="text-tertiary"
                fill="currentColor"
                fillOpacity={0.15}
              />
            ) : status === "RUNTIME_ERROR" || status === "SYSTEM_ERROR" ? (
              <AlertTriangle size={32} style={{ color: `var(${accent})` }} />
            ) : (
              <XCircle size={32} style={{ color: `var(${accent})` }} />
            )}
          </div>
          <div>
            <h2
              className="text-[32px] font-bold leading-none"
              style={{ color: `var(${accent})` }}
            >
              {STATUS_LABELS[status]}
            </h2>
            <p className="text-on-surface-variant mt-2 text-body-sm">
              Submitted {timeAgo(submission.submittedAt)} •{" "}
              <span className="text-on-surface">{LANGUAGE_LABELS[submission.language]}</span>
            </p>
            {submission.errorMessage && (
              <p className="mt-2 text-code-sm font-jetbrains-mono text-error break-all">
                {submission.errorMessage}
              </p>
            )}
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="block mb-1 text-label-caps font-jetbrains-mono text-on-surface-variant">
            TEST CASES
          </span>
          <span className="text-[32px] font-bold font-geist text-on-surface">
            {submission.testCasesTotal === 0
              ? "—"
              : `${submission.testCasesPassed}/${submission.testCasesTotal}`}
          </span>
        </div>
      </div>
    </div>
  );
}
