import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Diyama: Onchain Onboarding for Creators</h1>
            <p className="mt-3 text-slate-300">Connect your Base wallet, discover opportunities, and request P2P USDC→Kwacha exchanges with real-time rates.</p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/wallet" prefetch={false}><Button size="lg">Open Wallet & Exchange</Button></Link>
              <Link href="/opportunities" prefetch={false}><Button variant="secondary" size="lg">Explore Opportunities</Button></Link>
            </div>
          </div>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-slate-100 font-semibold">Wallet</h3>
                <p className="text-slate-300 text-sm">Connect wallet and view identity.</p>
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold">Exchange</h3>
                <p className="text-slate-300 text-sm">USDC → ZMW with live rates.</p>
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold">Leaderboard</h3>
                <p className="text-slate-300 text-sm">Track points and progress.</p>
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold">Community</h3>
                <p className="text-slate-300 text-sm">Learn and collaborate.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Section title="Get Started" description="Everything you need in one place.">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5">
            <h3 className="text-slate-100 font-semibold">Connect Wallet</h3>
            <p className="text-slate-300 text-sm">Use the navbar to connect your Base wallet.</p>
            <div className="mt-3"><Link href="/wallet" prefetch={false}><Button variant="ghost">Go to Wallet</Button></Link></div>
          </Card>
          <Card className="p-5">
            <h3 className="text-slate-100 font-semibold">Submit Exchange</h3>
            <p className="text-slate-300 text-sm">Enter USDC amount to receive Kwacha at live rates.</p>
            <div className="mt-3"><Link href="/wallet" prefetch={false}><Button variant="ghost">Open Exchange</Button></Link></div>
          </Card>
          <Card className="p-5">
            <h3 className="text-slate-100 font-semibold">Browse Opportunities</h3>
            <p className="text-slate-300 text-sm">Find gigs and grants tailored for creators.</p>
            <div className="mt-3"><Link href="/opportunities" prefetch={false}><Button variant="ghost">Explore</Button></Link></div>
          </Card>
        </div>
      </Section>
    </main>
  );
}

