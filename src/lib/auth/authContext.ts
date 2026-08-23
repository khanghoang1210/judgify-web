import { createContext, useContext } from "react";
import type { LoginPayload, RegisterPayload } from "../../types/api";
import type { Session } from "./session";

export interface AuthValue {
  session: Session | null;
  isAdmin: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signUp: (payload: RegisterPayload) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
