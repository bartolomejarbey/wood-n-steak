import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const transId = formData.get("transId") as string;
    const status = formData.get("status") as string;
    const refId = formData.get("refId") as string;

    if (!transId || !status) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Verify with Comgate
    const merchantId = process.env.COMGATE_MERCHANT_ID;
    const secret = process.env.COMGATE_SECRET;

    if (!merchantId || !secret) {
      console.warn("Comgate credentials not configured for callback");
      return NextResponse.json({ code: 0, message: "OK" });
    }

    // Verify transaction status
    const verifyParams = new URLSearchParams({
      merchant: merchantId,
      transId: transId,
      secret: secret,
    });

    const verifyResponse = await fetch(
      "https://payments.comgate.cz/v1.0/status",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyParams.toString(),
      }
    );

    const verifyText = await verifyResponse.text();
    const verifyResult = Object.fromEntries(
      verifyText.split("&").map((p) => p.split("=").map(decodeURIComponent))
    );

    if (verifyResult.code === "0") {
      const paymentStatus = verifyResult.status;

      // Update order in database
      // const supabase = createAdminClient();
      // await supabase
      //   .from("orders")
      //   .update({
      //     payment_status: paymentStatus === "PAID" ? "paid" : "pending",
      //     comgate_transaction_id: transId,
      //   })
      //   .eq("id", refId);

      console.log(
        `Payment callback: order=${refId}, transId=${transId}, status=${paymentStatus}`
      );
    }

    return NextResponse.json({ code: 0, message: "OK" });
  } catch (error) {
    console.error("Comgate callback error:", error);
    return NextResponse.json({ code: 0, message: "OK" });
  }
}
