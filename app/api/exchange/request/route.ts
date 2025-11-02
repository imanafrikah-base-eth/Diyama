import { NextResponse } from "next/server";

type Body = {
  amountUSDC: number;
  baseAddress: string;
  fullName: string;
  phoneNumber: string;
  preferredContact: string;
};

// In-memory storage for demo purposes (in production, use a database)
const exchangeRequests: Array<Body & { 
  id: string; 
  timestamp: string; 
  rateZMW: number; 
  kwachaAmount: number; 
  status: 'pending' | 'processing' | 'completed';
}> = [];

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>;
    const amountUSDC = Number(body.amountUSDC);
    const baseAddress = String(body.baseAddress || "").trim();
    const fullName = String(body.fullName || "").trim();
    const phoneNumber = String(body.phoneNumber || "").trim();
    const preferredContact = String(body.preferredContact || "whatsapp").trim();

    if (!amountUSDC || amountUSDC <= 0) {
      return NextResponse.json({ error: "Invalid amountUSDC" }, { status: 400 });
    }
    if (!baseAddress || !/^0x[a-fA-F0-9]{40}$/.test(baseAddress)) {
      return NextResponse.json({ error: "Invalid Base address" }, { status: 400 });
    }
    if (!fullName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Fetch real-time USD→ZMW rate (USDC ~ USD) with fallback
    let rateZMW = 25.5; // Fallback rate
    let kwachaAmount = amountUSDC * rateZMW;
    
    try {
      const rateResp = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=ZMW", {
        cache: "no-store",
      });
      if (rateResp.ok) {
        const rateData = await rateResp.json();
        if (rateData?.rates?.ZMW && typeof rateData.rates.ZMW === "number") {
          rateZMW = rateData.rates.ZMW;
          kwachaAmount = amountUSDC * rateZMW;
        }
      }
    } catch (error) {
      console.log("Using fallback exchange rate due to API error:", error);
    }

    // Generate unique ID and store request
    const requestId = `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const exchangeRequest = {
      id: requestId,
      amountUSDC,
      baseAddress,
      fullName,
      phoneNumber,
      preferredContact,
      timestamp: new Date().toISOString(),
      rateZMW,
      kwachaAmount,
      status: 'pending' as const
    };
    
    exchangeRequests.push(exchangeRequest);

    // Log the request (in production, this would go to a database and notification system)
    console.log('New exchange request:', exchangeRequest);

    return NextResponse.json({
      ok: true,
      requestId,
      rateZMW,
      kwachaAmount,
      message: "Exchange request submitted successfully! Our team will contact you within 24 hours.",
      estimatedProcessingTime: "24 hours",
      supportContact: "support@diyama.com"
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}