"use client";

import { useSearchParams } from "next/navigation";

export function useSearchParamSafe(key: string): string | null {
  const params = useSearchParams();
  return params.get(key);
}
