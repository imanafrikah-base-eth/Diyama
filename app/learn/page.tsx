import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Learn" description="Tutorials for minting, creator coins, and onchain basics.">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Mint an NFT","Creator Coins","Onchain Basics"].map((t, i) => (
            <Card key={i} className="p-4">
              <h3 className="font-medium text-slate-200">{t}</h3>
              <p className="text-sm text-slate-400">Step-by-step guides and tips.</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}