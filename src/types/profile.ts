export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface ActivityDay {
    date: string; // YYYY-MM-DD
    count: number;
    level: ActivityLevel;
}

export type SubmissionResult = "accepted" | "wrong_answer" | "tle" | "mle";

export interface ActivityItem {
    id: string;
    title: string;
    category: string;
    timeAgo: string;
    result: SubmissionResult;
    points?: number;
    difficulty: "Easy" | "Medium" | "Hard";
}

export interface ProblemBreakdown {
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
}

export interface SkillScore {
    name: string;
    value: number; // 0–100
}

export interface AchievementBadge {
    id: string;
    name: string;
    icon: "star" | "trophy" | "zap" | "award" | "flame";
    earned: boolean;
}

export interface ProfileUser {
    username: string;
    tier: string;
    joinDate: string;
    bio: string;
    stats: {
        globalRating: number;
        problemsSolved: number;
        contestsRun: number;
    };
}
