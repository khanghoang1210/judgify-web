import { useMemo } from "react";
import type { ReactNode } from "react";
import { listProblems, listProblemSubmissions } from "../api/endpoints";
import { useAuth } from "../auth/authContext";
import { useAsync } from "../../hooks/useAsync";
import { mySubmissions, toProblemRows, toSubmissionRows } from "../derive";
import type { Overview } from "../derive";
import { OverviewContext } from "./overviewContext";
import type { OverviewValue } from "./overviewContext";
import type { SubmissionResponse } from "../../types/api";

/**
 * One fan-out that every page shares.
 *
 * The API has no "my submissions" endpoint — submissions are only listed per
 * problem — so this fetches the problem list and then one submission list per
 * problem. That is fine for the current catalogue size; if the problem count
 * grows this should move behind a dedicated backend endpoint.
 */
async function fetchOverview(signedIn: boolean, signal: AbortSignal): Promise<Overview> {
  const problems = await listProblems(signal);
  if (!signedIn) return { problems, submissions: [] };

  const perProblem = await Promise.all(
    problems.map((problem) =>
      // A problem the user may not read submissions for should not fail the page.
      listProblemSubmissions(problem.id, signal).catch(() => [] as SubmissionResponse[]),
    ),
  );
  return { problems, submissions: perProblem.flat() };
}

export function OverviewProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const userId = session?.userId ?? null;

  const { data, loading, error, reload } = useAsync(
    (signal) => fetchOverview(userId != null, signal),
    [userId],
  );

  const value = useMemo<OverviewValue>(() => {
    const overview = data;
    const mine = overview ? mySubmissions(overview, userId) : [];
    return {
      overview,
      problems: overview ? toProblemRows(overview, userId) : [],
      mine,
      myRows: overview ? toSubmissionRows(mine, overview.problems) : [],
      loading,
      error,
      reload,
    };
  }, [data, userId, loading, error, reload]);

  return <OverviewContext.Provider value={value}>{children}</OverviewContext.Provider>;
}
