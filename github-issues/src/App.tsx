// src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchRepoIssues } from "./utils/githubApi";
import IssueTable from "./components/IssueTable";
import Metrics from "./components/Metrics";
import { Issue } from "./utils/types";

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const repoName = "vercel/next.js";

  useEffect(() => {
    setLoading(true);
    fetchRepoIssues(repoName)
      .then((data) => {
        if (data) setIssues(data);
        else setError("Error fetching issues");
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="App">
      {loading ? (
        <div className="text-gray-500 text-xl">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center">GitHub Issues Report for ({repoName})</h1>

          <Metrics issues={issues} />
          <IssueTable issues={issues} />
        </>
      )}
    </div>
  );
};

export default App;
