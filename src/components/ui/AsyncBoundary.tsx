import { AlertTriangle, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface AsyncBoundaryProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  /** Rendered when loading finishes with no error but nothing to show. */
  empty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

const WRAPPER = "flex flex-col items-center justify-center gap-3 py-16 text-center";

/** Shared loading / error / empty states so every page fails the same way. */
export function AsyncBoundary({
  loading,
  error,
  onRetry,
  empty = false,
  emptyMessage = "Nothing here yet.",
  children,
}: AsyncBoundaryProps) {
  if (loading) {
    return (
      <div className={WRAPPER}>
        <Loader2 size={28} className="text-primary animate-spin" />
        <p className="text-body-sm text-on-surface-variant">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={WRAPPER}>
        <AlertTriangle size={28} className="text-error" />
        <p className="text-body-sm text-on-surface">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-md bg-surface-container-high border border-outline-variant text-body-sm text-on-surface hover:border-primary transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className={WRAPPER}>
        <p className="text-body-sm text-on-surface-variant">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
