import { useState } from "react";
import PRKanban from "./Views/PRKanban";
import PRTableHeader from "./Views/PRTableHeader";
import PRRow from "./Views/PRTable";

function PRList({ view }) {
  const [visible, setVisible] = useState(8);
  

  const prs = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `Improve API performance`,
    repo: "api-server",
    sourceBranch: `feature/perf-${i + 1}`,
    targetBranch: "main",
    author: "Rajja",
    status: ["Ready", "Review", "Blocked", "Stale"][i % 4],
    tags: ["backend", i % 2 ? "perf" : "refactor"],
    updated: "2h ago",
  }));

  if (view === "kanban") {
    return <PRKanban prs={prs} />;
  }

  return (
    <div className="rounded-2xl border border-divider bg-surface overflow-hidden">
      <table className="w-full text-sm">
        <PRTableHeader />
        <tbody>
          {prs.slice(0, visible).map((pr) => (
            <PRRow key={pr.id} pr={pr} />
          ))}
        </tbody>
      </table>

      {visible < prs.length && (
        <div className="flex justify-center border-t border-divider p-3">
          <button
            onClick={() => setVisible((v) => v + 8)}
            className="text-sm text-secondary hover:text-primary"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}


export default PRList;