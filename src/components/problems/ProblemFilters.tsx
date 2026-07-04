import { useState } from "react";
import { Select } from "../ui/Select";
import { cn } from "../../lib/cn";

interface ProblemFiltersProps {
  onDifficultyChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onTopicChange: (v: string) => void;
  onSortChange: (v: string) => void;
  difficulty: string;
  status: string;
  topic: string;
  sort: string;
}

const difficultyOptions = [
  { value: "", label: "Difficulty" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const statusOptions = [
  { value: "", label: "Status" },
  { value: "solved", label: "Solved" },
  { value: "attempted", label: "Attempted" },
  { value: "unsolved", label: "Unsolved" },
];

const topicOptions = [
  { value: "", label: "Topic" },
  { value: "Array", label: "Array" },
  { value: "String", label: "String" },
  { value: "DP", label: "Dynamic Programming" },
  { value: "Graph", label: "Graph" },
  { value: "Tree", label: "Tree" },
  { value: "Linked List", label: "Linked List" },
  { value: "Hash Table", label: "Hash Table" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "acceptance-asc", label: "Acceptance ↑" },
  { value: "acceptance-desc", label: "Acceptance ↓" },
  { value: "difficulty-asc", label: "Difficulty ↑" },
  { value: "difficulty-desc", label: "Difficulty ↓" },
];

interface CompanyTagButtonProps {
  active: boolean;
  onClick: () => void;
}

function CompanyTagButton({ active, onClick }: CompanyTagButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-body-sm rounded-md border transition-colors font-medium",
        active
          ? "border-primary text-primary bg-surface-container-high"
          : "border-outline-variant text-on-surface-variant bg-surface-container-high hover:border-outline",
      )}
    >
      Company Tag
    </button>
  );
}

export function ProblemFilters({
  onDifficultyChange,
  onStatusChange,
  onTopicChange,
  onSortChange,
  difficulty,
  status,
  topic,
  sort,
}: ProblemFiltersProps) {
  const [companyTag, setCompanyTag] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Select
          value={difficulty}
          onValueChange={onDifficultyChange}
          options={difficultyOptions}
          className="w-32"
        />
        <Select
          value={status}
          onValueChange={onStatusChange}
          options={statusOptions}
          className="w-28"
        />
        <Select
          value={topic}
          onValueChange={onTopicChange}
          options={topicOptions}
          className="w-36"
        />
        <CompanyTagButton
          active={companyTag}
          onClick={() => setCompanyTag((v) => !v)}
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-body-sm text-on-surface-variant">Sort by:</span>
        <Select
          value={sort}
          onValueChange={onSortChange}
          options={sortOptions}
          className="w-36"
        />
      </div>
    </div>
  );
}
