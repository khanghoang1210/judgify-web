import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize2, RefreshCw, Settings, TerminalSquare } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import type { Extension } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import type { ProblemDetail } from "../../types/problemDetail";
import { judgifyTheme, judgifyHighlighting } from "./editorTheme";

interface CodeEditorPanelProps {
  problem: ProblemDetail;
}

type BottomTab = "testcase" | "result";

/** Maps a language value to its CodeMirror grammar (empty = no highlighting). */
function langExtension(language: string): Extension[] {
  switch (language) {
    case "python":
      return [python()];
    case "cpp":
      return [cpp()];
    case "java":
      return [java()];
    default:
      return [];
  }
}

export function CodeEditorPanel({ problem }: CodeEditorPanelProps) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(
    problem.languages[2]?.value ?? "python",
  );
  const [code, setCode] = useState(problem.starterCode);
  const [bottomTab, setBottomTab] = useState<BottomTab>("testcase");
  const [activeCase, setActiveCase] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(34); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testCase = problem.testCases[activeCase];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newBottomHeight = ((rect.bottom - e.clientY) / rect.height) * 100;
      // Limit between 20% and 60%
      if (newBottomHeight >= 20 && newBottomHeight <= 60) {
        setBottomHeight(newBottomHeight);
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "row-resize";
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
    <section
      ref={containerRef}
      className="flex flex-col h-full overflow-hidden bg-surface-container-lowest"
    >
      {/* Editor header */}
      <div className="h-12 bg-surface-container-low flex items-center justify-between px-4 border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-surface-container-high text-on-surface text-body-sm rounded px-3 pr-8 py-1.5 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {problem.languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
            <Settings size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCode(problem.starterCode)}
            title="Reset code"
            className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
          >
            <RefreshCw size={18} />
          </button>
          <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Code editor */}
      <div
        className="min-h-0 bg-surface-container-lowest overflow-hidden"
        style={{ height: `${100 - bottomHeight}%` }}
      >
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          height="100%"
          theme={judgifyTheme}
          extensions={[...langExtension(language), judgifyHighlighting]}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            indentOnInput: true,
            foldGutter: false,
            syntaxHighlighting: false,
          }}
          className="h-full text-code-md"
        />
      </div>

      {/* Resizer */}
      <div
        className="h-1 bg-outline-variant hover:bg-primary cursor-row-resize transition-colors relative group shrink-0"
        onMouseDown={() => setIsDragging(true)}
      >
        {/* Wider invisible hit area */}
        <div className="absolute inset-x-0 -top-1.5 -bottom-1.5" />
        {/* Visual pill on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Test cases */}
      <div
        className="min-h-0 bg-surface flex flex-col"
        style={{ height: `${bottomHeight}%` }}
      >
        <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between border-b border-outline-variant">
          <div className="flex items-center gap-4">
            {(["testcase", "result"] as BottomTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setBottomTab(tab)}
                className={`text-body-sm font-medium py-1 border-b-2 capitalize transition-colors ${
                  bottomTab === tab
                    ? "text-primary border-primary"
                    : "text-on-surface-variant border-transparent hover:text-on-surface"
                }`}
              >
                {tab === "testcase" ? "Testcase" : "Result"}
              </button>
            ))}
          </div>
          <span className="text-label-caps text-on-surface-variant uppercase font-jetbrains-mono">
            Ready to run
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {bottomTab === "testcase" ? (
            <>
              <div className="flex gap-2 mb-4">
                {problem.testCases.map((tc, idx) => (
                  <button
                    key={tc.name}
                    onClick={() => setActiveCase(idx)}
                    className={`px-3 py-1 bg-surface-container-high rounded text-body-sm transition-colors ${
                      activeCase === idx
                        ? "text-on-surface border border-primary/40"
                        : "text-on-surface-variant border border-transparent hover:border-outline-variant"
                    }`}
                  >
                    {tc.name}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-label-caps text-on-surface-variant mb-1 font-jetbrains-mono uppercase">
                    Methods
                  </p>
                  <div className="bg-surface-container-low p-2 rounded font-jetbrains-mono text-code-md text-on-surface border border-outline-variant/30 break-all">
                    {testCase.methods}
                  </div>
                </div>
                <div>
                  <p className="text-label-caps text-on-surface-variant mb-1 font-jetbrains-mono uppercase">
                    Arguments
                  </p>
                  <div className="bg-surface-container-low p-2 rounded font-jetbrains-mono text-code-md text-on-surface border border-outline-variant/30 break-all">
                    {testCase.args}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-body-sm text-on-surface-variant">
              Run your code to see the results.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-surface-container-low border-t border-outline-variant flex items-center justify-between px-6">
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors">
          <TerminalSquare size={18} />
          <span className="text-body-sm font-medium">Console</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBottomTab("result")}
            className="px-6 py-2 rounded-lg bg-surface-container-high text-on-surface font-semibold border border-outline-variant hover:bg-surface-bright transition-all"
          >
            Run
          </button>
          <button
            onClick={() => navigate(`/submissions/${problem.id}`)}
            className="px-8 py-2 rounded-lg bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
