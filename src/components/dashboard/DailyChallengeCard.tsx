import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart, Medal, Timer, Users } from "lucide-react";
import type { DailyChallenge } from "../../types/dashboard";

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
}

export function DailyChallengeCard({ challenge }: DailyChallengeCardProps) {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 group relative overflow-hidden rounded-[var(--radius-lg)] border border-(--color-outline-variant) bg-(--color-surface-container-low) p-8 flex flex-col justify-between transition-all hover:border-(--color-primary)/50">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-(--color-primary)/5 rounded-full blur-3xl group-hover:bg-(--color-primary)/10 transition-colors" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 rounded-full bg-(--color-secondary-container)/20 text-(--color-secondary) text-xs font-semibold tracking-wider font-(family-name:--font-jetbrains-mono) border border-(--color-secondary-container)/30 inline-flex items-center gap-1">
            <Timer size={14} />
            DAILY CHALLENGE
          </span>
          <div className="flex gap-2">
            {challenge.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-[var(--radius-sm)] bg-(--color-surface-container-highest) text-(--color-on-surface) text-xs font-semibold border border-(--color-outline-variant)"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-semibold font-(family-name:--font-geist) text-(--color-on-surface) mb-2">
          {challenge.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-(--color-on-surface-variant)">
          <span className="inline-flex items-center gap-1 text-(--color-tertiary)">
            <BarChart size={18} />
            {challenge.difficulty}
          </span>
          <span className="inline-flex items-center gap-1">
            <Medal size={18} />
            {challenge.points} Points
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={18} />
            {challenge.solvedCount} solved
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <p className="text-(--color-on-surface-variant) max-w-md text-sm">
          {challenge.description}
        </p>
        <button
          onClick={() => navigate(`/problems/${challenge.problemId}`)}
          className="shrink-0 bg-(--color-primary) text-(--color-on-primary) h-12 px-6 rounded-[var(--radius-md)] font-bold hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          Solve Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
