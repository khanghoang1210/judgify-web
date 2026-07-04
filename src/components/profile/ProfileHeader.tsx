import { Calendar } from "lucide-react";
import type { ProfileUser } from "../../types/profile";

interface ProfileHeaderProps {
  user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-xl shrink-0 bg-linear-to-br from-primary-container via-secondary-container to-tertiary-container flex items-center justify-center border border-outline-variant">
          <span className="text-display-lg font-bold font-geist text-on-surface">
            {user.username[0].toUpperCase()}
          </span>
        </div>

        {/* Right side */}
        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold font-geist text-on-surface">
              {user.username}
            </h1>
            <span className="px-2.5 py-1 text-label-caps font-bold rounded-full bg-primary-container text-on-surface font-jetbrains-mono uppercase">
              {user.tier}
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-body-sm text-on-surface-variant whitespace-nowrap">
              <Calendar size={13} />
              Joined {user.joinDate}
            </span>
          </div>

          {/* Bio */}
          <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed max-w-2xl">
            {user.bio}
          </p>

          {/* Stat blocks */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-surface-container-high rounded-lg p-4 text-center border border-outline-variant">
              <div className="text-3xl font-bold font-geist text-on-surface">
                {user.stats.globalRating.toLocaleString()}
              </div>
              <div className="text-label-caps text-on-surface-variant font-jetbrains-mono mt-1 uppercase">
                Global Rating
              </div>
            </div>
            <div className="bg-surface-container-high rounded-lg p-4 text-center border border-outline-variant">
              <div className="text-3xl font-bold font-geist text-tertiary">
                {user.stats.problemsSolved}
              </div>
              <div className="text-label-caps text-on-surface-variant font-jetbrains-mono mt-1 uppercase">
                Problems Solved
              </div>
            </div>
            <div className="bg-surface-container-high rounded-lg p-4 text-center border border-outline-variant">
              <div className="text-3xl font-bold font-geist text-on-surface">
                {user.stats.contestsRun}
              </div>
              <div className="text-label-caps text-on-surface-variant font-jetbrains-mono mt-1 uppercase">
                Contests Run
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
