import Tag from "../../../ui/Tag";
import { Card } from "../../../ui/Card";

export function RecentPRs() {
    const prs = [
        { title: "Add auth middleware", repo: "api-server", status: "Open" },
        { title: "Fix sidebar layout", repo: "web-app", status: "Merged" },
        { title: "Refactor PR service", repo: "backend", status: "Review" },
    ];

    return (
        <Card
            title="Recent Pull Requests"
            right={
                <button className="text-xs text-secondary hover:text-primary">
                    View all
                </button>
            }
        >
            <div>
                {prs.map((pr, i) => (
                    <PRRow key={i} {...pr} />
                ))}
            </div>
        </Card>
    );
}

export default RecentPRs;

export function PRRow({ title, repo, status }) {
    const variantMap = {
        Open: "open",
        Merged: "merged",
        Review: "review",
        Draft: "draft",
    };

    return (
        <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-hover">
            <div>
                <div className="text-sm text-primary">{title}</div>
                <div className="text-xs text-secondary">{repo}</div>
            </div>

            <Tag variant={variantMap[status] || "default"}>{status}</Tag>
        </div>
    );
}