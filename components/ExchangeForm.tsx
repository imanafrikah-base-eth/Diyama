"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import Button from "./ui/Button";
import Alert from "./Alert";

export default function ExchangeForm() {
  const { address } = useAccount();
  const [amountUSDC, setAmountUSDC] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<string>("whatsapp");
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
      if (!fullName.trim()) throw new Error("Please enter your full name");
      if (!phoneNumber.trim()) throw new Error("Please enter your phone number");
      
      const res = await fetch("/api/exchange/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amountUSDC: amt, 
          baseAddress: address,
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          preferredContact
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult({ kwachaAmount: data.kwachaAmount, rateZMW: data.rateZMW });
      setSuccess("Exchange request submitted successfully! Our team will contact you within 24 hours to complete the trade.");
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Exchange USDC → ZMW</h2>
        <p className="text-slate-400">Convert your USDC to Zambian Kwacha with real-time rates</p>
      </div>
      
      {!address && (
        <Alert type="info" message="Connect your Base wallet to submit an exchange request." />
      )}

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Amount (USDC)
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Enter USDC amount"
            inputMode="decimal"
            value={amountUSDC}
            onChange={(e) => setAmountUSDC(e.target.value)}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="+260 XXX XXX XXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Preferred Contact Method
          </label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="call">Phone Call</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        <Button
          variant="glow"
          disabled={loading || !amountUSDC || !address || !fullName || !phoneNumber}
          onClick={submit}
          className="w-full py-3"
        >
          {loading ? "Submitting Request..." : "Submit Exchange Request"}
        </Button>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <h4 className="text-green-400 font-medium mb-2">Exchange Rate Information</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Current Rate:</span>
              <span className="text-white">1 USD = {result.rateZMW.toFixed(2)} ZMW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">You'll Receive:</span>
              <span className="text-green-400 font-medium">{result.kwachaAmount.toFixed(2)} ZMW</span>
            </div>
          </div>
        </div>
      )}
      
      {success && <Alert type="success" message={success} />}
      {error && <Alert type="error" message={error} />}
    </div>
  );
}