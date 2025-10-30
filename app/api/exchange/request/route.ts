import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  amountUSDC: number;
  baseAddress: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>;
    const amountUSDC = Number(body.amountUSDC);
    const baseAddress = String(body.baseAddress || "").trim();

    if (!amountUSDC || amountUSDC <= 0) {
      return NextResponse.json({ error: "Invalid amountUSDC" }, { status: 400 });
    }
    if (!baseAddress || !/^0x[a-fA-F0-9]{40}$/.test(baseAddress)) {
      return NextResponse.json({ error: "Invalid Base address" }, { status: 400 });
    }

    // Fetch real-time USD→ZMW rate (USDC ~ USD)
    const rateResp = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=ZMW", {
      cache: "no-store",
    });
    if (!rateResp.ok) {
      return NextResponse.json({ error: "Failed to fetch exchange rate" }, { status: 502 });
    }
    const rateData = await rateResp.json();
    const rateZMW = rateData?.rates?.ZMW;
    if (!rateZMW || typeof rateZMW !== "number") {
      return NextResponse.json({ error: "Exchange rate unavailable" }, { status: 502 });
    }
    const kwachaAmount = amountUSDC * rateZMW;

    // Prepare Resend email
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: "RESEND_API_KEY not configured",
        rateZMW,
        kwachaAmount,
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const to = "music.imanafrikah@gmail.com";
    const subject = `New P2P USDC→ZMW Request (${amountUSDC} USDC)`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0ea5e9">
        <h2>Diyama P2P Exchange Request</h2>
        <p><strong>Base Address:</strong> ${baseAddress}</p>
        <p><strong>Amount:</strong> ${amountUSDC} USDC</p>
        <p><strong>Rate:</strong> 1 USD = ${rateZMW.toFixed(2)} ZMW</p>
        <p><strong>Estimated Kwacha:</strong> ${kwachaAmount.toFixed(2)} ZMW</p>
        <p>Sent at ${new Date().toISOString()}</p>
      </div>
    `;

    // NOTE: 'from' must be a verified domain in Resend dashboard
    const from = process.env.RESEND_FROM_EMAIL || "onchain@diyama.local";

    const result = await resend.emails.send({ from, to, subject, html });

    return NextResponse.json({
      ok: true,
      rateZMW,
      kwachaAmount,
      emailId: result?.data?.id,
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}