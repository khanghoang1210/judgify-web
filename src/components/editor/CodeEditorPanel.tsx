import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize2, RefreshCw, Settings, TerminalSquare } from "lucide-react";
import type { ProblemDetail } from "../../types/problemDetail";

interface CodeEditorPanelProps {
  problem: ProblemDetail;
}

type BottomTab = "testcase" | "result";

export function CodeEditorPanel({ problem }: CodeEditorPanelProps) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(
    problem.languages[2]?.value ?? "python",
  );
  const [code, setCode] = useState(problem.starterCode);
  const [bottomTab, setBottomTab] = useState<BottomTab>("testcase");
  const [activeCase, setActiveCase] = useState(0);

  const lineCount = code.split("\n").length;
  const testCase = problem.testCases[activeCase];

  return (
    <section className="flex flex-col h-full overflow-hidden border border-outline-variant rounded-xl bg-surface-container-lowest">
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
      <div className="flex-1 min-h-0 flex bg-surface-container-lowest overflow-hidden">
        <div className="w-12 shrink-0 text-right pr-3 pt-4 select-none text-outline-variant font-jetbrains-mono text-code-md leading-6 border-r border-outline-variant/10 overflow-hidden">
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent text-on-surface font-jetbrains-mono text-code-md leading-6 pt-4 px-4 focus:outline-none"
        />
      </div>

      {/* Test cases */}
      <div className="h-[34%] min-h-0 bg-surface border-t border-outline-variant flex flex-col">
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
