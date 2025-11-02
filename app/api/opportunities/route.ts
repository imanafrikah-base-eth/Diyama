import { NextResponse } from 'next/server';

interface BlockchainOpportunity {
  id: string;
  title: string;
  description: string;
  reward: string;
  category: string;
  deadline: string;
  difficulty: string;
  network: 'Base' | 'Zora';
  contractAddress?: string;
  tokenId?: string;
  price?: string;
  creator?: string;
  volume?: string;
  isLive: boolean;
  participants?: number;
  timeLeft?: string;
}

// In-memory storage for demo purposes (in production, use a database)
let opportunities: BlockchainOpportunity[] = [
  {
    id: "base-nft-1",
    title: "Base Summer NFT Collection",
    description: "Mint exclusive Base Summer NFTs. Limited to 10,000 pieces with utility rewards.",
    reward: "0.01 ETH + Rewards",
    category: "NFT Drop",
    deadline: "3 days",
    difficulty: "Easy",
    network: "Base",
    contractAddress: "0x1234...5678",
    price: "0.01 ETH",
    creator: "BaseTeam",
    isLive: true,
    participants: 2847,
    timeLeft: "2d 14h 32m"
  },
  {
    id: "zora-art-1",
    title: "Zora Creator Rewards Program",
    description: "Earn protocol rewards by creating and collecting on Zora. Active until end of month.",
    reward: "$ENJOY + ETH",
    category: "Creator Rewards",
    deadline: "28 days",
    difficulty: "Medium",
    network: "Zora",
    volume: "45.2 ETH",
    isLive: true,
    participants: 1205,
    timeLeft: "27d 8h 15m"
  },
  {
    id: "base-defi-1",
    title: "Aerodrome Liquidity Mining",
    description: "Provide liquidity to USDC/ETH pool on Base and earn $AERO rewards.",
    reward: "15% APY in $AERO",
    category: "DeFi",
    deadline: "Ongoing",
    difficulty: "Hard",
    network: "Base",
    contractAddress: "0xabcd...efgh",
    volume: "1.2M USDC",
    isLive: true,
    participants: 892
  },
  {
    id: "zora-collect-1",
    title: "Zora Collect-to-Earn",
    description: "Collect featured artworks and earn $ENJOY tokens. Daily rewards for active collectors.",
    reward: "100-500 $ENJOY",
    category: "Collecting",
    deadline: "Daily Reset",
    difficulty: "Easy",
    network: "Zora",
    isLive: true,
    participants: 3421,
    timeLeft: "18h 45m"
  },
  {
    id: "base-bridge-1",
    title: "Base Bridge Incentives",
    description: "Bridge assets to Base and receive gas refunds plus bonus rewards.",
    reward: "Gas Refund + $OP",
    category: "Bridge",
    deadline: "Limited Time",
    difficulty: "Easy",
    network: "Base",
    isLive: true,
    participants: 15672
  },
  {
    id: "zora-music-1",
    title: "Sound.xyz Music NFTs",
    description: "Mint music NFTs from emerging artists. Support creators and earn collector rewards.",
    reward: "Collector Points",
    category: "Music NFT",
    deadline: "Various",
    difficulty: "Medium",
    network: "Zora",
    creator: "Sound Protocol",
    isLive: true,
    participants: 756
  },
  {
    id: "base-social-1",
    title: "Farcaster Frame Rewards",
    description: "Create engaging Frames on Farcaster and earn tips in $DEGEN and other tokens.",
    reward: "$DEGEN Tips",
    category: "Social",
    deadline: "Ongoing",
    difficulty: "Medium",
    network: "Base",
    isLive: true,
    participants: 2103
  },
  {
    id: "zora-mint-1",
    title: "Free Mint Fridays",
    description: "Discover and mint free NFTs every Friday. Gas-sponsored mints on Zora.",
    reward: "Free NFTs",
    category: "Free Mint",
    deadline: "Weekly",
    difficulty: "Easy",
    network: "Zora",
    isLive: true,
    participants: 8934
  }
];

export async function GET() {
  try {
    // Simulate real-time participant updates
    opportunities = opportunities.map(opp => ({
      ...opp,
      participants: opp.participants ? opp.participants + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 100)
    }));

    const stats = {
      totalOpportunities: opportunities.length,
      totalRewards: '$2.4M+',
      activeUsers: opportunities.reduce((sum, opp) => sum + (opp.participants || 0), 0),
      avgResponse: '12h'
    };

    return NextResponse.json({
      opportunities,
      stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, reward, category, deadline, difficulty, network } = body;

    if (!title || !description || !reward || !category || !network) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newOpportunity: BlockchainOpportunity = {
      id: `${network.toLowerCase()}-${Date.now()}`,
      title,
      description,
      reward,
      category,
      deadline: deadline || 'Ongoing',
      difficulty: difficulty || 'Medium',
      network,
      isLive: true,
      participants: 0,
      timeLeft: deadline
    };

    opportunities.push(newOpportunity);

    return NextResponse.json({
      success: true,
      opportunity: newOpportunity,
      message: 'Opportunity created successfully'
    });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}