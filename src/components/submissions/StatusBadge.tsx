import { AlertTriangle, CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import type { ApiSubmissionStatus } from "../../types/api";
import { STATUS_LABELS } from "../../lib/format";
import { STATUS_TONE } from "../../lib/statusTone";
import { cn } from "../../lib/cn";

function StatusIcon({ status, size }: { status: ApiSubmissionStatus; size: number }) {
  switch (status) {
    case "ACCEPTED":
      return <CheckCircle2 size={size} />;
    case "PENDING":
    case "JUDGING":
      return <Loader2 size={size} className="animate-spin" />;
    case "TIME_LIMIT_EXCEEDED":
    case "MEMORY_LIMIT_EXCEEDED":
      return <Clock size={size} />;
    case "RUNTIME_ERROR":
    case "SYSTEM_ERROR":
      return <AlertTriangle size={size} />;
    default:
      return <XCircle size={size} />;
  }
}

interface StatusBadgeProps {
  status: ApiSubmissionStatus;
  size?: number;
  className?: string;
}

export function StatusBadge({ status, size = 16, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold whitespace-nowrap",
        STATUS_TONE[status],
        className,
      )}
    >
      <StatusIcon status={status} size={size} />
      {STATUS_LABELS[status]}
    </span>
  );
}
