export default function WalletPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Wallet & Exchange</h1>
        <p className="mt-2 text-slate-300">Manage Base wallet and submit P2P USDC→Kwacha requests.</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Wallet Overview</h2>
            <p className="text-sm text-slate-400">Address, ETH balance, recent activity.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">P2P Exchange Request</h2>
            <form className="mt-3 grid grid-cols-1 gap-3">
              <input className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700" placeholder="Amount (USDC)" />
              <input className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700" placeholder="Your Base address" />
              <button className="px-3 py-2 rounded-md bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 text-white font-medium">Submit Request</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}