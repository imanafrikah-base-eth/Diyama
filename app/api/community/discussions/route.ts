import { NextResponse } from 'next/server';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  timestamp: string;
  metrics: {
    replies: number;
    likes: number;
    views: number;
  };
  isPinned: boolean;
  isHot: boolean;
  lastReply?: {
    author: string;
    timestamp: string;
  };
}

// In-memory storage for demo purposes
let discussions: Discussion[] = [
  {
    id: "1",
    title: "🚀 Base Network Gas Optimization Tips for NFT Creators",
    content: "Sharing some advanced techniques I've discovered for reducing gas costs when minting on Base. These methods have saved me over 40% on transaction fees...",
    author: { name: "Alex Chen", username: "@alexcreates", avatar: "🎨", verified: true },
    category: "Technical",
    tags: ["Base", "Gas", "Optimization", "Minting"],
    timestamp: "2024-01-15T10:30:00Z",
    metrics: { replies: 23, likes: 89, views: 456 },
    isPinned: true,
    isHot: true,
    lastReply: { author: "Maya Rodriguez", timestamp: "2024-01-15T11:45:00Z" }
  },
  {
    id: "2",
    title: "💡 Collaboration Opportunity: Music + Visual Art Project",
    content: "Looking for visual artists to collaborate on an innovative music NFT project. Combining generative audio with dynamic visuals...",
    author: { name: "Maya Rodriguez", username: "@mayamusic", avatar: "🎵", verified: true },
    category: "Collaboration",
    tags: ["Music", "Collaboration", "Visual Art", "NFT"],
    timestamp: "2024-01-15T09:15:00Z",
    metrics: { replies: 15, likes: 67, views: 234 },
    isPinned: false,
    isHot: true,
    lastReply: { author: "Jordan Kim", timestamp: "2024-01-15T10:20:00Z" }
  },
  {
    id: "3",
    title: "📈 Market Analysis: Base NFT Trends for Q1 2024",
    content: "Comprehensive analysis of Base NFT market trends, including top-performing categories, price movements, and emerging opportunities...",
    author: { name: "CryptoAnalyst", username: "@cryptodata", avatar: "📊", verified: true },
    category: "Market",
    tags: ["Analysis", "Trends", "Market", "Q1"],
    timestamp: "2024-01-15T08:00:00Z",
    metrics: { replies: 31, likes: 124, views: 789 },
    isPinned: false,
    isHot: false,
    lastReply: { author: "Alex Chen", timestamp: "2024-01-15T09:30:00Z" }
  },
  {
    id: "4",
    title: "🎨 Tutorial: Creating Animated NFTs with Code",
    content: "Step-by-step guide to creating animated NFTs using p5.js and deploying them on Base. Includes code examples and best practices...",
    author: { name: "Jordan Kim", username: "@jordanpixel", avatar: "🖼️", verified: false },
    category: "Tutorial",
    tags: ["Tutorial", "Animation", "Code", "p5.js"],
    timestamp: "2024-01-15T07:45:00Z",
    metrics: { replies: 18, likes: 92, views: 345 },
    isPinned: false,
    isHot: true,
    lastReply: { author: "TechCreator", timestamp: "2024-01-15T08:15:00Z" }
  },
  {
    id: "5",
    title: "🔐 Security Best Practices for Web3 Creators",
    content: "Essential security tips every creator should know when working with smart contracts and handling crypto assets...",
    author: { name: "Sarah Thompson", username: "@sarahcrypto", avatar: "💎", verified: true },
    category: "Security",
    tags: ["Security", "Best Practices", "Smart Contracts", "Safety"],
    timestamp: "2024-01-15T06:30:00Z",
    metrics: { replies: 42, likes: 156, views: 892 },
    isPinned: true,
    isHot: true,
    lastReply: { author: "Alex Chen", timestamp: "2024-01-15T07:15:00Z" }
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search')?.toLowerCase() || '';
    const sortBy = searchParams.get('sortBy') || 'recent';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Simulate real-time updates to metrics
    discussions = discussions.map(discussion => ({
      ...discussion,
      metrics: {
        ...discussion.metrics,
        views: discussion.metrics.views + Math.floor(Math.random() * 5),
        likes: discussion.metrics.likes + Math.floor(Math.random() * 3),
        replies: discussion.metrics.replies + (Math.random() > 0.8 ? 1 : 0)
      }
    }));

    // Filter discussions
    let filteredDiscussions = discussions;
    
    if (category !== 'all') {
      filteredDiscussions = filteredDiscussions.filter(d => d.category === category);
    }
    
    if (search) {
      filteredDiscussions = filteredDiscussions.filter(d =>
        d.title.toLowerCase().includes(search) ||
        d.content.toLowerCase().includes(search) ||
        d.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    // Sort discussions
    switch (sortBy) {
      case 'popular':
        filteredDiscussions.sort((a, b) => b.metrics.likes - a.metrics.likes);
        break;
      case 'trending':
        filteredDiscussions.sort((a, b) => b.metrics.views - a.metrics.views);
        break;
      case 'replies':
        filteredDiscussions.sort((a, b) => b.metrics.replies - a.metrics.replies);
        break;
      default: // recent
        filteredDiscussions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    // Move pinned discussions to top
    const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned);
    const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned);
    filteredDiscussions = [...pinnedDiscussions, ...regularDiscussions];

    // Paginate results
    const paginatedDiscussions = filteredDiscussions.slice(offset, offset + limit);

    const stats = {
      totalDiscussions: discussions.length,
      hotDiscussions: discussions.filter(d => d.isHot).length,
      pinnedDiscussions: discussions.filter(d => d.isPinned).length,
      totalReplies: discussions.reduce((sum, d) => sum + d.metrics.replies, 0),
      totalViews: discussions.reduce((sum, d) => sum + d.metrics.views, 0)
    };

    const categories = ['all', 'Technical', 'Collaboration', 'Market', 'Tutorial', 'Security', 'General'];

    return NextResponse.json({
      discussions: paginatedDiscussions,
      stats,
      categories,
      pagination: {
        total: filteredDiscussions.length,
        limit,
        offset,
        hasMore: offset + limit < filteredDiscussions.length
      }
    });
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, tags, author } = body;

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newDiscussion: Discussion = {
      id: (discussions.length + 1).toString(),
      title,
      content,
      author,
      category,
      tags: tags || [],
      timestamp: new Date().toISOString(),
      metrics: { replies: 0, likes: 0, views: 0 },
      isPinned: false,
      isHot: false
    };

    discussions.unshift(newDiscussion);

    return NextResponse.json({
      success: true,
      discussion: newDiscussion,
      message: 'Discussion created successfully'
    });
  } catch (error) {
    console.error('Error creating discussion:', error);
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}