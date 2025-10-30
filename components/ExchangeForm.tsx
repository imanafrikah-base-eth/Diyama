"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import Button from "./ui/Button";
import Alert from "./Alert";

export default function ExchangeForm() {
  const { address } = useAccount();
  const [amountUSDC, setAmountUSDC] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { kwachaAmount: number; rateZMW: number }>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const amt = Number(amountUSDC);
      if (!address) throw new Error("Please connect your wallet");
      if (!amt || amt <= 0) throw new Error("Enter a valid USDC amount");
      const res = await fetch("/api/exchange/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUSDC: amt, baseAddress: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult({ kwachaAmount: data.kwachaAmount, rateZMW: data.rateZMW });
      setSuccess("Exchange request submitted. Check admin inbox for email.");
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <h2 className="font-medium text-slate-200">P2P Exchange Request</h2>
      <p className="text-sm text-slate-400">USDC → ZMW with real-time rates, email sent to admin.</p>
      {!address && <div className="mt-2"><Alert type="info" message="Connect your Base wallet to submit an exchange." /></div>}

      <div className="mt-3 grid grid-cols-1 gap-3">
        <input
          className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700"
          placeholder="Amount (USDC)"
          inputMode="decimal"
          value={amountUSDC}
          onChange={(e) => setAmountUSDC(e.target.value)}
        />
        <Button
          disabled={loading || !amountUSDC || !address}
          onClick={submit}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>

      {result && (
        <div className="mt-3 text-sm text-slate-300">
          <div>Rate: 1 USD = {result.rateZMW.toFixed(2)} ZMW</div>
          <div>Estimated: {result.kwachaAmount.toFixed(2)} ZMW</div>
        </div>
      )}
      {success && <div className="mt-3"><Alert type="success" message={success} /></div>}
      {error && <div className="mt-3"><Alert type="error" message={error} /></div>}
    </div>
  );
}