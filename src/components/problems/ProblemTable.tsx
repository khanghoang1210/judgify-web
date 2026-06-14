import { Link } from "react-router-dom";
import type { Problem } from "../../types/problem";
import { StatusIcon } from "./StatusIcon";
import { DifficultyBadge } from "./DifficultyBadge";

interface ProblemTableProps {
    problems: Problem[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function ProblemTable({
    problems,
    totalCount,
    currentPage,
    pageSize,
    onPageChange,
}: ProblemTableProps) {
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    const pageNumbers: (number | "...")[] = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return (
        <div className="rounded-[var(--radius-md)] border border-[var(--color-outline-variant)] overflow-hidden">
            <div className="overflow-x-auto">
                {/* Table header */}
                <div className="grid grid-cols-[80px_minmax(220px,1fr)_110px_110px_minmax(150px,190px)_120px] min-w-[780px] bg-[var(--color-surface-container-high)] border-b border-[var(--color-outline-variant)]">
                    <div className="px-3 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)] text-center">
                        STATUS
                    </div>
                    <div className="px-4 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                        TITLE
                    </div>
                    <div className="px-4 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                        DIFFICULTY
                    </div>
                    <div className="px-4 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                        ACCEPTANCE
                    </div>
                    <div className="px-4 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                        TAGS
                    </div>
                    <div className="px-4 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] tracking-wider font-[family-name:var(--font-jetbrains-mono)] text-right">
                        LAST SUBMITTED
                    </div>
                </div>

                {/* Rows */}
                {problems.map((problem, idx) => (
                    <div
                        key={problem.id}
                        className={`grid grid-cols-[80px_minmax(220px,1fr)_110px_110px_minmax(150px,190px)_120px] min-w-[780px] items-center border-b border-[var(--color-outline-variant)] last:border-b-0 hover:bg-[var(--color-surface-container-high)] transition-colors ${idx % 2 === 0 ? "bg-[var(--color-surface-container)]" : "bg-[var(--color-surface-container-low)]"
                            }`}
                    >
                        {/* Status */}
                        <div className="px-3 py-5 flex items-center justify-center">
                            <StatusIcon status={problem.status} />
                        </div>

                        {/* Title */}
                        <div className="px-4 py-5">
                            <Link
                                to={`/problems/${problem.id}`}
                                className="text-sm font-medium text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors"
                            >
                                {problem.id}. {problem.title}
                            </Link>
                        </div>

                        {/* Difficulty */}
                        <div className="px-4 py-5">
                            <DifficultyBadge difficulty={problem.difficulty} />
                        </div>

                        {/* Acceptance */}
                        <div className="px-4 py-5">
                            <span className="text-sm text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)]">
                                {problem.acceptance}%
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="px-4 py-5 flex flex-wrap gap-1.5">
                            {problem.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] border border-[var(--color-outline-variant)] font-[family-name:var(--font-jetbrains-mono)] whitespace-nowrap"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Last Submitted */}
                        <div className="px-4 py-5 text-right">
                            <span className="text-sm text-[var(--color-on-surface-variant)] whitespace-nowrap">
                                {problem.lastSubmitted ?? "—"}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Pagination footer */}
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-surface-container)] border-t border-[var(--color-outline-variant)]">
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                    Showing {start}–{end} of {totalCount.toLocaleString()} problems
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ‹
                    </button>
                    {pageNumbers.map((p, i) =>
                        p === "..." ? (
                            <span key={i} className="w-8 h-8 flex items-center justify-center text-[var(--color-on-surface-variant)] text-sm">
                                ...
                            </span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => onPageChange(p as number)}
                                className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${currentPage === p
                                    ? "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-semibold"
                                    : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)]"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}
