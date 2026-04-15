import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Admin routes protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // When Supabase is connected, check for auth session
    // For now, allow access (admin auth will be implemented with Supabase)
    // const session = await getSession(request);
    // if (!session) {
    //   return NextResponse.redirect(new URL("/ucet", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/ucet/:path*"],
};
