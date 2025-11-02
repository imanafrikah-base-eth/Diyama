import { NextResponse } from 'next/server';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAddress: string;
  category: 'discussion' | 'announcement' | 'question' | 'showcase';
  tags: string[];
  likes: number;
  replies: number;
  timestamp: string;
  isSticky?: boolean;
  network?: 'Base' | 'Zora';
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline' | 'hybrid';
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  tags: string[];
  network?: 'Base' | 'Zora';
}

interface Creator {
  id: string;
  name: string;
  address: string;
  bio: string;
  avatar?: string;
  followers: number;
  following: number;
  totalEarnings: string;
  specialties: string[];
  verified: boolean;
  network: 'Base' | 'Zora';
}

// In-memory storage for demo purposes
let communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    title: "Welcome to DIYAMA Community!",
    content: "This is the official community space for DIYAMA users. Share your experiences, ask questions, and connect with fellow Web3 enthusiasts!",
    author: "DIYAMA Team",
    authorAddress: "0x1234...5678",
    category: "announcement",
    tags: ["welcome", "announcement"],
    likes: 45,
    replies: 12,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isSticky: true
  },
  {
    id: "post-2",
    title: "Best practices for Base network transactions",
    content: "What are your tips for optimizing gas fees and transaction speed on Base?",
    author: "CryptoExplorer",
    authorAddress: "0xabcd...efgh",
    category: "question",
    tags: ["base", "gas", "optimization"],
    likes: 23,
    replies: 8,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    network: "Base"
  },
  {
    id: "post-3",
    title: "My first NFT collection on Zora",
    content: "Just launched my first NFT collection on Zora! Excited to share it with the community.",
    author: "ArtistDAO",
    authorAddress: "0x9876...5432",
    category: "showcase",
    tags: ["nft", "zora", "art"],
    likes: 67,
    replies: 15,
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    network: "Zora"
  }
];

let communityEvents: CommunityEvent[] = [
  {
    id: "event-1",
    title: "Base Builder Meetup",
    description: "Join us for a virtual meetup to discuss the latest developments on Base network.",
    date: "2024-02-15",
    time: "18:00 UTC",
    location: "Discord Voice Channel",
    type: "online",
    attendees: 127,
    maxAttendees: 200,
    organizer: "Base Community",
    tags: ["base", "meetup", "builders"],
    network: "Base"
  },
  {
    id: "event-2",
    title: "Zora Creator Workshop",
    description: "Learn how to create and mint NFTs on Zora with our expert creators.",
    date: "2024-02-20",
    time: "16:00 UTC",
    location: "Zoom",
    type: "online",
    attendees: 89,
    maxAttendees: 150,
    organizer: "Zora Team",
    tags: ["zora", "workshop", "nft"],
    network: "Zora"
  }
];

let creators: Creator[] = [
  {
    id: "creator-1",
    name: "DigitalArtist",
    address: "0x1111...2222",
    bio: "Creating unique digital art on Zora. Passionate about Web3 and decentralized creativity.",
    followers: 1250,
    following: 340,
    totalEarnings: "12.5 ETH",
    specialties: ["Digital Art", "NFTs", "Generative Art"],
    verified: true,
    network: "Zora"
  },
  {
    id: "creator-2",
    name: "DeFiBuilder",
    address: "0x3333...4444",
    bio: "Building the future of DeFi on Base. Smart contract developer and protocol designer.",
    followers: 890,
    following: 156,
    totalEarnings: "8.2 ETH",
    specialties: ["DeFi", "Smart Contracts", "Base"],
    verified: true,
    network: "Base"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'posts';
    const category = searchParams.get('category');
    const network = searchParams.get('network');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    switch (type) {
      case 'posts':
        let filteredPosts = [...communityPosts];
        
        if (category) {
          filteredPosts = filteredPosts.filter(post => post.category === category);
        }
        
        if (network) {
          filteredPosts = filteredPosts.filter(post => post.network === network);
        }

        // Sort by sticky first, then by timestamp
        filteredPosts.sort((a, b) => {
          if (a.isSticky && !b.isSticky) return -1;
          if (!a.isSticky && b.isSticky) return 1;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        const paginatedPosts = filteredPosts.slice(offset, offset + limit);

        return NextResponse.json({
          posts: paginatedPosts,
          total: filteredPosts.length,
          hasMore: offset + limit < filteredPosts.length
        });

      case 'events':
        let filteredEvents = [...communityEvents];
        
        if (network) {
          filteredEvents = filteredEvents.filter(event => event.network === network);
        }

        // Sort by date
        filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({
          events: filteredEvents,
          total: filteredEvents.length
        });

      case 'creators':
        let filteredCreators = [...creators];
        
        if (network) {
          filteredCreators = filteredCreators.filter(creator => creator.network === network);
        }

        // Sort by followers
        filteredCreators.sort((a, b) => b.followers - a.followers);

        return NextResponse.json({
          creators: filteredCreators,
          total: filteredCreators.length
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching community data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'post':
        const { title, content, author, authorAddress, category, tags, network } = data;
        
        if (!title || !content || !author || !authorAddress || !category) {
          return NextResponse.json(
            { error: 'Missing required fields for post' },
            { status: 400 }
          );
        }

        const newPost: CommunityPost = {
          id: `post-${Date.now()}`,
          title,
          content,
          author,
          authorAddress,
          category,
          tags: tags || [],
          likes: 0,
          replies: 0,
          timestamp: new Date().toISOString(),
          network
        };

        communityPosts.unshift(newPost);

        return NextResponse.json({
          success: true,
          post: newPost,
          message: 'Post created successfully'
        });

      case 'event':
        const { title: eventTitle, description, date, time, location, type: eventType, organizer, tags: eventTags, network: eventNetwork } = data;
        
        if (!eventTitle || !description || !date || !time || !location || !eventType || !organizer) {
          return NextResponse.json(
            { error: 'Missing required fields for event' },
            { status: 400 }
          );
        }

        const newEvent: CommunityEvent = {
          id: `event-${Date.now()}`,
          title: eventTitle,
          description,
          date,
          time,
          location,
          type: eventType,
          attendees: 0,
          organizer,
          tags: eventTags || [],
          network: eventNetwork
        };

        communityEvents.push(newEvent);

        return NextResponse.json({
          success: true,
          event: newEvent,
          message: 'Event created successfully'
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating community content:', error);
    return NextResponse.json(
      { error: 'Failed to create community content' },
      { status: 500 }
    );
  }
}