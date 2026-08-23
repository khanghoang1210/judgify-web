import { Select } from "../ui/Select";

interface ProblemFiltersProps {
  onDifficultyChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onSortChange: (v: string) => void;
  difficulty: string;
  status: string;
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

// Topic filtering is gone: the API has no tags on problems.
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "acceptance-asc", label: "Acceptance ↑" },
  { value: "acceptance-desc", label: "Acceptance ↓" },
  { value: "difficulty-asc", label: "Difficulty ↑" },
  { value: "difficulty-desc", label: "Difficulty ↓" },
];

export function ProblemFilters({
  onDifficultyChange,
  onStatusChange,
  onSortChange,
  difficulty,
  status,
  sort,
}: ProblemFiltersProps) {
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
