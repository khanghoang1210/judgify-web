import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import type { Difficulty, ProblemStatus } from "../types/problem";
import { useOverview } from "../lib/data/overviewContext";
import { useAuth } from "../lib/auth/authContext";
import { deriveProblemStats } from "../lib/derive";
import { ProblemStatsRow } from "../components/problems/ProblemStatsRow";
import { ProblemFilters } from "../components/problems/ProblemFilters";
import { ProblemTable } from "../components/problems/ProblemTable";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";
import { Button } from "../components/ui/Button";

const PAGE_SIZE = 50;
const DIFFICULTY_ORDER: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };

export function ProblemsPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { problems, loading, error, reload } = useOverview();
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const stats = useMemo(() => deriveProblemStats(problems), [problems]);

  const filtered = useMemo(() => {
    let result = [...problems];
    if (difficulty) {
      result = result.filter((p) => p.difficulty === (difficulty as Difficulty));
    }
    if (status) {
      result = result.filter((p) => p.status === (status as ProblemStatus));
    }

    // Acceptance is unknown for problems nobody has been judged on yet; those
    // sort last either way rather than pretending to be 0%.
    const acceptance = (value: number | null) => value ?? -1;

    if (sort === "oldest") result.sort((a, b) => a.id - b.id);
    else if (sort === "newest") result.sort((a, b) => b.id - a.id);
    else if (sort === "acceptance-asc")
      result.sort((a, b) => acceptance(a.acceptance) - acceptance(b.acceptance));
    else if (sort === "acceptance-desc")
      result.sort((a, b) => acceptance(b.acceptance) - acceptance(a.acceptance));
    else if (sort === "difficulty-asc")
      result.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
    else if (sort === "difficulty-desc")
      result.sort((a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty]);

    return result;
  }, [problems, difficulty, status, sort]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
  }

  function pickRandom() {
    if (problems.length === 0) return;
    const problem = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/problems/${problem.slug}`);
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-headline-md font-bold font-geist text-on-surface">
            Problems
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Challenge yourself with the published problem set.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={pickRandom}
          disabled={problems.length === 0}
          className="bg-primary text-on-primary border-primary hover:bg-primary hover:opacity-85 flex items-center gap-2 shrink-0 transition-opacity cursor-pointer"
        >
          <Sparkles size={14} />
          Pick Random
        </Button>
      </div>

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={reload}
        empty={problems.length === 0}
        emptyMessage="No published problems yet."
      >
        <div className="space-y-6">
          <ProblemStatsRow {...stats} />

          {!session && (
            <p className="text-body-sm text-on-surface-variant bg-surface-container border border-outline-variant rounded-md px-4 py-3">
              Sign in to see acceptance rates and your solve status.
            </p>
          )}

          <ProblemFilters
            difficulty={difficulty}
            status={status}
            sort={sort}
            onDifficultyChange={handleFilterChange(setDifficulty)}
            onStatusChange={handleFilterChange(setStatus)}
            onSortChange={setSort}
          />

          <ProblemTable
            problems={paginated}
            totalCount={filtered.length}
            currentPage={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </AsyncBoundary>
    </div>
  );
}
