import LifecycleFilters from "../../../landingPageComponents/LifecycleFilters";
import { GitPullRequest } from "lucide-react";
import Tag from "../../../ui/Tag";
import { useState } from "react";
import { Card } from "../../../ui/Card";
export function PROverview() {
    
    const [filter, setFilter] = useState("All");

    const prs = [
        { title: "Auth middleware", repo: "api", status: "Ready" },
        { title: "Sidebar layout", repo: "web", status: "Blocked" },
        { title: "Refactor service", repo: "backend", status: "Review" },
        { title: "Fix CI", repo: "api", status: "Stale" },
    ];

    const filtered =
        filter === "All" ? prs : prs.filter((p) => p.status === filter);

    return (
        <Card
            title="Pull Requests"
            right={<LifecycleFilters active={filter} onChange={setFilter} />}
        >
            <div>
                {filtered.map((pr, i) => (
                    <PRLifecycleRow key={i} {...pr} />
                ))}
            </div>
        </Card>
    );
}

export default PROverview;
function PRLifecycleRow({ title, repo, status }) {
    const variantMap = {
        Ready: "open",
        Blocked: "draft",
        Review: "review",
        Stale: "default",
    };

    return (
        <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-hover">
            <div>
                <span className="flex gap-3">
                    <div className="text-sm text-primary">
                        <GitPullRequest className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                        <div className="text-sm text-primary">{title}</div>
                        <div className="text-xs text-secondary">{repo}</div>
                    </div>
                </span>

            </div>

            <Tag variant={variantMap[status] || "default"}>{status}</Tag>
        </div >
    );
}

