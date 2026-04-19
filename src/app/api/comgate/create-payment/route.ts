import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, email, orderNumber } = await request.json();

    const merchantId = process.env.COMGATE_MERCHANT_ID;
    const secret = process.env.COMGATE_SECRET;
    const testMode = process.env.COMGATE_TEST_MODE === "true";

    if (!merchantId || !secret) {
      console.warn("Comgate credentials not configured");
      return NextResponse.json(
        { error: "Platební brána není nakonfigurovaná", fallback: true },
        { status: 503 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const params = new URLSearchParams({
      merchant: merchantId,
      price: String(Math.round(amount * 100)), // in hellers
      curr: "CZK",
      label: `Objednávka ${orderNumber}`,
      refId: orderId,
      email: email,
      method: "ALL",
      prepareOnly: "true",
      url_paid: `${appUrl}/pokladna/dekujeme?order=${orderNumber}`,
      url_cancelled: `${appUrl}/kosik`,
      url_pending: `${appUrl}/pokladna/dekujeme?order=${orderNumber}&pending=1`,
      ...(testMode ? { test: "true" } : {}),
    });

    const response = await fetch(
      "https://payments.comgate.cz/v1.0/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const text = await response.text();
    const result = Object.fromEntries(
      text.split("&").map((p) => p.split("=").map(decodeURIComponent))
    );

    if (result.code === "0") {
      return NextResponse.json({
        transId: result.transId,
        redirect: result.redirect,
      });
    }

    return NextResponse.json(
      { error: result.message || "Chyba při vytváření platby" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Comgate create-payment error:", error);
    return NextResponse.json(
      { error: "Chyba při komunikaci s platební bránou" },
      { status: 500 }
    );
  }
}
