import { NextResponse } from 'next/server';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  source: string;
  metrics: {
    views: number;
    likes: number;
    shares: number;
  };
  tags: string[];
  priority: 'high' | 'medium' | 'low' | 'breaking';
  blockchain: 'Base' | 'Zora' | 'Ethereum' | 'General';
  isLive: boolean;
  imageUrl?: string;
  url?: string;
}

// In-memory storage for demo purposes (in production, use a database)
let newsArticles: NewsArticle[] = [
  {
    id: "base-mainnet-1",
    title: "Base Mainnet Reaches 1 Million Daily Active Users",
    summary: "Coinbase's Layer 2 solution Base has achieved a significant milestone with over 1 million daily active users, marking unprecedented growth in the L2 ecosystem.",
    category: "Network Growth",
    date: new Date().toISOString(),
    readTime: "3 min",
    author: "Base Team",
    source: "Base Blog",
    metrics: {
      views: 15420,
      likes: 892,
      shares: 234
    },
    tags: ["Base", "Milestone", "L2", "Growth"],
    priority: "high",
    blockchain: "Base",
    isLive: true,
    url: "https://base.org/blog"
  },
  {
    id: "zora-protocol-1",
    title: "Zora Protocol Introduces Creator Rewards 2.0",
    summary: "Enhanced creator incentives and improved royalty distribution system launched on Zora, providing better monetization for digital artists and creators.",
    category: "Protocol Update",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    readTime: "4 min",
    author: "Zora Labs",
    source: "Zora Mirror",
    metrics: {
      views: 8750,
      likes: 445,
      shares: 156
    },
    tags: ["Zora", "Creators", "Rewards", "NFT"],
    priority: "high",
    blockchain: "Zora",
    isLive: true,
    url: "https://zora.co"
  },
  {
    id: "base-defi-1",
    title: "Aerodrome Finance Surpasses $500M TVL on Base",
    summary: "The leading DEX on Base network has reached a new all-time high in total value locked, demonstrating strong DeFi adoption on the platform.",
    category: "DeFi",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    readTime: "2 min",
    author: "DeFi Pulse",
    source: "Aerodrome",
    metrics: {
      views: 12300,
      likes: 678,
      shares: 189
    },
    tags: ["Base", "DeFi", "TVL", "Aerodrome"],
    priority: "medium",
    blockchain: "Base",
    isLive: true
  },
  {
    id: "onchain-summer-1",
    title: "Onchain Summer 2024 Breaks NFT Minting Records",
    summary: "Base's Onchain Summer campaign has facilitated over 10 million NFT mints, showcasing the power of gasless transactions and creator economy.",
    category: "Events",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    readTime: "5 min",
    author: "Coinbase",
    source: "Coinbase Blog",
    metrics: {
      views: 25600,
      likes: 1340,
      shares: 567
    },
    tags: ["Base", "NFT", "Onchain Summer", "Minting"],
    priority: "high",
    blockchain: "Base",
    isLive: true
  },
  {
    id: "farcaster-frames-1",
    title: "Farcaster Frames Drive Social Commerce on Base",
    summary: "Interactive frames on Farcaster are revolutionizing social commerce, with millions in transaction volume processed through Base network.",
    category: "Social",
    date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    readTime: "3 min",
    author: "Farcaster Team",
    source: "Warpcast",
    metrics: {
      views: 9800,
      likes: 523,
      shares: 145
    },
    tags: ["Farcaster", "Social", "Commerce", "Base"],
    priority: "medium",
    blockchain: "Base",
    isLive: true
  },
  {
    id: "zora-music-1",
    title: "Sound.xyz Partners with Major Record Labels",
    summary: "Leading music NFT platform on Zora announces partnerships with major record labels, bringing mainstream artists to Web3.",
    category: "Partnerships",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    readTime: "4 min",
    author: "Sound Protocol",
    source: "Sound.xyz",
    metrics: {
      views: 14200,
      likes: 756,
      shares: 298
    },
    tags: ["Zora", "Music", "NFT", "Partnerships"],
    priority: "medium",
    blockchain: "Zora",
    isLive: true
  },
  {
    id: "base-bridge-1",
    title: "Base Bridge Processes $1B in Monthly Volume",
    summary: "The official bridge to Base network has reached a new milestone, processing over $1 billion in monthly bridging volume.",
    category: "Infrastructure",
    date: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    readTime: "2 min",
    author: "Base Infrastructure",
    source: "Base Docs",
    metrics: {
      views: 11500,
      likes: 634,
      shares: 178
    },
    tags: ["Base", "Bridge", "Volume", "Infrastructure"],
    priority: "medium",
    blockchain: "Base",
    isLive: true
  },
  {
    id: "coinbase-wallet-1",
    title: "Coinbase Wallet Integrates Advanced Base Features",
    summary: "Latest Coinbase Wallet update includes enhanced Base network support, smart wallet features, and improved DApp connectivity.",
    category: "Wallet",
    date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    readTime: "3 min",
    author: "Coinbase Wallet Team",
    source: "Coinbase",
    metrics: {
      views: 18700,
      likes: 923,
      shares: 412
    },
    tags: ["Coinbase", "Wallet", "Base", "Features"],
    priority: "high",
    blockchain: "Base",
    isLive: true
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const blockchain = searchParams.get('blockchain');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredArticles = [...newsArticles];

    // Filter by category
    if (category && category !== 'All') {
      filteredArticles = filteredArticles.filter(article => 
        article.category === category
      );
    }

    // Filter by blockchain
    if (blockchain && blockchain !== 'All') {
      filteredArticles = filteredArticles.filter(article => 
        article.blockchain === blockchain
      );
    }

    // Sort by date (newest first)
    filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit results
    filteredArticles = filteredArticles.slice(0, limit);

    // Simulate real-time view updates
    filteredArticles = filteredArticles.map(article => ({
      ...article,
      metrics: {
        ...article.metrics,
        views: article.metrics.views + Math.floor(Math.random() * 50)
      }
    }));

    const stats = {
      totalArticles: newsArticles.length,
      totalViews: newsArticles.reduce((sum, article) => sum + article.metrics.views, 0),
      totalLikes: newsArticles.reduce((sum, article) => sum + article.metrics.likes, 0),
      avgReadTime: '3.5 min'
    };

    return NextResponse.json({
      articles: filteredArticles,
      stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, summary, category, author, source, tags, blockchain } = body;

    if (!title || !summary || !category || !author || !blockchain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newArticle: NewsArticle = {
      id: `${blockchain.toLowerCase()}-${Date.now()}`,
      title,
      summary,
      category,
      date: new Date().toISOString(),
      readTime: '3 min',
      author,
      source: source || 'Community',
      metrics: {
        views: 0,
        likes: 0,
        shares: 0
      },
      tags: tags || [],
      priority: 'medium',
      blockchain,
      isLive: true
    };

    newsArticles.unshift(newArticle); // Add to beginning

    return NextResponse.json({
      success: true,
      article: newArticle,
      message: 'News article created successfully'
    });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}