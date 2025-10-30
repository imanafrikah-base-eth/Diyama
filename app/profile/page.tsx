export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2 text-slate-300">Your onchain identity, stats, and settings.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Wallet</h2>
            <p className="text-sm text-slate-400">Base address and ETH balance.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Diyama Points</h2>
            <p className="text-sm text-slate-400">Earned via tasks and activity.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Achievements</h2>
            <p className="text-sm text-slate-400">Badges and progress milestones.</p>
          </div>
        </div>
      </section>
    </main>
  );
}