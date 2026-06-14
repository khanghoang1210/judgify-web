import { Calendar } from "lucide-react";
import type { ProfileUser } from "../../types/profile";

interface ProfileHeaderProps {
    user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-6">
            <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-xl shrink-0 bg-gradient-to-br from-[var(--color-primary-container)] via-[var(--color-secondary-container)] to-[var(--color-tertiary-container)] flex items-center justify-center border border-[var(--color-outline-variant)]">
                    <span className="text-5xl font-bold font-[family-name:var(--font-geist)] text-white">
                        {user.username[0].toUpperCase()}
                    </span>
                </div>

                {/* Right side */}
                <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                            {user.username}
                        </h1>
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-surface)] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest">
                            {user.tier}
                        </span>
                        <span className="ml-auto flex items-center gap-1.5 text-sm text-[var(--color-on-surface-variant)] whitespace-nowrap">
                            <Calendar size={13} />
                            Joined {user.joinDate}
                        </span>
                    </div>

                    {/* Bio */}
                    <p className="mt-2 text-sm text-[var(--color-on-surface-variant)] leading-relaxed max-w-2xl">
                        {user.bio}
                    </p>

                    {/* Stat blocks */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-[var(--color-surface-container-high)] rounded-lg p-4 text-center border border-[var(--color-outline-variant)]">
                            <div className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                                {user.stats.globalRating.toLocaleString()}
                            </div>
                            <div className="text-xs text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)] tracking-widest mt-1 uppercase">
                                Global Rating
                            </div>
                        </div>
                        <div className="bg-[var(--color-surface-container-high)] rounded-lg p-4 text-center border border-[var(--color-outline-variant)]">
                            <div className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-tertiary)]">
                                {user.stats.problemsSolved}
                            </div>
                            <div className="text-xs text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)] tracking-widest mt-1 uppercase">
                                Problems Solved
                            </div>
                        </div>
                        <div className="bg-[var(--color-surface-container-high)] rounded-lg p-4 text-center border border-[var(--color-outline-variant)]">
                            <div className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                                {user.stats.contestsRun}
                            </div>
                            <div className="text-xs text-[var(--color-on-surface-variant)] font-[family-name:var(--font-jetbrains-mono)] tracking-widest mt-1 uppercase">
                                Contests Run
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
