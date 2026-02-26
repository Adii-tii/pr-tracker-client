import { createContext, useContext, useState } from "react";

const RepoContext = createContext();

export function RepoProvider({ children }) {
  const [activeRepository, setActiveRepository] = useState(null);
  const [activePr, setActivePr] = useState(null);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  // App.jsx registers a loadData() fn here so any component can trigger a refresh
  const [refreshRepos, setRefreshRepos] = useState(() => () => { });

  return (
    <RepoContext.Provider
      value={{
        activeRepository,
        setActiveRepository,
        activePr,
        setActivePr,
        repos,
        setRepos,
        user,
        setUser,
        refreshRepos,
        setRefreshRepos,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
}

export function useRepo() {
  return useContext(RepoContext);
}