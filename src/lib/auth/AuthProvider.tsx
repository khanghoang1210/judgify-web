import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { login as loginRequest, register as registerRequest } from "../api/endpoints";
import { ApiError } from "../api/client";
import type { AuthResponse } from "../../types/api";
import { AuthContext } from "./authContext";
import type { AuthValue } from "./authContext";
import { clearSession, loadSession, saveSession, sessionFromAuth } from "./session";
import type { Session } from "./session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => loadSession());

  const authenticate = useCallback(async (request: () => Promise<AuthResponse>) => {
    const auth = await request();
    const next = sessionFromAuth(auth);
    if (!next) {
      throw new ApiError(0, "The server returned a token we could not read.");
    }
    saveSession(next);
    setSession(next);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      isAdmin: session?.role === "ADMIN",
      signIn: (payload) => authenticate(() => loginRequest(payload)),
      signUp: (payload) => authenticate(() => registerRequest(payload)),
      signOut: () => {
        clearSession();
        setSession(null);
      },
    }),
    [session, authenticate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
