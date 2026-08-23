import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for problem descriptions, which the API stores as a
 * single Markdown string. Supports headings, paragraphs, bullet lists, fenced
 * code blocks, inline code and bold — deliberately no HTML passthrough, so
 * problem text can never inject markup.
 */

type Block =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; text: string };

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
    if (list.length) {
      blocks.push({ kind: "list", items: list });
      list = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trimStart().startsWith("```")) {
      flush();
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        body.push(lines[i]);
        i += 1;
      }
      blocks.push({ kind: "code", text: body.join("\n") });
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      blocks.push({
        kind: "heading",
        level: heading[1].length <= 2 ? 2 : 3,
        text: heading[2].trim(),
      });
      continue;
    }

    const item = /^\s*[-*]\s+(.*)$/.exec(line);
    if (item) {
      if (paragraph.length) flush();
      list.push(item[1].trim());
      continue;
    }

    if (line.trim() === "") {
      flush();
      continue;
    }

    if (list.length) flush();
    paragraph.push(line.trim());
  }

  flush();
  return blocks;
}

/** Renders `` `code` `` and `**bold**` spans; everything else stays plain text. */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]*`|\*\*[^*]+\*\*)/g).flatMap((chunk, index) => {
    if (!chunk) return [];
    if (chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 1) {
      return [
        <code
          key={index}
          className="font-jetbrains-mono text-code-md text-primary bg-surface-container-high px-1 py-0.5 rounded"
        >
          {chunk.slice(1, -1)}
        </code>,
      ];
    }
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return [
        <strong key={index} className="text-on-surface font-semibold">
          {chunk.slice(2, -2)}
        </strong>,
      ];
    }
    return [<span key={index}>{chunk}</span>];
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return block.level === 2 ? (
              <h3
                key={index}
                className="text-headline-sm font-semibold font-geist text-on-surface pt-2"
              >
                {block.text}
              </h3>
            ) : (
              <h4 key={index} className="text-body-md font-semibold text-on-surface pt-1">
                {block.text}
              </h4>
            );
          case "list":
            return (
              <ul key={index} className="list-disc pl-5 space-y-1.5 text-on-surface-variant">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{inline(item)}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={index}
                className="bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 overflow-x-auto"
              >
                <code className="font-jetbrains-mono text-code-md text-on-surface whitespace-pre">
                  {block.text}
                </code>
              </pre>
            );
          default:
            return (
              <p key={index} className="text-on-surface-variant leading-relaxed">
                {inline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
