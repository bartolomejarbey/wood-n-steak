import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Neplatna emailova adresa" },
        { status: 400 }
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
