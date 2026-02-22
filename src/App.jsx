import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import AppLayout from "./components/layout/AppLayout";
import { Dashboard } from "./components/pages/Dashboard";
import {PullRequestsPage } from "./components/pages/PullRequests";
import { RepositoriesPage } from "./components/pages/Repository";
import PRDetails from "./components/pages/PRDetails";
import LoginPage from "./components/pages/Login";
import ImportReposPage from "./components/pages/ImportRepos";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* App shell */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pull-requests" element={<PullRequestsPage />} />
        <Route path="/repos" element={<RepositoriesPage />} />
        <Route path="/pull-requests/:id" element={<PRDetails />}></Route>
        <Route path="/import-repos" element={<ImportReposPage />} />
      </Route>
    </Routes>
  );
}

export default App;