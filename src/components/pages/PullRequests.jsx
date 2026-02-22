import { useState } from "react";
import PRControls from "../features/PRs/components/PRControls";
import PRList from "../features/PRs/components/PRList";


export function PullRequestsPage() {
  const [view, setView] = useState("table");

  return (
    <div className="space-y-6">
      <PRControls view={view} setView={setView} />
      <PRList view={view} />
    </div>
  );
}




