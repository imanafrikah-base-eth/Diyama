import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function OpportunitiesPage() {
  const items = [
    { title: "Creator Grant", desc: "Apply for micro-grants to fund your next release.", href: "/learn" },
    { title: "Community Bounty", desc: "Contribute tutorials and earn points.", href: "/community" },
    { title: "Collab Gig", desc: "Join cross-border creative collaborations.", href: "/profile" },
    { title: "NFT Drop", desc: "Mint limited releases and grow your audience.", href: "/mint" },
    { title: "Onchain Task", desc: "Complete quests to earn leaderboard points.", href: "/leaderboard" },
    { title: "News Feature", desc: "Get highlighted in the community feed.", href: "/news" },
  ];
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="Opportunities" description="Curated gigs, grants, and bounties for Base creators.">
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it) => (
            <Card key={it.title} className="p-5">
              <h3 className="text-slate-100 font-semibold">{it.title}</h3>
              <p className="text-slate-300 text-sm">{it.desc}</p>
              <div className="mt-3"><Button variant="ghost">Learn More</Button></div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}