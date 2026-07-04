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
    <section className="flex flex-col h-full overflow-hidden border border-(--color-outline-variant) rounded-xl bg-(--color-surface-container-lowest)">
      {/* Editor header */}
      <div className="h-12 bg-(--color-surface-container-low) flex items-center justify-between px-4 border-b border-(--color-outline-variant)">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-(--color-surface-container-high) text-(--color-on-surface) text-sm rounded px-3 pr-8 py-1.5 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-(--color-primary)"
            >
              {problem.languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--color-on-surface-variant)">
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
          <button className="p-1.5 text-(--color-on-surface-variant) hover:text-(--color-primary) transition-colors">
            <Settings size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCode(problem.starterCode)}
            title="Reset code"
            className="p-1.5 text-(--color-on-surface-variant) hover:text-(--color-primary) transition-colors"
          >
            <RefreshCw size={18} />
          </button>
          <button className="p-1.5 text-(--color-on-surface-variant) hover:text-(--color-primary) transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Code editor */}
      <div className="flex-1 min-h-0 flex bg-(--color-surface-container-lowest) overflow-hidden">
        <div className="w-12 shrink-0 text-right pr-3 pt-4 select-none text-(--color-outline-variant) font-(family-name:--font-jetbrains-mono) text-sm leading-6 border-r border-(--color-outline-variant)/10 overflow-hidden">
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent text-(--color-on-surface) font-(family-name:--font-jetbrains-mono) text-sm leading-6 pt-4 px-4 focus:outline-none"
        />
      </div>

      {/* Test cases */}
      <div className="h-[34%] min-h-0 bg-(--color-surface) border-t border-(--color-outline-variant) flex flex-col">
        <div className="px-4 py-2 bg-(--color-surface-container-low) flex items-center justify-between border-b border-(--color-outline-variant)">
          <div className="flex items-center gap-4">
            {(["testcase", "result"] as BottomTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setBottomTab(tab)}
                className={`text-sm font-medium py-1 border-b-2 capitalize transition-colors ${
                  bottomTab === tab
                    ? "text-(--color-primary) border-(--color-primary)"
                    : "text-(--color-on-surface-variant) border-transparent hover:text-(--color-on-surface)"
                }`}
              >
                {tab === "testcase" ? "Testcase" : "Result"}
              </button>
            ))}
          </div>
          <span className="text-xs text-(--color-on-surface-variant) uppercase tracking-widest font-(family-name:--font-jetbrains-mono)">
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
                    className={`px-3 py-1 bg-(--color-surface-container-high) rounded text-sm transition-colors ${
                      activeCase === idx
                        ? "text-(--color-on-surface) border border-(--color-primary)/40"
                        : "text-(--color-on-surface-variant) border border-transparent hover:border-(--color-outline-variant)"
                    }`}
                  >
                    {tc.name}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-(--color-on-surface-variant) mb-1 font-(family-name:--font-jetbrains-mono) uppercase tracking-wider">
                    Methods
                  </p>
                  <div className="bg-(--color-surface-container-low) p-2 rounded font-(family-name:--font-jetbrains-mono) text-sm text-(--color-on-surface) border border-(--color-outline-variant)/30 break-all">
                    {testCase.methods}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-(--color-on-surface-variant) mb-1 font-(family-name:--font-jetbrains-mono) uppercase tracking-wider">
                    Arguments
                  </p>
                  <div className="bg-(--color-surface-container-low) p-2 rounded font-(family-name:--font-jetbrains-mono) text-sm text-(--color-on-surface) border border-(--color-outline-variant)/30 break-all">
                    {testCase.args}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-(--color-on-surface-variant)">
              Run your code to see the results.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-(--color-surface-container-low) border-t border-(--color-outline-variant) flex items-center justify-between px-6">
        <button className="flex items-center gap-2 text-(--color-on-surface-variant) hover:text-(--color-on-surface) transition-colors">
          <TerminalSquare size={18} />
          <span className="text-sm font-medium">Console</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBottomTab("result")}
            className="px-6 py-2 rounded-lg bg-(--color-surface-container-high) text-(--color-on-surface) font-semibold border border-(--color-outline-variant) hover:bg-(--color-surface-bright) transition-all"
          >
            Run
          </button>
          <button
            onClick={() => navigate(`/submissions/${problem.id}`)}
            className="px-8 py-2 rounded-lg bg-(--color-primary-container) text-(--color-on-primary-container) font-bold hover:opacity-90 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
