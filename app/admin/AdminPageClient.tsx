"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactQueryProvider from "../providers/react-query-provider";
import AdminAllCards from "@/components/Admin/AdminAllCards";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

type AdminPageClientProps = {
  username: string;
};

export default function AdminPageClient({ username }: AdminPageClientProps) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const handleUnauthorized = async () => {
    setAccessToken(null);
    await axios.post("/api/admin/auth/logout").catch(() => undefined);
    router.replace("/admin/login");
  };

  useEffect(() => {
    let cancelled = false;

    axios
      .post<{ accessToken: string }>("/api/admin/auth/refresh")
      .then((response) => {
        if (!cancelled) {
          setAccessToken(response.data.accessToken);
        }
      })
      .catch(() => {
        if (!cancelled) {
          router.replace("/admin/login");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsRefreshing(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = async () => {
    await axios.post("/api/admin/auth/logout").catch(() => undefined);
    setAccessToken(null);
    router.replace("/admin/login");
  };

  return (
    <ReactQueryProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="fixed left-4 right-4 top-4 z-40 flex items-center justify-between rounded-2xl border border-white/10 bg-black/80 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-xs text-white/50">Admin</p>
            <p className="font-medium">{username}</p>
          </div>
          <Button type="button" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {isRefreshing || !accessToken ? (
          <div className="flex min-h-screen items-center justify-center text-white/70">
            Checking admin session...
          </div>
        ) : (
          <AdminAllCards
            accessToken={accessToken}
            onUnauthorized={handleUnauthorized}
          />
        )}
      </div>
      <Toaster />
    </ReactQueryProvider>
  );
}
