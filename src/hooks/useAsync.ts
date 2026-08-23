import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../lib/api/client";

export interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
}

interface Settled<T> {
  key: string;
  data: T | null;
  error: string | null;
}

function messageOf(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

/**
 * Runs `fetcher` whenever `deps` change, aborting the in-flight request first.
 *
 * `loading` is derived by comparing the settled result's dep key with the
 * current one, so no state is written during render or synchronously in the
 * effect. `deps` must therefore be JSON-serialisable primitives.
 */
export function useAsync<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
): AsyncState<T> {
  const [nonce, setNonce] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  const key = `${nonce}:${JSON.stringify(deps)}`;
  const current = settled?.key === key ? settled : null;

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setSettled({ key, data: result, error: null });
      })
      .catch((cause) => {
        if (controller.signal.aborted) return;
        setSettled({ key, data: null, error: messageOf(cause) });
      });

    return () => controller.abort();
    // `fetcher` is redefined every render by design; `key` captures its inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return {
    data: current?.data ?? null,
    error: current?.error ?? null,
    loading: current === null,
    reload,
  };
}
