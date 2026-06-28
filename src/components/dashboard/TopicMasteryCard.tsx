import type { MasteryTone, TopicMastery } from "../../types/dashboard";

interface TopicMasteryCardProps {
  topics: TopicMastery[];
}

const barColor: Record<MasteryTone, string> = {
  tertiary: "bg-(--color-tertiary)",
  primary: "bg-(--color-primary)",
  muted: "bg-(--color-outline-variant)",
};

const textColor: Record<MasteryTone, string> = {
  tertiary: "text-(--color-tertiary)",
  primary: "text-(--color-primary)",
  muted: "text-(--color-on-surface-variant)",
};

export function TopicMasteryCard({ topics }: TopicMasteryCardProps) {
  return (
    <div className="lg:col-span-3 bg-(--color-surface-container-low) rounded-[var(--radius-lg)] border border-(--color-outline-variant) p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface)">
          Topic Mastery
        </h3>
        <button className="text-(--color-primary) text-sm font-semibold hover:underline">
          View Roadmap
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {topics.map((topic) => (
          <div
            key={topic.name}
            className="flex-1 min-w-[140px] bg-(--color-surface-container-high) p-4 rounded-[var(--radius-md)] border border-(--color-outline-variant)"
          >
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-(--color-on-surface)">
                {topic.name}
              </span>
              <span className={`text-xs ${textColor[topic.tone]}`}>
                {topic.percent}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-(--color-surface-container-highest) rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor[topic.tone]}`}
                style={{ width: `${topic.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
