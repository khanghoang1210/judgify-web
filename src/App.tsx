import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { AppShell } from "./components/layout/AppShell";
import { AuthProvider } from "./lib/auth/AuthProvider";
import { useAuth } from "./lib/auth/authContext";
import { OverviewProvider } from "./lib/data/OverviewProvider";
import { DashboardPage } from "./pages/DashboardPage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { ProblemDetailPage } from "./pages/ProblemDetailPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { SubmissionResultPage } from "./pages/SubmissionResultPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

/** Sends signed-out visitors to /login, remembering where they were headed. */
function RequireAuth({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OverviewProvider>
          <Routes>
            {/* Auth pages - no sidebar */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Problem detail page has its own layout without sidebar */}
            <Route path="/problems/:slug" element={<ProblemDetailPage />} />

            {/* Other pages use AppShell with sidebar */}
            <Route
              path="*"
              element={
                <AppShell>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/problems" element={<ProblemsPage />} />
                    <Route
                      path="/submissions"
                      element={
                        <RequireAuth>
                          <SubmissionsPage />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/submissions/:submissionId"
                      element={
                        <RequireAuth>
                          <SubmissionResultPage />
                        </RequireAuth>
                      }
                    />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route
                      path="/profile"
                      element={
                        <RequireAuth>
                          <ProfilePage />
                        </RequireAuth>
                      }
                    />
                  </Routes>
                </AppShell>
              }
            />
          </Routes>
        </OverviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
