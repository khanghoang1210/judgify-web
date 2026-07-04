import { useMemo, useState } from "react";
import { submissionList } from "../data/submissions";
import { Select } from "../components/ui/Select";
import { SubmissionsTable } from "../components/submissions/SubmissionsTable";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Accepted", label: "Accepted" },
  { value: "Wrong Answer", label: "Wrong Answer" },
  { value: "Time Limit Exceeded", label: "Time Limit Exceeded" },
  { value: "Runtime Error", label: "Runtime Error" },
];

const languageOptions = [
  { value: "", label: "All Languages" },
  { value: "Python3", label: "Python 3" },
  { value: "C++", label: "C++" },
  { value: "Java", label: "Java" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
];

export function SubmissionsPage() {
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState("");

  const filtered = useMemo(() => {
    return submissionList.filter((s) => {
      if (status && s.verdict !== status) return false;
      if (language && s.language !== language) return false;
      return true;
    });
  }, [status, language]);

  const acceptedCount = submissionList.filter(
    (s) => s.verdict === "Accepted",
  ).length;
  const acceptanceRate = Math.round(
    (acceptedCount / submissionList.length) * 100,
  );

  const stats = [
    { label: "Total Submissions", value: submissionList.length },
    { label: "Accepted", value: acceptedCount },
    { label: "Acceptance Rate", value: `${acceptanceRate}%` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-(family-name:--font-geist) text-(--color-on-surface)">
          Submissions
        </h1>
        <p className="text-(--color-on-surface-variant) mt-1">
          Review your recent submission history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-(--color-surface-container-high) rounded-xl border border-(--color-outline-variant) p-5"
          >
            <p className="text-xs font-semibold tracking-wider uppercase font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
              {stat.label}
            </p>
            <p className="text-2xl font-bold font-(family-name:--font-geist) text-(--color-on-surface) mt-2">
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
  );
}
