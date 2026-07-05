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
    <section className="flex flex-col h-full overflow-hidden bg-surface-container-lowest">
      {/* Tabs */}
      <div className="flex bg-surface-container-low px-2 border-b border-outline-variant overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 border-b-2 font-medium text-body-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
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
            <h2 className="text-headline-md font-semibold font-geist text-on-surface mb-4">
              {problem.number}. {problem.title}
            </h2>

            <p className="text-on-surface-variant leading-relaxed mb-6">
              Design a data structure that follows the constraints of a{" "}
              <strong className="text-on-surface">
                Least Recently Used (LRU) cache
              </strong>
              .
            </p>

            <p className="text-on-surface-variant leading-relaxed mb-4">
              {problem.methodsIntro}
            </p>
            <ul className="list-disc pl-5 text-on-surface-variant space-y-2 mb-6">
              {problem.methods.map((method) => (
                <li key={method.signature}>
                  <code className="text-primary font-jetbrains-mono text-code-md">
                    {method.signature}
                  </code>{" "}
                  {method.description}
                </li>
              ))}
            </ul>

            {/* Example */}
            <div className="bg-surface-container-high rounded-xl p-6 mb-8 border border-outline-variant">
              <h3 className="text-headline-sm font-semibold font-geist text-primary mb-4">
                Example 1
              </h3>
              <div className="font-jetbrains-mono text-code-md space-y-4">
                <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30">
                  <p className="text-primary mb-1">Input</p>
                  {problem.example.input.map((line, idx) => (
                    <p key={idx} className="text-on-surface break-all">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30">
                  <p className="text-primary mb-1">Output</p>
                  <p className="text-on-surface break-all">
                    {problem.example.output}
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-primary mb-1">Explanation</p>
                  <div className="text-on-surface-variant text-body-sm leading-relaxed space-y-1">
                    {problem.example.explanation.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="mb-4">
              <h3 className="text-headline-sm font-semibold font-geist text-on-surface mb-3">
                Constraints
              </h3>
              <ul className="list-disc pl-5 text-on-surface-variant font-jetbrains-mono text-code-md space-y-1">
                {problem.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-on-surface-variant">
            Nothing here yet.
          </div>
        )}
      </div>
    </section>
  );
}
