import { Link } from "react-router-dom";
import { ListChecks, Play } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  streakDays: number;
  signedIn: boolean;
}

export function DashboardHeader({ userName, streakDays, signedIn }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-geist text-on-background">
          {signedIn ? `Welcome back, ${userName}!` : "Welcome to Judgify"}
        </h1>
        <p className="text-on-surface-variant mt-1">
          {signedIn
            ? streakDays > 0
              ? `Ready for today's challenge? You're on a ${streakDays}-day streak.`
              : "Ready for today's challenge? Submit something to start a streak."
            : "Sign in to track your progress, streak and submissions."}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/submissions"
          className="px-5 py-2.5 rounded-md bg-surface-container-high border border-outline-variant hover:bg-surface-bright transition-colors text-on-surface font-semibold inline-flex items-center gap-2"
        >
          <ListChecks size={18} />
          Submissions
        </Link>
        <Link
          to="/problems"
          className="px-5 py-2.5 rounded-md bg-primary text-on-primary hover:opacity-90 transition-opacity font-semibold inline-flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Play size={18} />
          Start Coding
        </Link>
      </div>
    </div>
  );
}
