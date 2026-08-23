import { useMemo, useState } from "react";
import { useOverview } from "../lib/data/overviewContext";
import { STATUS_LABELS, LANGUAGE_LABELS, isPendingStatus } from "../lib/format";
import type { ApiLanguage, ApiSubmissionStatus } from "../types/api";
import { Select } from "../components/ui/Select";
import { SubmissionsTable } from "../components/submissions/SubmissionsTable";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

const STATUS_FILTERS: ApiSubmissionStatus[] = [
  "ACCEPTED",
  "WRONG_ANSWER",
  "TIME_LIMIT_EXCEEDED",
  "MEMORY_LIMIT_EXCEEDED",
  "RUNTIME_ERROR",
  "COMPILE_ERROR",
  "PENDING",
  "JUDGING",
];

const statusOptions = [
  { value: "", label: "All Status" },
  ...STATUS_FILTERS.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
];

// The judge engine supports exactly these two languages.
const languageOptions: { value: string; label: string }[] = [
  { value: "", label: "All Languages" },
  ...(["PYTHON3", "CPP17"] as ApiLanguage[]).map((language) => ({
    value: language,
    label: LANGUAGE_LABELS[language],
  })),
];

export function SubmissionsPage() {
  const { myRows, loading, error, reload } = useOverview();
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState("");

  const filtered = useMemo(
    () =>
      myRows.filter((row) => {
        if (status && row.status !== status) return false;
        if (language && row.language !== language) return false;
        return true;
      }),
    [myRows, status, language],
  );

  const stats = useMemo(() => {
    const judged = myRows.filter((row) => !isPendingStatus(row.status));
    const accepted = judged.filter((row) => row.status === "ACCEPTED").length;
    const rate = judged.length === 0 ? 0 : Math.round((accepted / judged.length) * 100);
    return [
      { label: "Total Submissions", value: myRows.length },
      { label: "Accepted", value: accepted },
      { label: "Acceptance Rate", value: `${rate}%` },
    ];
  }, [myRows]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-geist text-on-surface">
          Submissions
        </h1>
        <p className="text-on-surface-variant mt-1">
          Review your recent submission history
        </p>
      </div>

      <AsyncBoundary loading={loading} error={error} onRetry={reload}>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-high rounded-xl border border-outline-variant p-5"
              >
                <p className="text-label-caps uppercase font-jetbrains-mono text-on-surface-variant">
                  {stat.label}
                </p>
                <p className="text-headline-md font-bold font-geist text-on-surface mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select
              value={status}
              onValueChange={setStatus}
              options={statusOptions}
              className="w-52"
            />
            <Select
              value={language}
              onValueChange={setLanguage}
              options={languageOptions}
              className="w-52"
            />
          </div>

          <SubmissionsTable submissions={filtered} />
        </div>
      </AsyncBoundary>
    </div>
  );
}
