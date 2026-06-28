import { useState, useMemo } from "react";
import { Sparkles } from "lucide-react";
import { problems, problemStats, trendingTags } from "../data/problems";
import type { Difficulty, ProblemStatus } from "../types/problem";
import { ProblemStatsRow } from "../components/problems/ProblemStatsRow";
import { ProblemFilters } from "../components/problems/ProblemFilters";
import { ProblemTable } from "../components/problems/ProblemTable";
import { Button } from "../components/ui/Button";

const PAGE_SIZE = 50;

export function ProblemsPage() {
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...problems];
    if (difficulty)
      result = result.filter(
        (p) => p.difficulty === (difficulty as Difficulty),
      );
    if (status)
      result = result.filter((p) => p.status === (status as ProblemStatus));
    if (topic) result = result.filter((p) => p.tags.some((t) => t === topic));
    if (sort === "acceptance-asc")
      result.sort((a, b) => a.acceptance - b.acceptance);
    else if (sort === "acceptance-desc")
      result.sort((a, b) => b.acceptance - a.acceptance);
    else if (sort === "difficulty-asc") {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      result.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else if (sort === "difficulty-desc") {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      result.sort((a, b) => order[b.difficulty] - order[a.difficulty]);
    }
    return result;
  }, [difficulty, status, topic, sort]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
  }

  function pickRandom() {
    const idx = Math.floor(Math.random() * problems.length);
    // navigate to that problem — for now just log
    alert(`Random: ${problems[idx].id}. ${problems[idx].title}`);
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-(family-name:--font-geist) text-(--color-on-surface)">
            Problems
          </h1>
          <p className="text-sm text-(--color-on-surface-variant) mt-1">
            Challenge yourself with curated coding problems from top tech
            companies.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={pickRandom}
          className="bg-(--color-primary) text-(--color-on-primary) border-(--color-primary) hover:bg-(--color-primary) hover:opacity-85 flex items-center gap-2 shrink-0 transition-opacity cursor-pointer"
        >
          <Sparkles size={14} />
          Pick Random
        </Button>
      </div>

      {/* Stats row */}
      <ProblemStatsRow {...problemStats} />

      {/* Filters */}
      <ProblemFilters
        difficulty={difficulty}
        status={status}
        topic={topic}
        sort={sort}
        onDifficultyChange={handleFilterChange(setDifficulty)}
        onStatusChange={handleFilterChange(setStatus)}
        onTopicChange={handleFilterChange(setTopic)}
        onSortChange={setSort}
      />

      {/* Problem table */}
      <ProblemTable
        problems={paginated}
        totalCount={filtered.length}
        currentPage={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      {/* Bottom cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* Master Technical Interviews */}
        <div className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-md p-6">
          <h3 className="text-base font-semibold font-(family-name:--font-geist) text-(--color-primary) mb-2">
            Master Technical Interviews
          </h3>
          <p className="text-sm text-(--color-on-surface-variant) mb-5 leading-relaxed">
            Our curated playlists for top companies like Google, Meta, and
            Netflix are designed to get you hired.
          </p>
          <Button variant="outline" size="sm">
            Explore Curated Sets
          </Button>
        </div>

        {/* Trending Tags */}
        <div className="bg-(--color-surface-container) border border-(--color-outline-variant) rounded-md p-6">
          <h3 className="text-xs font-semibold tracking-widest font-(family-name:--font-jetbrains-mono) text-(--color-primary) mb-4 uppercase">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 text-xs rounded-md border border-(--color-outline-variant) text-(--color-on-surface-variant) bg-(--color-surface-container-high) hover:border-(--color-primary) hover:text-(--color-primary) transition-colors font-(family-name:--font-jetbrains-mono)"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
