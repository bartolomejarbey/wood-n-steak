import QRCode from "qrcode";
import { generateSPDString } from "./email-templates";

export async function generatePaymentQR(options: {
  amount: number;
  variableSymbol: string;
  message?: string;
}): Promise<string | null> {
  try {
    const account = process.env.BANK_IBAN || "CZ0001000000000123456789";

    const spdString = generateSPDString({
      amount: options.amount,
      account: account,
      variableSymbol: options.variableSymbol,
      message: options.message || `Objednávka ${options.variableSymbol}`,
    });

    const dataUrl = await QRCode.toDataURL(spdString, {
      width: 250,
      margin: 2,
      color: {
        dark: "#A48742",
        light: "#1A1A1A",
      },
    });

    return dataUrl;
  } catch (error) {
    console.error("QR generation error:", error);
    return null;
  }
}
