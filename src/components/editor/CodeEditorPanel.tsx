import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Maximize2, RefreshCw, Settings, TerminalSquare } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import type { Extension } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import type { ApiLanguage, ProblemDetailResponse, TestCaseResponse } from "../../types/api";
import { useAuth } from "../../lib/auth/authContext";
import { createSubmission } from "../../lib/api/endpoints";
import { ApiError } from "../../lib/api/client";
import { LANGUAGE_LABELS } from "../../lib/format";
import { EDITOR_GRAMMAR, STARTER_CODE } from "../../lib/starterCode";
import { judgifyTheme, judgifyHighlighting } from "./editorTheme";

interface CodeEditorPanelProps {
  problem: ProblemDetailResponse;
  /** Sample cases only; hidden ones are never sent to the browser. */
  sampleTestCases: TestCaseResponse[];
}

/** The judge engine only supports these two. */
const LANGUAGES: ApiLanguage[] = ["PYTHON3", "CPP17"];

function langExtension(language: ApiLanguage): Extension[] {
  return EDITOR_GRAMMAR[language] === "python" ? [python()] : [cpp()];
}

export function CodeEditorPanel({ problem, sampleTestCases }: CodeEditorPanelProps) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [language, setLanguage] = useState<ApiLanguage>("PYTHON3");
  const [code, setCode] = useState(STARTER_CODE.PYTHON3);
  const [activeCase, setActiveCase] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(34); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const testCase = sampleTestCases[activeCase];

  /** Switching language swaps in that language's skeleton. */
  function changeLanguage(next: ApiLanguage) {
    setLanguage(next);
    setCode((current) => (current === STARTER_CODE[language] ? STARTER_CODE[next] : current));
  }

  async function handleSubmit() {
    if (!session) {
      navigate("/login", { state: { from: `/problems/${problem.slug}` } });
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const submission = await createSubmission(problem.id, { language, sourceCode: code });
      navigate(`/submissions/${submission.id}`);
    } catch (cause) {
      setSubmitError(cause instanceof ApiError ? cause.message : "Could not submit.");
    } finally {
      setSubmitting(false);
    }
  }

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
              onChange={(e) => changeLanguage(e.target.value as ApiLanguage)}
              className="appearance-none bg-surface-container-high text-on-surface text-body-sm rounded px-3 pr-8 py-1.5 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {LANGUAGES.map((value) => (
                <option key={value} value={value}>
                  {LANGUAGE_LABELS[value]}
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
            onClick={() => setCode(STARTER_CODE[language])}
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

      {/* Sample test cases */}
      <div
        className="min-h-0 bg-surface flex flex-col"
        style={{ height: `${bottomHeight}%` }}
      >
        <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between border-b border-outline-variant">
          <span className="text-body-sm font-medium py-1 border-b-2 text-primary border-primary">
            Sample cases
          </span>
          <span className="text-label-caps text-on-surface-variant uppercase font-jetbrains-mono">
            stdin → stdout
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {sampleTestCases.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-body-sm text-on-surface-variant px-6">
              {/* The only test-case endpoint is admin-scoped. */}
              Sample cases are only served to admin accounts right now.
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4 flex-wrap">
                {sampleTestCases.map((sample, idx) => (
                  <button
                    key={sample.id}
                    onClick={() => setActiveCase(idx)}
                    className={`px-3 py-1 bg-surface-container-high rounded text-body-sm transition-colors ${
                      activeCase === idx
                        ? "text-on-surface border border-primary/40"
                        : "text-on-surface-variant border border-transparent hover:border-outline-variant"
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>
              {testCase && (
                <div className="space-y-4">
                  <div>
                    <p className="text-label-caps text-on-surface-variant mb-1 font-jetbrains-mono uppercase">
                      Input
                    </p>
                    <pre className="bg-surface-container-low p-2 rounded font-jetbrains-mono text-code-md text-on-surface border border-outline-variant/30 whitespace-pre-wrap break-all">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <p className="text-label-caps text-on-surface-variant mb-1 font-jetbrains-mono uppercase">
                      Expected output
                    </p>
                    <pre className="bg-surface-container-low p-2 rounded font-jetbrains-mono text-code-md text-on-surface border border-outline-variant/30 whitespace-pre-wrap break-all">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-surface-container-low border-t border-outline-variant flex items-center justify-between px-6 gap-4">
        <div
          className={`flex items-center gap-2 min-w-0 ${
            submitError ? "text-error" : "text-on-surface-variant"
          }`}
        >
          <TerminalSquare size={18} className="shrink-0" />
          <span className="text-body-sm truncate">
            {submitError ?? (session ? "Submits to the judge queue" : "Sign in to submit")}
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="shrink-0 px-8 py-2 rounded-lg bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </section>
  );
}
