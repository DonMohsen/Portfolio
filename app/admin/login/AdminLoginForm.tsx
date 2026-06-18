"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/admin/auth/login", { username, password });
      router.replace("/admin");
      router.refresh();
    } catch {
      toast({
        title: "Login failed",
        description: "Username or password is not correct.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
            Secure Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Login</h1>
          <p className="mt-2 text-sm text-white/60">
            Use your admin username and password to start a protected session.
          </p>
        </div>

        <label className="block text-sm font-medium text-white/80" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 outline-none ring-purple-400 transition focus:ring-2"
          required
        />

        <label
          className="mt-5 block text-sm font-medium text-white/80"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 outline-none ring-purple-400 transition focus:ring-2"
          minLength={12}
          required
        />

        <Button
          type="submit"
          className="mt-8 h-12 w-full bg-purple-600 hover:bg-purple-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <Toaster />
    </main>
  );
}
