import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next 16 Proxy (formerly middleware). Per Supabase SSR + Next docs this is
// used for OPTIMISTIC auth checks + session-cookie refresh only. The actual
// authorization happens in the admin server layout which does a full user
// lookup on every request.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: refreshes the auth cookie so server components see a fresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Optimistic gate: if there's no user at all and route requires auth → redirect.
  // The admin layout does the authoritative admin-role check on every render.
  if (!user) {
    if (pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = "/prihlaseni";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/ucet")) {
      const url = request.nextUrl.clone();
      url.pathname = "/prihlaseni";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Run on app routes except static assets. Supabase SSR needs this running
    // broadly so the session cookie stays fresh on every navigation.
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
