import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  authenticateAdmin,
  createAdminSession,
  setRefreshCookie,
} from "@/lib/auth/admin-auth";

export const runtime = "nodejs";

const LoginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(12),
});

export async function POST(request: NextRequest) {
  const parsed = LoginSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 400 }
    );
  }

  const user = await authenticateAdmin(parsed.data.username, parsed.data.password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const session = await createAdminSession(user, request);
  const response = NextResponse.json({
    accessToken: session.accessToken,
    admin: { id: user.id, username: user.username },
  });

  setRefreshCookie(response, session.refreshToken);

  return response;
}
