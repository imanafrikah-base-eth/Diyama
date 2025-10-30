export default function LearnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Learn</h1>
        <p className="mt-2 text-slate-300">Tutorials for minting, creator coins, and onchain basics.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Mint an NFT","Creator Coins","Onchain Basics"].map((t, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="font-medium text-slate-200">{t}</h3>
              <p className="text-sm text-slate-400">Step-by-step guides and tips.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}