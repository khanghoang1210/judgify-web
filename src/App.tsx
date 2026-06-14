import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { ProblemDetailPage } from "./pages/ProblemDetailPage";
import { SubmissionResultPage } from "./pages/SubmissionResultPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:problemId" element={<ProblemDetailPage />} />
          <Route path="/submissions/:submissionId" element={<SubmissionResultPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;

