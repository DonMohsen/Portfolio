import { NextRequest, NextResponse } from "next/server";
import { clearRefreshCookie, revokeAdminSession } from "@/lib/auth/admin-auth";
import { REFRESH_COOKIE_NAME } from "@/lib/auth/tokens";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  await revokeAdminSession(request.cookies.get(REFRESH_COOKIE_NAME)?.value);

  const response = NextResponse.json({ ok: true });
  clearRefreshCookie(response);

  return response;
}
