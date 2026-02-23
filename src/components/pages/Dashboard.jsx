import { useEffect, useState } from "react";
import axios from "axios";

import { StatsGrid } from "../features/dashboard/components/StatsGrid";
import PROverview from "../features/dashboard/components/PROverview";
import RecentPRs from "../features/dashboard/components/RecentPRs";
import ImportReposPage from "./ImportRepos";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [needsImport, setNeedsImport] = useState(false);
  console.log("here");

  useEffect(() => {
    const checkUserRepos = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        console.log(userId);

        const res = await axios.get(
          `${serverEndpoint}/api/db/users/${userId}`,
          { withCredentials: true }
        );

        const user = res.data.data;
        console.log(user);

        if (!user.repositories || user.repositories.length === 0) {
          setNeedsImport(true);
        } else {
          setNeedsImport(false);
        }
      } catch (err) {
        console.error("User fetch failed", err);
        setNeedsImport(true);
      } finally {
        setLoading(false);
        console.log("done");
      }
    };

    checkUserRepos();
  }, []);

  if (loading) {
    return <div className="pt-10 text-center">Loading dashboard...</div>;
  }

  if (needsImport) {
    return (
      <div className="pt-6">
        <ImportReposPage />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <StatsGrid />

      <div className="grid grid-cols-2 gap-4">
        <PROverview />
        <RecentPRs />
      </div>
    </div>
  );
}