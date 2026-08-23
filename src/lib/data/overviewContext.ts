import { createContext, useContext } from "react";
import type { Overview } from "../derive";
import type { Problem } from "../../types/problem";
import type { SubmissionListItem } from "../../types/submission";
import type { SubmissionResponse } from "../../types/api";

export interface OverviewValue {
  overview: Overview | null;
  /** Problem rows with acceptance/status folded in. */
  problems: Problem[];
  /** Your own submissions, newest first. */
  mine: SubmissionResponse[];
  /** Your own submissions as table rows, newest first. */
  myRows: SubmissionListItem[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export const OverviewContext = createContext<OverviewValue | null>(null);

export function useOverview(): OverviewValue {
  const value = useContext(OverviewContext);
  if (!value) throw new Error("useOverview must be used inside <OverviewProvider>");
  return value;
}
