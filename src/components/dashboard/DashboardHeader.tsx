import { BarChart3, Play } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  streakDays: number;
}

export function DashboardHeader({
  userName,
  streakDays,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-geist text-on-background">
          Welcome back, {userName}!
        </h1>
        <p className="text-on-surface-variant mt-1">
          Ready for today's challenge? You're on a {streakDays}-day winning
          streak.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-5 py-2.5 rounded-md bg-surface-container-high border border-outline-variant hover:bg-surface-bright transition-colors text-on-surface font-semibold inline-flex items-center gap-2">
          <BarChart3 size={18} />
          Stats
        </button>
        <button className="px-5 py-2.5 rounded-md bg-primary text-on-primary hover:opacity-90 transition-opacity font-semibold inline-flex items-center gap-2 shadow-lg shadow-primary/20">
          <Play size={18} />
          Resume Coding
        </button>
      </div>
    </div>
  );
}
