import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { ProblemDetailPage } from "./pages/ProblemDetailPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { SubmissionResultPage } from "./pages/SubmissionResultPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Problem detail page has its own layout without sidebar */}
        <Route path="/problems/:problemId" element={<ProblemDetailPage />} />

        {/* Other pages use AppShell with sidebar */}
        <Route
          path="*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/submissions" element={<SubmissionsPage />} />
                <Route
                  path="/submissions/:submissionId"
                  element={<SubmissionResultPage />}
                />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
