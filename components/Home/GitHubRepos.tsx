"use client"
import { useEffect, useState } from "react";

const fetchTopRepos = async () => {
  try {
    const username = "DonMohsen"; // Replace with your username
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const getRepos = async () => {
      const data = await fetchTopRepos();
      setRepos(data);
    };
    getRepos();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Top GitHub Repositories</h2>
      <ul className="list-none">
        {repos.map((repo:any) => (
          <li key={repo.id} className="mb-2">
            <a href={repo.html_url} target="_blank" className="text-blue-500 font-medium">
              {repo.name}
            </a> ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
}
