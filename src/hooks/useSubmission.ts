import { useCallback, useEffect, useState } from "react";
import { getSubmission } from "../lib/api/endpoints";
import { ApiError } from "../lib/api/client";
import { isPendingStatus } from "../lib/format";
import type { SubmissionResponse } from "../types/api";

const POLL_INTERVAL_MS = 2000;

interface Settled {
  key: string;
  data: SubmissionResponse | null;
  error: string | null;
}

/**
 * Loads one submission and keeps polling while the judge worker still has it,
 * so the verdict appears without a manual refresh. Each poll replaces the
 * settled value under the same key, so the UI never flips back to loading.
 */
export function useSubmission(id: number) {
  const [nonce, setNonce] = useState(0);
  const [settled, setSettled] = useState<Settled | null>(null);

  const valid = Number.isInteger(id) && id > 0;
  const key = `${nonce}:${id}`;
  const current = settled?.key === key ? settled : null;

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    if (!valid) return;

    const controller = new AbortController();
    let timer: number | undefined;

    const poll = async () => {
      try {
        const next = await getSubmission(id, controller.signal);
        if (controller.signal.aborted) return;
        setSettled({ key, data: next, error: null });
        if (isPendingStatus(next.status)) {
          timer = window.setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (cause) {
        if (controller.signal.aborted) return;
        setSettled({
          key,
          data: null,
          error: cause instanceof ApiError ? cause.message : "Could not load the submission.",
        });
      }
    };

    void poll();

    return () => {
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [key, id, valid]);

  return {
    data: current?.data ?? null,
    error: valid ? (current?.error ?? null) : "That submission id is not valid.",
    loading: valid && current === null,
    reload,
  };
}
