import { NextResponse } from "next/server";
import { getRefreshSessionUser } from "@/lib/auth/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getRefreshSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    admin: { id: user.id, username: user.username },
  });
}
