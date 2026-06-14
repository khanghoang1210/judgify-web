import type {
    ProfileUser,
    ActivityItem,
    ProblemBreakdown,
    SkillScore,
    AchievementBadge,
    ActivityDay,
    ActivityLevel,
} from "../types/profile";

export const profileUser: ProfileUser = {
    username: "AlexDev",
    tier: "Pro Developer",
    joinDate: "March 2023",
    bio: "Full-stack architect by day, competitive programmer by night. Passionate about O(log n) solutions and clean code. Currently ranking in the top 5% of global problem solvers on Judgify.",
    stats: {
        globalRating: 2480,
        problemsSolved: 142,
        contestsRun: 12,
    },
};

export const recentActivity: ActivityItem[] = [
    {
        id: "1",
        title: "Maximum Subarray Sum",
        category: "Dynamic Programming",
        timeAgo: "2 hours ago",
        result: "accepted",
        points: 50,
        difficulty: "Hard",
    },
    {
        id: "2",
        title: "Valid Parentheses",
        category: "Stacks",
        timeAgo: "5 hours ago",
        result: "accepted",
        points: 15,
        difficulty: "Easy",
    },
    {
        id: "3",
        title: "Dijkstra Shortest Path",
        category: "Graph Theory",
        timeAgo: "Yesterday",
        result: "wrong_answer",
        difficulty: "Medium",
    },
];

export const problemBreakdown: ProblemBreakdown = {
    easy: { solved: 94, total: 128 },
    medium: { solved: 32, total: 300 },
    hard: { solved: 16, total: 200 },
};

export const skillScores: SkillScore[] = [
    { name: "DP", value: 85 },
    { name: "MATH", value: 70 },
    { name: "GRAPHS", value: 60 },
    { name: "STRING", value: 75 },
    { name: "SEARCH", value: 65 },
];

export const achievementBadges: AchievementBadge[] = [
    { id: "first-sub", name: "First Submission", icon: "star", earned: true },
    { id: "weekly-winner", name: "Weekly Winner", icon: "trophy", earned: true },
    { id: "lan-solver", name: "Lan Solver", icon: "zap", earned: false },
];

export const totalSubmissions = 3294;

// Generate deterministic 365-day activity data
function generateActivityData(): ActivityDay[] {
    const days: ActivityDay[] = [];
    const seed = [4, 1, 0, 2, 3, 0, 1, 2, 0, 4, 1, 3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 4, 2, 1, 3, 0, 2, 4, 1, 0];
    for (let i = 0; i < 365; i++) {
        const d = new Date(2025, 5, 15);
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split("T")[0];
        const level = seed[i % seed.length] as ActivityLevel;
        days.push({ date: dateStr, count: level * 2, level });
    }
    return days;
}

export const activityData: ActivityDay[] = generateActivityData();
