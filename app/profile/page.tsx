import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Profile" description="Your onchain identity, stats, and settings.">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Wallet</h2>
            <p className="text-sm text-slate-400">Base address and ETH balance.</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Diyama Points</h2>
            <p className="text-sm text-slate-400">Earned via tasks and activity.</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Achievements</h2>
            <p className="text-sm text-slate-400">Badges and progress milestones.</p>
          </Card>
        </div>
      </Section>
    </main>
  );
}