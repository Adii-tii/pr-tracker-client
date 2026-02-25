import { useEffect, useState } from "react";
import axios from "axios";

import { StatsGrid } from "../features/dashboard/components/StatsGrid";
import PROverview from "../features/dashboard/components/PROverview";
import RecentPRs from "../features/dashboard/components/RecentPRs";
import ImportReposPage from "./ImportRepos";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsImport, setNeedsImport] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${serverEndpoint}/api/db/users/me`,
        { withCredentials: true }
      );

      const userData = res.data.data;
      console.log("res is : ", res);

      setUser(userData);
      setNeedsImport(!userData.repositories?.length);
    } catch (error) {
      console.error("User fetch failed", error);
      setNeedsImport(true);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchUser();
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
      <StatsGrid user={user} />
      <div className="grid grid-cols-2 gap-4">
        <PROverview user={user} />
        <RecentPRs user={user} />
      </div>
    </div>
  );
}