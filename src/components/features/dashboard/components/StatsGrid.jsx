import {
    GitPullRequest,
    GitMerge,
    Clock,
    FolderGit2,
    Activity,
} from "lucide-react";export function StatsGrid() {

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Open PRs"
                value="12"
                icon={GitPullRequest}
                trend="+2 today"
            />
            <StatCard
                label="Merged"
                value="48"
                icon={GitMerge}
                trend="+6 this week"
            />
            <StatCard
                label="Reviews Pending"
                value="7"
                icon={Clock}
                trend="3 stale"
            />
            <StatCard
                label="Repositories"
                value="5"
                icon={FolderGit2}
                trend="2 active"
            />
        </div>
    );
}

export function StatCard({ label, value, icon: Icon, trend }) {
    return (
        <div className="bg-surface border border-divider rounded-2xl p-4 hover:bg-hover transition">
            <div className="flex items-center justify-between">
                <div className="text-xs text-secondary">{label}</div>
                <Icon className="h-4 w-4 text-secondary" />
            </div>

            <div className="mt-2 text-2xl font-semibold text-primary">
                {value}
            </div>

            <div className="text-xs text-secondary mt-1">{trend}</div>
        </div>
    );
}