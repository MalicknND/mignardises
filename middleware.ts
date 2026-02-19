import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/", "/features", "/about"];
const authRoutes = ["/login", "/signup", "/forgot-password"];
const protectedRoutePrefixes = [
  "/today",
  "/orders",
  "/debts",
  "/expenses",
  "/settings",
  "/dashboard",
  "/profile",
  "/clients",
  "/invoices",
  "/quotes",
  "/users",
  "/add",
  "/add-order",
  "/add-expense",
  "/customers",
];

import { projectConfig } from "@/config/project";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutePrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // If auth is disabled
  if (!projectConfig.features.auth.enabled) {
    if ([...authRoutes, ...protectedRoutePrefixes].includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (sessionCookie) {
    // Logged in users shouldn't access public or auth routes
    if ([...publicRoutes, ...authRoutes].includes(pathname)) {
      return NextResponse.redirect(new URL("/today", request.url));
    }
  } else {
    // Non-logged in users can't access protected routes
    if (isProtected) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
