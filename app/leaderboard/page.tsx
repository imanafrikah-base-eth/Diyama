export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="mt-2 text-slate-300">Gamified points ranking for creators.</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800/60 text-slate-200">
              <tr>
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Creator</th>
                <th className="px-4 py-2 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[1,2,3,4,5].map((r) => (
                <tr key={r}>
                  <td className="px-4 py-2">#{r}</td>
                  <td className="px-4 py-2">Creator {r}</td>
                  <td className="px-4 py-2 text-right">{1000 - r * 37}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}