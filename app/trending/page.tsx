import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import Link from "next/link";

export default function Trending() {
  const trendingItems = [
    {
      title: "Base Creator Bootcamp",
      description: "Join the fastest growing onchain creator community",
      category: "Education",
      participants: "2.3K",
      trending: true
    },
    {
      title: "NFT Art Challenge",
      description: "Create and mint your first NFT on Base",
      category: "Art",
      participants: "1.8K",
      trending: true
    },
    {
      title: "DeFi for Beginners",
      description: "Learn decentralized finance fundamentals",
      category: "Finance",
      participants: "3.1K",
      trending: false
    },
    {
      title: "Onchain Music Festival",
      description: "Showcase your music to the onchain world",
      category: "Music",
      participants: "950",
      trending: true
    },
    {
      title: "Creator DAO Launch",
      description: "Build the future of creator economies",
      category: "Community",
      participants: "1.2K",
      trending: false
    },
    {
      title: "Web3 Gaming Hub",
      description: "Discover play-to-earn opportunities",
      category: "Gaming",
      participants: "2.7K",
      trending: true
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-100 mb-6">
          What's <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Trending</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Discover the hottest opportunities, communities, and experiences in the onchain world.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg">🔥 Hot Now</Button>
          <Button variant="secondary" size="lg">📈 Rising</Button>
          <Button variant="ghost" size="lg">🆕 New</Button>
        </div>
      </section>

      {/* Trending Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">24</div>
            <div className="text-slate-300 text-sm">Trending Now</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">156</div>
            <div className="text-slate-300 text-sm">New This Week</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">89K</div>
            <div className="text-slate-300 text-sm">Total Participants</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">12</div>
            <div className="text-slate-300 text-sm">Categories</div>
          </Card>
        </div>
      </section>

      {/* Trending Items */}
      <Section title="Trending Opportunities" description="Join the most popular experiences in the creator economy">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingItems.map((item, index) => (
            <Card key={index} className="p-6 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.category === 'Education' ? 'bg-blue-500/20 text-blue-400' :
                  item.category === 'Art' ? 'bg-purple-500/20 text-purple-400' :
                  item.category === 'Finance' ? 'bg-green-500/20 text-green-400' :
                  item.category === 'Music' ? 'bg-pink-500/20 text-pink-400' :
                  item.category === 'Community' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {item.category}
                </span>
                {item.trending && (
                  <span className="text-red-400 text-sm">🔥</span>
                )}
              </div>
              
              <h3 className="text-slate-100 font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{item.participants} participants</span>
                <Button variant="ghost" size="sm">Join →</Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <Card className="p-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-cyan-400/30">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            Ready to Start Trending?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Connect your wallet and join the most exciting opportunities in the onchain creator economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/wallet" prefetch={false}>
              <Button size="lg">Connect Wallet</Button>
            </Link>
            <Link href="/opportunities" prefetch={false}>
              <Button variant="secondary" size="lg">Browse All Opportunities</Button>
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}