import type { MasteryTone, TopicMastery } from "../../types/dashboard";

interface TopicMasteryCardProps {
  topics: TopicMastery[];
}

const barColor: Record<MasteryTone, string> = {
  tertiary: "bg-tertiary",
  primary: "bg-primary",
  muted: "bg-outline-variant",
};

const textColor: Record<MasteryTone, string> = {
  tertiary: "text-tertiary",
  primary: "text-primary",
  muted: "text-on-surface-variant",
};

export function TopicMasteryCard({ topics }: TopicMasteryCardProps) {
  return (
    <div className="lg:col-span-3 bg-surface-container-low rounded-lg border border-outline-variant p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-headline-sm font-semibold font-geist text-on-surface">
          Topic Mastery
        </h3>
        <button className="text-primary text-body-sm font-semibold hover:underline">
          View Roadmap
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {topics.map((topic) => (
          <div
            key={topic.name}
            className="flex-1 min-w-[140px] bg-surface-container-high p-4 rounded-md border border-outline-variant"
          >
            <div className="flex justify-between items-end mb-2">
              <span className="text-body-sm font-semibold text-on-surface">
                {topic.name}
              </span>
              <span className={`text-xs ${textColor[topic.tone]}`}>
                {topic.percent}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
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
