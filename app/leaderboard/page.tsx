import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Leaderboard" description="Gamified points ranking for creators.">
        <Card className="mt-6 overflow-hidden">
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
        </Card>
      </Section>
    </main>
  );
}