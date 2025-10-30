import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Community" description="Connect via Farcaster Frames and verified channels.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Farcaster</h2>
            <p className="text-sm text-slate-400">Mini-app frames and feed.</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Channels</h2>
            <p className="text-sm text-slate-400">Discord/Telegram announcements.</p>
          </Card>
        </div>
      </Section>
    </main>
  );
}