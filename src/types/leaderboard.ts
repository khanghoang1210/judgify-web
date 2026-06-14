export type LeaderboardPeriod = "global" | "weekly" | "monthly";

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    tier: string;
    solved: number;
    acceptance: number; // 0–100
    score: number;
    streak: number;
    rankChange: "up" | "down" | "same";
    avatarInitial: string;
}

export interface GlobalStanding {
    rank: number;
    percentile: string;   // e.g. "Top 5%"
    progressLabel: string; // e.g. "Progress to Top 3%"
    progressPercent: number; // 0–100
}

export interface CTABannerData {
    message: string;
    highlight: string; // substring to color
    primaryLabel: string;
    secondaryLabel: string;
}
