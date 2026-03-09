import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to handle route configuration
 * All auth routes are public and accessible without authentication
 * Note: Token authentication will be added after API integration is complete
 */
export function middleware(request: NextRequest) {
  // All routes are accessible until API integration is complete
  // Auth routes are explicitly public
  return NextResponse.next();
}

/**
 * Matcher configuration to specify which routes this middleware should run on
 * This excludes static files, API routes, and Next.js internal routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
