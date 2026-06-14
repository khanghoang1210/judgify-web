export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemStatus = "solved" | "attempted" | "unsolved";

export interface Problem {
    id: number;
    title: string;
    difficulty: Difficulty;
    acceptance: number; // percentage, e.g. 41.2
    tags: string[];
    status: ProblemStatus;
    lastSubmitted: string | null; // relative time string or null
}
