import type { DashboardData } from "../types/dashboard";

export const dashboardData: DashboardData = {
  userName: "Alex",
  streakDays: 12,
  challenge: {
    problemId: 167,
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    points: 10,
    solvedCount: "45.2k",
    description:
      "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
    languages: ["Python", "C++"],
  },
  stats: {
    totalSolved: 142,
    totalProblems: 1200,
    streakDays: 12,
    acceptance: 68.5,
    difficultyBreakdown: {
      easy: 85,
      medium: 45,
      hard: 12,
    },
  },
  topics: [
    { name: "Array", percent: 82, tone: "tertiary" },
    { name: "DP", percent: 45, tone: "primary" },
    { name: "Graph", percent: 30, tone: "primary" },
    { name: "Tree", percent: 65, tone: "tertiary" },
    { name: "SQL", percent: 12, tone: "muted" },
    { name: "String", percent: 78, tone: "tertiary" },
  ],
  recommended: [
    {
      id: 20,
      title: "Valid Parentheses",
      difficulty: "Easy",
      timeAgo: "15m ago",
    },
    {
      id: 23,
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      timeAgo: "2h ago",
    },
    {
      id: 518,
      title: "Coin Change II",
      difficulty: "Medium",
      timeAgo: "5h ago",
    },
  ],
  submissions: [
    {
      id: 1,
      problemTitle: "LRU Cache",
      difficulty: "Hard",
      result: "accepted",
      runtime: "42ms",
      language: "Python3",
      timeAgo: "2 minutes ago",
    },
    {
      id: 2,
      problemTitle: "Valid Anagram",
      difficulty: "Easy",
      result: "accepted",
      runtime: "12ms",
      language: "C++",
      timeAgo: "45 minutes ago",
    },
    {
      id: 3,
      problemTitle: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      result: "wrong",
      runtime: "--",
      language: "Go",
      timeAgo: "1 hour ago",
    },
    {
      id: 4,
      problemTitle: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      result: "accepted",
      runtime: "56ms",
      language: "Rust",
      timeAgo: "3 hours ago",
    },
  ],
};
