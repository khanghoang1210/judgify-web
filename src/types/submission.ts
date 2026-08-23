import type { ApiLanguage, ApiSubmissionStatus, SubmissionTestResult } from "./api";
import type { Difficulty } from "./problem";

export interface SubmissionListItem {
  id: number;
  problemId: number;
  problemSlug: string;
  problemTitle: string;
  difficulty: Difficulty;
  status: ApiSubmissionStatus;
  language: ApiLanguage;
  /** Preformatted, "—" when the judge has not reported a value. */
  runtime: string;
  memory: string;
  /** ISO timestamp. */
  submittedAt: string;
}

/** The submission result page, assembled from the submission plus its problem. */
export interface SubmissionDetail {
  id: number;
  problemId: number;
  problemSlug: string;
  problemTitle: string;
  status: ApiSubmissionStatus;
  language: ApiLanguage;
  fileName: string;
  submittedAt: string;
  errorMessage: string | null;
  testResults: SubmissionTestResult[];
  testCasesPassed: number;
  testCasesTotal: number;
  runtime: string;
  memory: string;
  timeLimit: string;
  memoryLimit: string;
}
