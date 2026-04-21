interface OrderEmailData {
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  shippingStreet: string;
  shippingCity: string;
  shippingZip: string;
  qrCodeDataUrl?: string;
}

// HTML entity escape. Prevents stray markup in user-supplied strings from
// breaking the email layout or injecting tracking pixels / links.
function esc(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const paymentLabel =
    data.paymentMethod === "comgate"
      ? "Kartou online"
      : data.paymentMethod === "bank_transfer"
        ? "Bankovní převod"
        : "Dobírka";

  const shippingLine =
    data.shippingCost === 0 ? "ZDARMA" : `${esc(data.shippingCost)} Kč`;

  const itemsRows = data.items
    .map(
      (item) => `
          <tr>
            <td>${esc(item.name)}</td>
            <td>${esc(item.quantity)}x</td>
            <td style="text-align:right">${esc(item.totalPrice)} Kč</td>
          </tr>`,
    )
    .join("");

  // Only accept data URLs for QR — never arbitrary URLs that could be
  // tracking pixels or exfiltration targets.
  const qrBlock =
    data.qrCodeDataUrl &&
    data.paymentMethod === "bank_transfer" &&
    data.qrCodeDataUrl.startsWith("data:image/")
      ? `
      <div class="qr-section">
        <h2 style="margin-top:0">QR kód pro platbu</h2>
        <img src="${esc(data.qrCodeDataUrl)}" alt="QR platba" width="200" height="200" />
        <p style="font-size:12px;margin-top:10px">Naskenujte QR kód v bankovní aplikaci</p>
      </div>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #000000; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #A48742; }
    .logo { font-size: 24px; letter-spacing: 0.15em; color: #ffffff; }
    .logo span { color: #A48742; }
    .content { padding: 30px 0; }
    h1 { font-size: 28px; color: #A48742; margin: 0 0 10px; font-weight: normal; }
    h2 { font-size: 18px; color: #A48742; margin: 30px 0 15px; font-weight: normal; letter-spacing: 0.1em; text-transform: uppercase; }
    p { color: #cccccc; line-height: 1.6; margin: 0 0 10px; }
    .order-number { font-size: 20px; color: #A48742; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { text-align: left; padding: 10px; border-bottom: 1px solid #333; color: #A48742; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
    td { padding: 10px; border-bottom: 1px solid #1A1A1A; color: #cccccc; }
    .total-row td { border-top: 1px solid #A48742; font-size: 18px; color: #A48742; font-weight: bold; }
    .qr-section { text-align: center; padding: 20px; background: #1A1A1A; margin: 20px 0; }
    .footer { text-align: center; padding: 30px 0; border-top: 1px solid #333; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">WOOD <span>&amp;</span> STEAK</div>
    </div>
    <div class="content">
      <h1>Děkujeme za objednávku!</h1>
      <p>Dobrý den, ${esc(data.firstName)},</p>
      <p>vaše objednávka byla úspěšně přijata.</p>
      <p class="order-number">Číslo objednávky: ${esc(data.orderNumber)}</p>

      <h2>Položky objednávky</h2>
      <table>
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Množství</th>
            <th style="text-align:right">Cena</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
          <tr>
            <td colspan="2">Doprava</td>
            <td style="text-align:right">${shippingLine}</td>
          </tr>
          <tr class="total-row">
            <td colspan="2">Celkem</td>
            <td style="text-align:right">${esc(data.total)} Kč</td>
          </tr>
        </tbody>
      </table>

      <h2>Doručovací adresa</h2>
      <p>${esc(data.shippingStreet)}<br>${esc(data.shippingCity)}, ${esc(data.shippingZip)}</p>

      <h2>Způsob platby</h2>
      <p>${esc(paymentLabel)}</p>

      ${qrBlock}

      <p style="margin-top:30px">Budeme vás kontaktovat ohledně doručení.</p>
      <p>S pozdravem,<br>tým Wood &amp; Steak</p>
    </div>
    <div class="footer">
      <p>Wood &amp; Steak | Vinohrady, Praha 2</p>
      <p>info@woodandsteak.cz | www.woodandsteak.cz</p>
    </div>
  </div>
</body>
</html>`.trim();
}

export function generateSPDString(options: {
  amount: number;
  account: string;
  variableSymbol: string;
  message?: string;
}): string {
  return [
    "SPD*1.0",
    `ACC:${options.account}`,
    `AM:${options.amount.toFixed(2)}`,
    "CC:CZK",
    `X-VS:${options.variableSymbol}`,
    options.message ? `MSG:${options.message}` : "",
  ]
    .filter(Boolean)
    .join("*");
}
