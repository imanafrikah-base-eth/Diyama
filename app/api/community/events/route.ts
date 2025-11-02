import { NextResponse } from 'next/server';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "ama" | "launch" | "meetup";
  date: string;
  time: string;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  attendees: number;
  maxAttendees?: number;
  isLive: boolean;
  tags: string[];
}

// In-memory storage for demo purposes
let events: CommunityEvent[] = [
  {
    id: "1",
    title: "Base Creator Workshop: Advanced Minting Techniques",
    description: "Learn advanced minting strategies, gas optimization, and smart contract interactions for Base network.",
    type: "workshop",
    date: "2024-01-20",
    time: "2:00 PM UTC",
    host: { name: "Alex Chen", avatar: "🎨", verified: true },
    attendees: 89,
    maxAttendees: 100,
    isLive: false,
    tags: ["Workshop", "Minting", "Base", "Technical"]
  },
  {
    id: "2",
    title: "🎵 Music NFT AMA with Maya Rodriguez",
    description: "Ask anything about creating music NFTs, building an audience, and monetizing audio art in Web3.",
    type: "ama",
    date: "2024-01-18",
    time: "6:00 PM UTC",
    host: { name: "Maya Rodriguez", avatar: "🎵", verified: true },
    attendees: 156,
    isLive: true,
    tags: ["AMA", "Music", "NFT", "Creator Economy"]
  },
  {
    id: "3",
    title: "🚀 New Collection Launch: Pixel Worlds",
    description: "Join Jordan Kim for the exclusive launch of the Pixel Worlds collection featuring interactive game assets.",
    type: "launch",
    date: "2024-01-22",
    time: "8:00 PM UTC",
    host: { name: "Jordan Kim", avatar: "🖼️", verified: false },
    attendees: 234,
    maxAttendees: 500,
    isLive: false,
    tags: ["Launch", "Pixel Art", "Gaming", "Collection"]
  },
  {
    id: "4",
    title: "Web3 Security Meetup",
    description: "Community meetup focused on security best practices, wallet safety, and smart contract auditing.",
    type: "meetup",
    date: "2024-01-25",
    time: "4:00 PM UTC",
    host: { name: "Sarah Thompson", avatar: "💎", verified: true },
    attendees: 67,
    maxAttendees: 150,
    isLive: false,
    tags: ["Meetup", "Security", "Best Practices", "Community"]
  },
  {
    id: "5",
    title: "Base Network Developer Workshop",
    description: "Technical deep-dive into Base network development, including smart contract deployment and dApp building.",
    type: "workshop",
    date: "2024-01-28",
    time: "1:00 PM UTC",
    host: { name: "DevTeam Base", avatar: "⚡", verified: true },
    attendees: 45,
    maxAttendees: 80,
    isLive: false,
    tags: ["Workshop", "Development", "Base", "Smart Contracts"]
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const upcoming = searchParams.get('upcoming') === 'true';
    const live = searchParams.get('live') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Simulate real-time updates to attendee counts
    events = events.map(event => ({
      ...event,
      attendees: event.attendees + Math.floor(Math.random() * 3),
      isLive: event.id === "2" ? true : Math.random() > 0.8 // Keep AMA live, others random
    }));

    // Filter events
    let filteredEvents = events;
    
    if (type !== 'all') {
      filteredEvents = filteredEvents.filter(e => e.type === type);
    }
    
    if (upcoming) {
      const now = new Date();
      filteredEvents = filteredEvents.filter(e => new Date(e.date) > now);
    }
    
    if (live) {
      filteredEvents = filteredEvents.filter(e => e.isLive);
    }

    // Sort by date (upcoming first)
    filteredEvents.sort((a, b) => {
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Paginate results
    const paginatedEvents = filteredEvents.slice(offset, offset + limit);

    const stats = {
      totalEvents: events.length,
      liveEvents: events.filter(e => e.isLive).length,
      upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
      totalAttendees: events.reduce((sum, e) => sum + e.attendees, 0),
      eventTypes: {
        workshop: events.filter(e => e.type === 'workshop').length,
        ama: events.filter(e => e.type === 'ama').length,
        launch: events.filter(e => e.type === 'launch').length,
        meetup: events.filter(e => e.type === 'meetup').length
      }
    };

    return NextResponse.json({
      events: paginatedEvents,
      stats,
      pagination: {
        total: filteredEvents.length,
        limit,
        offset,
        hasMore: offset + limit < filteredEvents.length
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, action } = body;

    if (!eventId || !action) {
      return NextResponse.json(
        { error: 'Missing eventId or action' },
        { status: 400 }
      );
    }

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (action === 'attend') {
      const event = events[eventIndex];
      if (!event.maxAttendees || event.attendees < event.maxAttendees) {
        events[eventIndex].attendees += 1;
      } else {
        return NextResponse.json(
          { error: 'Event is full' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      event: events[eventIndex],
      message: `Successfully registered for event`
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}