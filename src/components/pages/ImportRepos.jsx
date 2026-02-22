import { useState } from "react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ImportReposPage() {
  const navigate = useNavigate();

  const repos = [
    { id: 1, name: "web-app", private: true },
    { id: 2, name: "api-server", private: true },
    { id: 3, name: "backend", private: false },
    { id: 4, name: "infra", private: true },
  ];

  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === repos.length) {
      setSelected([]);
    } else {
      setSelected(repos.map((r) => r.id));
    }
  };

  const handleImport = () => {
    // later → call backend to store repo access
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <Github className="h-5 w-5" />
            Connected as rajja
          </div>
          <p className="text-sm text-secondary">
            Select repositories to import into PR Tracker
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-divider bg-surface p-5 space-y-4">
          {/* Select all */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleAll}
              className="text-xs text-secondary hover:text-primary"
            >
              {selected.length === repos.length
                ? "Deselect all"
                : "Select all"}
            </button>

            <div className="text-xs text-secondary">
              {selected.length} selected
            </div>
          </div>

          {/* Repo list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {repos.map((repo) => (
              <RepoRow
                key={repo.id}
                repo={repo}
                checked={selected.includes(repo.id)}
                onToggle={() => toggle(repo.id)}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleImport}
              disabled={!selected.length}
              className="flex-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-40"
            >
              Import selected
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 rounded-md border border-divider px-4 py-2 text-sm text-secondary hover:bg-hover"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RepoRow({ repo, checked, onToggle }) {
  return (
    <label className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-hover cursor-pointer">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="accent-white"
        />

        <span className="text-sm text-primary">{repo.name}</span>

        {repo.private && (
          <span className="text-xs text-secondary">private</span>
        )}
      </div>
    </label>
  );
}