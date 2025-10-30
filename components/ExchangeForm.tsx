"use client";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function ExchangeForm() {
  const { address } = useAccount();
  const [amountUSDC, setAmountUSDC] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { kwachaAmount: number; rateZMW: number }>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/exchange/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUSDC: Number(amountUSDC), baseAddress: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult({ kwachaAmount: data.kwachaAmount, rateZMW: data.rateZMW });
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

      <div className="mt-3 grid grid-cols-1 gap-3">
        <input
          className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700"
          placeholder="Amount (USDC)"
          inputMode="decimal"
          value={amountUSDC}
          onChange={(e) => setAmountUSDC(e.target.value)}
        />
        <button
          disabled={loading || !amountUSDC}
          onClick={submit}
          className="px-3 py-2 rounded-md bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 text-white font-medium disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>

      {result && (
        <div className="mt-3 text-sm text-slate-300">
          <div>Rate: 1 USD = {result.rateZMW.toFixed(2)} ZMW</div>
          <div>Estimated: {result.kwachaAmount.toFixed(2)} ZMW</div>
        </div>
      )}
      {error && (
        <div className="mt-3 text-sm text-red-400">{error}</div>
      )}
    </div>
  );
}