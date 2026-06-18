import { NextRequest, NextResponse } from "next/server";
import {
  clearRefreshCookie,
  rotateAdminSession,
  setRefreshCookie,
} from "@/lib/auth/admin-auth";
import { REFRESH_COOKIE_NAME } from "@/lib/auth/tokens";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await rotateAdminSession(refreshToken, request);

  if (!session) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    clearRefreshCookie(response);
    return response;
  }

  const response = NextResponse.json({ accessToken: session.accessToken });
  setRefreshCookie(response, session.refreshToken);

  return response;
}
