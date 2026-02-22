import { StatsGrid } from "../features/dashboard/components/StatsGrid";
import PROverview from "../features/dashboard/components/PROverview";
import RecentPRs from "../features/dashboard/components/RecentPRs";


export function Dashboard() {
    return (
        <div className="space-y-6 pt-6">
            <StatsGrid />
            <div className = "grid grid-cols-2 gap-4">
                <PROverview />
                <RecentPRs />
            </div>
        </div>
    );
}
