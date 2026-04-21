import { NextRequest, NextResponse } from "next/server";

// Comgate server-to-server callback. The callback form itself is NOT
// authenticated — anyone can POST to this URL. We MUST re-verify the
// transaction with Comgate's /v1.0/status endpoint using the shared secret
// before trusting any `status` value. Failing that, never mark orders paid.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const transId = formData.get("transId") as string | null;
    const status = formData.get("status") as string | null;
    const refId = formData.get("refId") as string | null;

    if (!transId || !status || !refId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const merchantId = process.env.COMGATE_MERCHANT_ID;
    const secret = process.env.COMGATE_SECRET;

    // Hard-fail if credentials are missing. Comgate will retry on non-OK
    // responses, which is the correct behavior while the server is
    // misconfigured. Returning 200/OK here would cause Comgate to stop
    // retrying and we'd silently lose the paid-status signal.
    if (!merchantId || !secret) {
      console.error(
        "Comgate callback received but credentials not configured — refusing to ack",
      );
      return NextResponse.json(
        { error: "Gateway not configured" },
        { status: 503 },
      );
    }

    const verifyParams = new URLSearchParams({
      merchant: merchantId,
      transId,
      secret,
    });

    const verifyResponse = await fetch(
      "https://payments.comgate.cz/v1.0/status",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyParams.toString(),
      },
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 502 },
      );
    }

    const verifyText = await verifyResponse.text();
    const verifyResult = Object.fromEntries(
      verifyText.split("&").map((p) => p.split("=").map(decodeURIComponent)),
    );

    if (verifyResult.code !== "0") {
      return NextResponse.json(
        { error: "Verification returned error" },
        { status: 400 },
      );
    }

    // Double-check the verified refId matches the callback refId — protects
    // against an attacker replaying a different merchant's valid transId with
    // a spoofed refId pointing to our order.
    if (verifyResult.refId && verifyResult.refId !== refId) {
      console.error(
        `Comgate callback refId mismatch: callback=${refId} verified=${verifyResult.refId}`,
      );
      return NextResponse.json(
        { error: "refId mismatch" },
        { status: 400 },
      );
    }

    const paymentStatus = verifyResult.status;
    const normalizedStatus =
      paymentStatus === "PAID"
        ? "paid"
        : paymentStatus === "CANCELLED"
          ? "cancelled"
          : "pending";

    // TODO: persist to orders table once the schema is migrated:
    //   const supabase = createAdminClient();
    //   await supabase.from("orders")
    //     .update({ payment_status: normalizedStatus, comgate_transaction_id: transId })
    //     .eq("id", refId);
    void normalizedStatus;

    return NextResponse.json({ code: 0, message: "OK" });
  } catch (error) {
    console.error("Comgate callback error:", error);
    // Return 500 (not 200) so Comgate will retry. Do not silently swallow.
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
