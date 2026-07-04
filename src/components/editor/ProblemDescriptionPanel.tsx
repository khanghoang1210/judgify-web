import { useState } from "react";
import { BookOpen, FileText, History, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import type { ProblemDetail } from "../../types/problemDetail";

interface ProblemDescriptionPanelProps {
  problem: ProblemDetail;
}

type TabId = "description" | "editorial" | "solutions" | "submissions";

const tabs: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: "description", label: "Description", icon: <FileText size={18} /> },
  { id: "editorial", label: "Editorial", icon: <BookOpen size={18} /> },
  { id: "solutions", label: "Solutions", icon: <Lightbulb size={18} /> },
  { id: "submissions", label: "Submissions", icon: <History size={18} /> },
];

export function ProblemDescriptionPanel({
  problem,
}: ProblemDescriptionPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <section className="flex flex-col h-full overflow-hidden border border-(--color-outline-variant) rounded-xl bg-(--color-surface-container-lowest)">
      {/* Tabs */}
      <div className="flex bg-(--color-surface-container-low) px-2 border-b border-(--color-outline-variant) overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-(--color-primary) text-(--color-primary)"
                : "border-transparent text-(--color-on-surface-variant) hover:text-(--color-on-surface)"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "description" ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold font-(family-name:--font-geist) text-(--color-on-surface) mb-4">
              {problem.number}. {problem.title}
            </h2>

            <p className="text-(--color-on-surface-variant) leading-relaxed mb-6">
              Design a data structure that follows the constraints of a{" "}
              <strong className="text-(--color-on-surface)">
                Least Recently Used (LRU) cache
              </strong>
              .
            </p>

            <p className="text-(--color-on-surface-variant) leading-relaxed mb-4">
              {problem.methodsIntro}
            </p>
            <ul className="list-disc pl-5 text-(--color-on-surface-variant) space-y-2 mb-6">
              {problem.methods.map((method) => (
                <li key={method.signature}>
                  <code className="text-(--color-primary) font-(family-name:--font-jetbrains-mono) text-sm">
                    {method.signature}
                  </code>{" "}
                  {method.description}
                </li>
              ))}
            </ul>

            {/* Example */}
            <div className="bg-(--color-surface-container-high) rounded-xl p-6 mb-8 border border-(--color-outline-variant)">
              <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-primary) mb-4">
                Example 1
              </h3>
              <div className="font-(family-name:--font-jetbrains-mono) text-sm space-y-4">
                <div className="bg-(--color-surface-container-low) p-4 rounded border border-(--color-outline-variant)/30">
                  <p className="text-(--color-primary) mb-1">Input</p>
                  {problem.example.input.map((line, idx) => (
                    <p
                      key={idx}
                      className="text-(--color-on-surface) break-all"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="bg-(--color-surface-container-low) p-4 rounded border border-(--color-outline-variant)/30">
                  <p className="text-(--color-primary) mb-1">Output</p>
                  <p className="text-(--color-on-surface) break-all">
                    {problem.example.output}
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-(--color-primary) mb-1">Explanation</p>
                  <div className="text-(--color-on-surface-variant) text-sm leading-relaxed space-y-1">
                    {problem.example.explanation.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface) mb-3">
                Constraints
              </h3>
              <ul className="list-disc pl-5 text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono) text-sm space-y-1">
                {problem.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-(--color-on-surface-variant)">
            Nothing here yet.
          </div>
        )}
      </div>
    </section>
  );
}
