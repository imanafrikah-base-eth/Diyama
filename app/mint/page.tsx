import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function MintPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Mint" description="Create and publish NFTs with guided steps.">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Asset</h2>
            <p className="text-sm text-slate-400">Upload and configure metadata.</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-medium text-slate-200">Publish</h2>
            <p className="text-sm text-slate-400">Deploy and share your mint.</p>
          </Card>
        </div>
      </Section>
    </main>
  );
}