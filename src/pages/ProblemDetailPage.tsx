import { useState, useRef, useEffect } from "react";
import { Timer, ChevronLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { problemDetail } from "../data/problemDetail";
import { DifficultyBadge } from "../components/problems/DifficultyBadge";
import { ProblemDescriptionPanel } from "../components/editor/ProblemDescriptionPanel";
import { CodeEditorPanel } from "../components/editor/CodeEditorPanel";

export function ProblemDetailPage() {
  const problem = problemDetail;
  const navigate = useNavigate();
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = ((e.clientX - rect.left) / rect.width) * 100;
      if (next >= 30 && next <= 70) setLeftWidth(next);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* ── Unified header (replaces Topbar + sub-header) ── */}
      <header className="h-16 shrink-0 bg-background border-b border-outline-variant flex items-center gap-4 px-6">
        {/* Left: back · brand · problem title · difficulty */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/problems")}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-md"
            title="Back to problems"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-headline-sm font-bold font-geist text-primary">
            Judgify
          </span>

          <span className="w-px h-5 bg-outline-variant" />

          <h1 className="text-body-md font-bold font-geist text-primary">
            {problem.title}
          </h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        {/* Right: timer · bell · rank + avatar */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 bg-surface-container-high rounded-lg px-3 py-1.5 border border-outline-variant">
            <Timer size={16} className="text-primary" />
            <span className="font-jetbrains-mono text-code-md text-on-surface-variant">
              00:42:15
            </span>
          </div>

          <button className="w-9 h-9 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-label-caps text-on-surface-variant font-jetbrains-mono">
                RANK #42
              </p>
              <p className="text-body-sm font-medium text-on-surface leading-tight">
                Alex Dev
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-body-sm font-bold text-on-primary shrink-0">
              A
            </div>
          </div>
        </div>
      </header>

      {/* ── Resizable split panels ── */}
      <div ref={containerRef} className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left – Problem Description */}
        <div className="overflow-hidden" style={{ width: `${leftWidth}%` }}>
          <div className="h-full">
            <ProblemDescriptionPanel problem={problem} />
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="w-1 bg-outline-variant hover:bg-primary cursor-col-resize transition-colors relative group shrink-0"
          onMouseDown={() => setIsDragging(true)}
        >
          {/* Wider invisible hit area */}
          <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
          {/* Visual pill on hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Right – Code Editor */}
        <div
          className="overflow-hidden"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="h-full">
            <CodeEditorPanel problem={problem} />
          </div>
        </div>
      </div>
    </div>
  );
}
