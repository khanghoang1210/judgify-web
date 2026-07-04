import { useState } from "react";
import { Check, Copy, Maximize2 } from "lucide-react";

interface CodePreviewCardProps {
  fileName: string;
  code: string;
}

export function CodePreviewCard({ fileName, code }: CodePreviewCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-(--color-surface-container-lowest) border border-(--color-outline-variant) rounded-xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-(--color-surface-container-high) px-6 py-3 border-b border-(--color-outline-variant) flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-xs font-semibold tracking-wider uppercase font-(family-name:--font-jetbrains-mono) text-(--color-on-surface-variant)">
            Source Code
          </span>
          <div className="flex items-center gap-2 bg-(--color-background) px-2 py-1 rounded text-xs font-(family-name:--font-jetbrains-mono) text-(--color-on-surface) border border-(--color-outline-variant)/30">
            <span className="truncate">{fileName}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1.5 text-(--color-on-surface-variant) hover:text-(--color-primary) transition-colors"
          >
            {copied ? (
              <Check size={18} className="text-(--color-tertiary)" />
            ) : (
              <Copy size={18} />
            )}
          </button>
          <button
            title="Full screen"
            className="p-1.5 text-(--color-on-surface-variant) hover:text-(--color-primary) transition-colors"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-(--color-surface-container-lowest) p-6">
        <pre className="font-(family-name:--font-jetbrains-mono) text-sm leading-relaxed text-(--color-on-surface)">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
