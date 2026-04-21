import { NextRequest, NextResponse } from "next/server";

// SECURITY: the `amount` here is currently accepted from the client body.
// Once the orders table exists, the correct flow is:
//   1. Client POSTs /api/orders with items -> server computes + persists total.
//   2. Server returns orderId.
//   3. Client POSTs /api/comgate/create-payment with ONLY orderId.
//   4. This route looks up the order, reads the server-computed amount,
//      and initiates the Comgate payment from that value.
// Until then we at least enforce bounds + shape to stop the obvious
// 1-heller-payment trick.
const MIN_AMOUNT_CZK = 100; // below this a payment is very likely a probe
const MAX_AMOUNT_CZK = 500_000; // anything above this isn't a real steak order

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORDER_NUMBER_RE = /^[A-Z0-9-]{4,32}$/;
const ORDER_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, email, orderNumber } = body ?? {};

    if (
      typeof orderId !== "string" ||
      !ORDER_ID_RE.test(orderId) ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < MIN_AMOUNT_CZK ||
      amount > MAX_AMOUNT_CZK ||
      typeof email !== "string" ||
      !EMAIL_RE.test(email) ||
      typeof orderNumber !== "string" ||
      !ORDER_NUMBER_RE.test(orderNumber)
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const merchantId = process.env.COMGATE_MERCHANT_ID;
    const secret = process.env.COMGATE_SECRET;
    const testMode = process.env.COMGATE_TEST_MODE === "true";

    if (!merchantId || !secret) {
      return NextResponse.json(
        { error: "Platební brána není nakonfigurovaná", fallback: true },
        { status: 503 },
      );
    }

    // Hardcode allowed redirect hosts — prevents misconfigured NEXT_PUBLIC_APP_URL
    // from becoming an open redirect via Comgate's post-payment redirect.
    const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL;
    let appUrl: string;
    try {
      const parsed = new URL(configuredAppUrl || "http://localhost:3000");
      if (
        parsed.hostname !== "localhost" &&
        !parsed.hostname.endsWith(".vercel.app") &&
        !parsed.hostname.endsWith("woodandsteak.cz")
      ) {
        console.error(
          `Refusing unexpected NEXT_PUBLIC_APP_URL host: ${parsed.hostname}`,
        );
        return NextResponse.json(
          { error: "App URL not in allowlist" },
          { status: 500 },
        );
      }
      appUrl = parsed.origin;
    } catch {
      return NextResponse.json({ error: "Bad APP URL" }, { status: 500 });
    }

    const params = new URLSearchParams({
      merchant: merchantId,
      price: String(Math.round(amount * 100)), // hellers
      curr: "CZK",
      label: `Objednavka ${orderNumber}`,
      refId: orderId,
      email,
      method: "ALL",
      prepareOnly: "true",
      url_paid: `${appUrl}/pokladna/dekujeme?order=${encodeURIComponent(orderNumber)}`,
      url_cancelled: `${appUrl}/kosik`,
      url_pending: `${appUrl}/pokladna/dekujeme?order=${encodeURIComponent(orderNumber)}&pending=1`,
      ...(testMode ? { test: "true" } : {}),
    });

    const response = await fetch("https://payments.comgate.cz/v1.0/create", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await response.text();
    const result = Object.fromEntries(
      text.split("&").map((p) => p.split("=").map(decodeURIComponent)),
    );

    if (result.code === "0") {
      return NextResponse.json({
        transId: result.transId,
        redirect: result.redirect,
      });
    }

    return NextResponse.json(
      { error: result.message || "Chyba při vytváření platby" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Comgate create-payment error:", error);
    return NextResponse.json(
      { error: "Chyba při komunikaci s platební bránou" },
      { status: 500 },
    );
  }
}
