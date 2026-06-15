import type {
    LeaderboardEntry,
    GlobalStanding,
    CTABannerData,
} from "../types/leaderboard";

export const CURRENT_USER_ID = "alex-chen";

export const leaderboardEntries: LeaderboardEntry[] = [
    { rank: 1, userId: "binary-wizard", username: "BinaryWizard", tier: "Grandmaster", solved: 158, acceptance: 94.2, score: 13450, streak: 42, rankChange: "same", avatarInitial: "B" },
    { rank: 2, userId: "null-pointer", username: "NullPointer_", tier: "Grandmaster", solved: 142, acceptance: 91.5, score: 11920, streak: 15, rankChange: "same", avatarInitial: "N" },
    { rank: 3, userId: "recursive-night", username: "RecursiveNight", tier: "Master", solved: 135, acceptance: 87.3, score: 10845, streak: 38, rankChange: "same", avatarInitial: "R" },
    { rank: 4, userId: CURRENT_USER_ID, username: "Alex Chen (You)", tier: "Archon", solved: 84, acceptance: 74.8, score: 4210, streak: 7, rankChange: "up", avatarInitial: "A" },
    { rank: 5, userId: "quick-sort-90", username: "QuickSort_90", tier: "Diamond", solved: 128, acceptance: 76.4, score: 9560, streak: 12, rankChange: "down", avatarInitial: "Q" },
    { rank: 6, userId: "lambda-alpha", username: "LambdaAlpha", tier: "Diamond", solved: 115, acceptance: 80.3, score: 8930, streak: 21, rankChange: "up", avatarInitial: "L" },
    { rank: 7, userId: "hash-point", username: "HashPoint", tier: "Platinum", solved: 102, acceptance: 65.3, score: 7810, streak: 4, rankChange: "down", avatarInitial: "H" },
    { rank: 8, userId: "code-slayer", username: "CodeSlayer", tier: "Platinum", solved: 98, acceptance: 71.7, score: 7540, streak: 31, rankChange: "same", avatarInitial: "C" },
    { rank: 9, userId: "data-lord", username: "DataLord", tier: "Gold", solved: 94, acceptance: 84.0, score: 7120, streak: 18, rankChange: "up", avatarInitial: "D" },
    { rank: 10, userId: "void-stack", username: "VoidStack", tier: "Gold", solved: 91, acceptance: 71.3, score: 6990, streak: 2, rankChange: "down", avatarInitial: "V" },
    { rank: 11, userId: "memory-reaper", username: "MemoryReaper", tier: "Gold", solved: 88, acceptance: 74.5, score: 6540, streak: 54, rankChange: "same", avatarInitial: "M" },
];

export const globalStanding: GlobalStanding = {
    rank: 1240,
    percentile: "Top 5%",
    progressLabel: "Progress to Top 3%",
    progressPercent: 79,
};

export const ctaBanner: CTABannerData = {
    message: "Consistency is key. Solve 2 more hard problems today to climb into the Top 4%.",
    highlight: "2 more hard problems",
    primaryLabel: "Daily Challenge",
    secondaryLabel: "View Ranking System",
};

export const TOTAL_COMPETITORS = 24922;
