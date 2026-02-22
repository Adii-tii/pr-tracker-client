import { Plus, GitBranch } from "lucide-react";

export function RepositoriesPage() {
  const repos = [
    { name: "web-app", prs: 12, updated: "2h ago" },
    { name: "api-server", prs: 7, updated: "5h ago" },
    { name: "backend", prs: 3, updated: "1d ago" },
    { name: "infra", prs: 0, updated: "3d ago" },
  ];

  return (
    <div className="space-y-6 pt-6">
      <RepoHeader />
      <RepoGrid repos={repos} />
    </div>
  );
}

function RepoHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-primary"></h1>
        <p className="text-sm text-secondary">
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-black hover:opacity-90">
        <Plus className="h-4 w-4" />
        Import Repository
      </button>
    </div>
  );
}

function RepoGrid({ repos }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, i) => (
        <RepoCard key={i} repo={repo} />
      ))}
    </div>
  );
}

import { useNavigate } from "react-router-dom";

function RepoCard({ repo }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/repos/${repo.name}`)}
      className="cursor-pointer rounded-2xl border border-divider bg-surface p-4 transition-colors hover:bg-surface-elev"
    >
      {/* Top */}
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-secondary" />
        <span className="text-sm font-medium text-primary">
          {repo.name}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-secondary">{repo.prs} PRs</span>
        <span className="text-secondary">Updated {repo.updated}</span>
      </div>
    </div>
  );
}

export function RepoDetailPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">
        Repository
      </h1>
    </div>
  );
}