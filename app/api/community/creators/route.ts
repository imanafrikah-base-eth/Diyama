import { NextResponse } from 'next/server';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  stats: {
    followers: number;
    following: number;
    nfts: number;
    volume: number;
  };
  badges: string[];
  specialties: string[];
  recentWork: {
    title: string;
    image: string;
    price: number;
  }[];
  isFollowing: boolean;
  isOnline: boolean;
  joinedDate: string;
  socialLinks: {
    twitter?: string;
    farcaster?: string;
    website?: string;
  };
}

// In-memory storage for demo purposes
let creators: Creator[] = [
  {
    id: "1",
    name: "Alex Chen",
    username: "@alexcreates",
    avatar: "🎨",
    verified: true,
    bio: "Digital artist exploring the intersection of AI and blockchain. Creating unique NFT collections on Base.",
    stats: { followers: 12500, following: 890, nfts: 156, volume: 45.8 },
    badges: ["Top Creator", "Early Adopter", "Community Leader"],
    specialties: ["Digital Art", "AI Art", "Generative"],
    recentWork: [
      { title: "Cosmic Dreams #1", image: "🌌", price: 0.5 },
      { title: "Neural Patterns", image: "🧠", price: 0.3 },
      { title: "Base Abstracts", image: "🔷", price: 0.8 }
    ],
    isFollowing: false,
    isOnline: true,
    joinedDate: "2023-08-15",
    socialLinks: { twitter: "alexcreates", farcaster: "alexcreates" }
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    username: "@mayamusic",
    avatar: "🎵",
    verified: true,
    bio: "Music producer and NFT creator. Bridging traditional music with Web3 through innovative audio experiences.",
    stats: { followers: 8900, following: 456, nfts: 89, volume: 32.1 },
    badges: ["Rising Star", "Audio Pioneer"],
    specialties: ["Music NFTs", "Audio Art", "Collaboration"],
    recentWork: [
      { title: "Ethereal Beats #5", image: "🎶", price: 0.4 },
      { title: "Base Frequencies", image: "📻", price: 0.6 },
      { title: "Sonic Landscapes", image: "🌊", price: 0.7 }
    ],
    isFollowing: true,
    isOnline: false,
    joinedDate: "2023-09-22",
    socialLinks: { twitter: "mayamusic", website: "mayamusic.xyz" }
  },
  {
    id: "3",
    name: "Jordan Kim",
    username: "@jordanpixel",
    avatar: "🖼️",
    verified: false,
    bio: "Pixel artist and game developer. Creating retro-inspired NFTs and interactive experiences on Base network.",
    stats: { followers: 5600, following: 234, nfts: 67, volume: 18.9 },
    badges: ["Pixel Master", "Game Dev"],
    specialties: ["Pixel Art", "Game Assets", "Interactive"],
    recentWork: [
      { title: "Retro Heroes #12", image: "👾", price: 0.2 },
      { title: "8-Bit Worlds", image: "🕹️", price: 0.3 },
      { title: "Pixel Portraits", image: "🎮", price: 0.25 }
    ],
    isFollowing: false,
    isOnline: true,
    joinedDate: "2023-10-05",
    socialLinks: { twitter: "jordanpixel" }
  },
  {
    id: "4",
    name: "Sarah Thompson",
    username: "@sarahcrypto",
    avatar: "💎",
    verified: true,
    bio: "Crypto educator and community builder. Helping newcomers navigate the Web3 space with confidence.",
    stats: { followers: 15200, following: 1200, nfts: 45, volume: 28.7 },
    badges: ["Educator", "Community Builder", "Mentor"],
    specialties: ["Education", "Community", "DeFi"],
    recentWork: [
      { title: "Web3 Guide #1", image: "📚", price: 0.1 },
      { title: "DeFi Basics", image: "🏦", price: 0.15 },
      { title: "Safety First", image: "🛡️", price: 0.12 }
    ],
    isFollowing: false,
    isOnline: true,
    joinedDate: "2023-07-10",
    socialLinks: { twitter: "sarahcrypto", website: "sarahcrypto.com" }
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Simulate real-time updates to stats
    creators = creators.map(creator => ({
      ...creator,
      stats: {
        ...creator.stats,
        followers: creator.stats.followers + Math.floor(Math.random() * 10),
        volume: creator.stats.volume + (Math.random() * 0.5)
      },
      isOnline: Math.random() > 0.3 // 70% chance of being online
    }));

    // Filter creators based on search
    let filteredCreators = creators;
    if (search) {
      filteredCreators = creators.filter(creator =>
        creator.name.toLowerCase().includes(search) ||
        creator.username.toLowerCase().includes(search) ||
        creator.specialties.some(spec => spec.toLowerCase().includes(search))
      );
    }

    // Paginate results
    const paginatedCreators = filteredCreators.slice(offset, offset + limit);

    const stats = {
      totalCreators: creators.length,
      onlineCreators: creators.filter(c => c.isOnline).length,
      verifiedCreators: creators.filter(c => c.verified).length,
      totalVolume: creators.reduce((sum, c) => sum + c.stats.volume, 0).toFixed(1)
    };

    return NextResponse.json({
      creators: paginatedCreators,
      stats,
      pagination: {
        total: filteredCreators.length,
        limit,
        offset,
        hasMore: offset + limit < filteredCreators.length
      }
    });
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creatorId, action } = body;

    if (!creatorId || !action) {
      return NextResponse.json(
        { error: 'Missing creatorId or action' },
        { status: 400 }
      );
    }

    const creatorIndex = creators.findIndex(c => c.id === creatorId);
    if (creatorIndex === -1) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      );
    }

    if (action === 'follow') {
      creators[creatorIndex].isFollowing = !creators[creatorIndex].isFollowing;
      creators[creatorIndex].stats.followers += creators[creatorIndex].isFollowing ? 1 : -1;
    }

    return NextResponse.json({
      success: true,
      creator: creators[creatorIndex],
      message: `Successfully ${action}ed creator`
    });
  } catch (error) {
    console.error('Error updating creator:', error);
    return NextResponse.json(
      { error: 'Failed to update creator' },
      { status: 500 }
    );
  }
}