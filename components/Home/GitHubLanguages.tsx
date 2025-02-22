"use client"
import { GitHubRepo } from "@/app/Types/GithubTypes";
import { useEffect, useState } from "react";

type LanguageCount = Record<string, number>; // Type for storing language counts
type LanguageEntry = [string, number]; // Tuple type for sorting

const fetchTopLanguages = async (): Promise<LanguageEntry[]> => {
  try {
    const username = "DonMohsen"; // Replace with your username
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos: GitHubRepo[] = await res.json();

    const languageCount: LanguageCount = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as LanguageCount);

    return Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1]) // Sort by most used
      .slice(0, 5); // Get top 5 languages
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

export default function GitHubLanguages() {
  const [languages, setLanguages] = useState<LanguageEntry[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const data = await fetchTopLanguages();
      setLanguages(data);
    };
    getLanguages();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Top Languages</h2>
      <ul className="list-none">
        {languages.map(([lang, count]) => (
          <li key={lang} className="mb-2">
            <span className="font-medium">{lang}</span> ({count} repos)
          </li>
        ))}
      </ul>
    </div>
  );
}
