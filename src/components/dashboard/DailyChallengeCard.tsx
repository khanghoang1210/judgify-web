import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart, Medal, Timer, Users } from "lucide-react";
import type { DailyChallenge } from "../../types/dashboard";

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
}

export function DailyChallengeCard({ challenge }: DailyChallengeCardProps) {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 group relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low p-8 flex flex-col justify-between transition-all hover:border-primary/50">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-label-caps font-jetbrains-mono border border-secondary-container/30 inline-flex items-center gap-1">
            <Timer size={14} />
            DAILY CHALLENGE
          </span>
          <div className="flex gap-2">
            {challenge.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-sm bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-headline-md font-semibold font-geist text-on-surface mb-2">
          {challenge.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
          <span className="inline-flex items-center gap-1 text-tertiary">
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
        <p className="text-on-surface-variant max-w-md text-body-sm">
          {challenge.description}
        </p>
        <button
          onClick={() => navigate(`/problems/${challenge.problemId}`)}
          className="shrink-0 bg-primary text-on-primary h-12 px-6 rounded-md font-bold hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          Solve Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
