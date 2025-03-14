"use client";
import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  day: string;
};

export default function GitHubWeekGrid() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const username = "DonMohsen"; // Change this
      const res = await fetch(
        `https://api.github.com/users/${username}/events`
      );
      const events = await res.json();
      console.log("AllEvents", events);

      const contributions: Record<string, number> = {};
      const days: Record<string, string> = {};

      events.forEach((event: any) => {
        const date = event.created_at.split("T")[0];
        const dayName = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        contributions[date] = (contributions[date] || 0) + 1;
        days[date] = dayName;
      });

      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i)); // Get past 7 days
        const formattedDate = date.toISOString().split("T")[0];
        return {
          date: formattedDate,
          contributionCount: contributions[formattedDate] || 0,
          day:
            days[formattedDate] ||
            date.toLocaleDateString("en-US", { weekday: "short" }),
        };
      });

      setData(last7Days);
      console.log("last7===", last7Days);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg text-white w-fit mx-auto animate-pulse">
          <h2 className="text-lg font-semibold text-center mb-4 bg-gray-700 h-6 w-3/4 mx-auto rounded"></h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs text-gray-600 bg-gray-700 h-4 w-10 rounded"></span>
                <div className="w-6 h-6 rounded-md bg-gray-700 border border-gray-700"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg text-white w-fit mx-auto">
          <h2 className="text-lg font-IRANSansXDemiBold text-center mb-4">
            فعالیت گیت هاب هفته اخیر
          </h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {data.map((day, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <span className="text-xs text-gray-400">{day.day}</span>
                <div
                  className="w-6 h-6 rounded-md border border-gray-700 flex items-center justify-center text-xs font-medium"
                  style={{
                    backgroundColor:
                      day.contributionCount > 0
                        ? `rgba(45, 180, 88, ${
                            0.2 + day.contributionCount * 0.1
                          })`
                        : "transparent",
                    color: day.contributionCount > 0 ? "white" : "gray",
                  }}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                >
                  {/* {day.contributionCount > 0 ? day.contributionCount : ""} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
