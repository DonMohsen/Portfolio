import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createAccessToken,
  createRefreshToken,
  getRefreshCookieOptions,
  hashRefreshToken,
  REFRESH_COOKIE_NAME,
  REFRESH_TOKEN_TTL_SECONDS,
  verifyAccessToken,
} from "@/lib/auth/tokens";

export const AUTH_ERROR_MESSAGE = "Unauthorized";

function getBootstrapCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password || password.length < 12) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD are required. ADMIN_PASSWORD must be at least 12 characters."
    );
  }

  return { username, password };
}

async function findOrCreateBootstrapAdmin(username: string, password: string) {
  const userCount = await prisma.adminUser.count();
  const existingUser = await prisma.adminUser.findUnique({ where: { username } });

  if (existingUser || userCount > 0) {
    return existingUser;
  }

  return prisma.adminUser.create({
    data: {
      username,
      passwordHash: await hashPassword(password),
    },
  });
}

export async function authenticateAdmin(username: string, password: string) {
  const bootstrap = getBootstrapCredentials();

  if (username !== bootstrap.username) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return null;
  }

  const user = await findOrCreateBootstrapAdmin(bootstrap.username, bootstrap.password);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }

  return user;
}

export async function createAdminSession(
  user: { id: number; username: string },
  request: NextRequest
) {
  const refreshToken = createRefreshToken();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);

  await prisma.adminRefreshToken.create({
    data: {
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt,
      userAgent: request.headers.get("user-agent"),
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip"),
      adminUserId: user.id,
    },
  });

  return {
    accessToken: createAccessToken(user),
    refreshToken,
    expiresAt,
  };
}

export async function rotateAdminSession(refreshToken: string, request: NextRequest) {
  const tokenHash = hashRefreshToken(refreshToken);
  const session = await prisma.adminRefreshToken.findUnique({
    where: { tokenHash },
    include: { adminUser: true },
  });

  if (!session || session.revokedAt || session.expiresAt <= new Date()) {
    return null;
  }

  await prisma.adminRefreshToken.update({
    where: { id: session.id },
    data: { revokedAt: new Date() },
  });

  return createAdminSession(session.adminUser, request);
}

export async function revokeAdminSession(refreshToken?: string) {
  if (!refreshToken) {
    return;
  }

  await prisma.adminRefreshToken.updateMany({
    where: {
      tokenHash: hashRefreshToken(refreshToken),
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  });
}

export function setRefreshCookie(response: NextResponse, refreshToken: string) {
  response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());
}

export function clearRefreshCookie(response: NextResponse) {
  response.cookies.set(REFRESH_COOKIE_NAME, "", {
    ...getRefreshCookieOptions(),
    maxAge: 0,
  });
}

export async function getRefreshSessionUser() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return null;
  }

  const session = await prisma.adminRefreshToken.findUnique({
    where: { tokenHash: hashRefreshToken(refreshToken) },
    include: { adminUser: true },
  });

  if (!session || session.revokedAt || session.expiresAt <= new Date()) {
    return null;
  }

  return session.adminUser;
}

export async function requireBearerAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return null;
  }

  return prisma.adminUser.findUnique({
    where: { id: Number(payload.sub) },
  });
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: AUTH_ERROR_MESSAGE }, { status: 401 });
}
