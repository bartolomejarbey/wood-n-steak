import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// In-memory sliding-window rate limit. Good enough as a speed bump against
// scripted abuse on a single-instance deploy; if we scale horizontally or
// need real protection, swap for @upstash/ratelimit + KV.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 },
      );
    }

    const body = await request.json().catch(() => null);
    const email: unknown = body?.email;

    if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Neplatna emailova adresa" },
        { status: 400 },
      );
    }

    // When Supabase is connected:
    // const supabase = createAdminClient();
    // const { error } = await supabase
    //   .from("newsletter_subscribers")
    //   .upsert({ email, is_active: true }, { onConflict: "email" });
    // if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Chyba pri prihlaseni k odberu" },
      { status: 500 }
    );
  }
}
