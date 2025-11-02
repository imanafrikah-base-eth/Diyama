import { NextResponse } from 'next/server';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  network: 'Base' | 'Zora' | 'General';
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  instructor: string;
  tags: string[];
  thumbnail?: string;
  isCompleted?: boolean;
  progress?: number;
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'article' | 'interactive' | 'quiz';
  duration: string;
  order: number;
  isCompleted?: boolean;
}

interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  progress: number;
  startedAt: string;
  lastAccessed: string;
  certificateEarned?: boolean;
}

// In-memory storage for demo purposes
let courses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Base Network",
    description: "Learn the fundamentals of Base, Coinbase's Layer 2 solution built on Optimism.",
    category: "beginner",
    network: "Base",
    duration: "2 hours",
    lessons: 8,
    enrolled: 1247,
    rating: 4.8,
    instructor: "Base Team",
    tags: ["base", "layer2", "ethereum", "fundamentals"],
    thumbnail: "/courses/base-intro.jpg"
  },
  {
    id: "course-2",
    title: "Creating NFTs on Zora",
    description: "Complete guide to minting, selling, and collecting NFTs on the Zora protocol.",
    category: "intermediate",
    network: "Zora",
    duration: "3 hours",
    lessons: 12,
    enrolled: 892,
    rating: 4.9,
    instructor: "Zora Creators",
    tags: ["zora", "nft", "minting", "collecting"],
    thumbnail: "/courses/zora-nfts.jpg"
  },
  {
    id: "course-3",
    title: "DeFi Fundamentals",
    description: "Understanding decentralized finance protocols, yield farming, and liquidity provision.",
    category: "intermediate",
    network: "General",
    duration: "4 hours",
    lessons: 15,
    enrolled: 2103,
    rating: 4.7,
    instructor: "DeFi Academy",
    tags: ["defi", "yield", "liquidity", "protocols"],
    thumbnail: "/courses/defi-fundamentals.jpg"
  },
  {
    id: "course-4",
    title: "Smart Contract Development on Base",
    description: "Build and deploy smart contracts on Base using Solidity and modern development tools.",
    category: "advanced",
    network: "Base",
    duration: "6 hours",
    lessons: 20,
    enrolled: 456,
    rating: 4.9,
    instructor: "Smart Contract Pro",
    tags: ["solidity", "smart-contracts", "base", "development"],
    thumbnail: "/courses/smart-contracts.jpg"
  },
  {
    id: "course-5",
    title: "Web3 Wallet Security",
    description: "Best practices for securing your crypto assets and using wallets safely.",
    category: "beginner",
    network: "General",
    duration: "1.5 hours",
    lessons: 6,
    enrolled: 3421,
    rating: 4.6,
    instructor: "Security Expert",
    tags: ["security", "wallets", "safety", "best-practices"],
    thumbnail: "/courses/wallet-security.jpg"
  },
  {
    id: "course-6",
    title: "Zora Protocol Deep Dive",
    description: "Advanced concepts in the Zora ecosystem including protocol mechanics and governance.",
    category: "advanced",
    network: "Zora",
    duration: "5 hours",
    lessons: 18,
    enrolled: 234,
    rating: 4.8,
    instructor: "Protocol Researcher",
    tags: ["zora", "protocol", "governance", "advanced"],
    thumbnail: "/courses/zora-protocol.jpg"
  }
];

let lessons: Lesson[] = [
  {
    id: "lesson-1-1",
    courseId: "course-1",
    title: "What is Base Network?",
    description: "Introduction to Base and its role in the Ethereum ecosystem",
    content: "Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain...",
    type: "video",
    duration: "15 min",
    order: 1
  },
  {
    id: "lesson-1-2",
    courseId: "course-1",
    title: "Setting up your Base wallet",
    description: "How to connect and configure your wallet for Base network",
    content: "To start using Base, you'll need to add the Base network to your wallet...",
    type: "interactive",
    duration: "20 min",
    order: 2
  }
];

let userProgress: UserProgress[] = [
  {
    userId: "user-1",
    courseId: "course-1",
    completedLessons: ["lesson-1-1"],
    currentLesson: "lesson-1-2",
    progress: 25,
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    lastAccessed: new Date(Date.now() - 3600000).toISOString()
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'courses';
    const category = searchParams.get('category');
    const network = searchParams.get('network');
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    switch (type) {
      case 'courses':
        let filteredCourses = [...courses];
        
        if (category) {
          filteredCourses = filteredCourses.filter(course => course.category === category);
        }
        
        if (network) {
          filteredCourses = filteredCourses.filter(course => course.network === network);
        }

        // Add progress data if userId is provided
        if (userId) {
          filteredCourses = filteredCourses.map(course => {
            const progress = userProgress.find(p => p.userId === userId && p.courseId === course.id);
            return {
              ...course,
              progress: progress?.progress || 0,
              isCompleted: progress?.progress === 100
            };
          });
        }

        // Sort by rating and enrollment
        filteredCourses.sort((a, b) => b.rating - a.rating || b.enrolled - a.enrolled);

        const paginatedCourses = filteredCourses.slice(offset, offset + limit);

        return NextResponse.json({
          courses: paginatedCourses,
          total: filteredCourses.length,
          hasMore: offset + limit < filteredCourses.length,
          stats: {
            totalCourses: courses.length,
            totalStudents: courses.reduce((sum, course) => sum + course.enrolled, 0),
            avgRating: courses.reduce((sum, course) => sum + course.rating, 0) / courses.length
          }
        });

      case 'lessons':
        if (!courseId) {
          return NextResponse.json({ error: 'Course ID is required for lessons' }, { status: 400 });
        }

        let courseLessons = lessons.filter(lesson => lesson.courseId === courseId);
        
        // Add completion status if userId is provided
        if (userId) {
          const progress = userProgress.find(p => p.userId === userId && p.courseId === courseId);
          courseLessons = courseLessons.map(lesson => ({
            ...lesson,
            isCompleted: progress?.completedLessons.includes(lesson.id) || false
          }));
        }

        courseLessons.sort((a, b) => a.order - b.order);

        return NextResponse.json({
          lessons: courseLessons,
          total: courseLessons.length
        });

      case 'progress':
        if (!userId) {
          return NextResponse.json({ error: 'User ID is required for progress' }, { status: 400 });
        }

        const userProgressData = userProgress.filter(p => p.userId === userId);
        
        return NextResponse.json({
          progress: userProgressData,
          total: userProgressData.length,
          completedCourses: userProgressData.filter(p => p.progress === 100).length,
          inProgressCourses: userProgressData.filter(p => p.progress > 0 && p.progress < 100).length
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching learning data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'enroll':
        const { userId, courseId } = data;
        
        if (!userId || !courseId) {
          return NextResponse.json(
            { error: 'User ID and Course ID are required' },
            { status: 400 }
          );
        }

        // Check if already enrolled
        const existingProgress = userProgress.find(p => p.userId === userId && p.courseId === courseId);
        if (existingProgress) {
          return NextResponse.json(
            { error: 'Already enrolled in this course' },
            { status: 400 }
          );
        }

        // Find course and first lesson
        const course = courses.find(c => c.id === courseId);
        if (!course) {
          return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const firstLesson = lessons.find(l => l.courseId === courseId && l.order === 1);

        const newProgress: UserProgress = {
          userId,
          courseId,
          completedLessons: [],
          currentLesson: firstLesson?.id || '',
          progress: 0,
          startedAt: new Date().toISOString(),
          lastAccessed: new Date().toISOString()
        };

        userProgress.push(newProgress);

        // Update enrollment count
        course.enrolled += 1;

        return NextResponse.json({
          success: true,
          progress: newProgress,
          message: 'Successfully enrolled in course'
        });

      case 'complete-lesson':
        const { userId: completeUserId, courseId: completeCourseId, lessonId } = data;
        
        if (!completeUserId || !completeCourseId || !lessonId) {
          return NextResponse.json(
            { error: 'User ID, Course ID, and Lesson ID are required' },
            { status: 400 }
          );
        }

        const progressIndex = userProgress.findIndex(p => p.userId === completeUserId && p.courseId === completeCourseId);
        if (progressIndex === -1) {
          return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 400 });
        }

        const progress = userProgress[progressIndex];
        
        // Add lesson to completed if not already completed
        if (!progress.completedLessons.includes(lessonId)) {
          progress.completedLessons.push(lessonId);
        }

        // Calculate new progress percentage
        const totalLessons = lessons.filter(l => l.courseId === completeCourseId).length;
        progress.progress = Math.round((progress.completedLessons.length / totalLessons) * 100);
        progress.lastAccessed = new Date().toISOString();

        // Find next lesson
        const currentLessonOrder = lessons.find(l => l.id === lessonId)?.order || 0;
        const nextLesson = lessons.find(l => l.courseId === completeCourseId && l.order === currentLessonOrder + 1);
        if (nextLesson) {
          progress.currentLesson = nextLesson.id;
        }

        // Check if course is completed
        if (progress.progress === 100) {
          progress.certificateEarned = true;
        }

        userProgress[progressIndex] = progress;

        return NextResponse.json({
          success: true,
          progress,
          message: progress.progress === 100 ? 'Course completed! Certificate earned.' : 'Lesson completed successfully'
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating learning data:', error);
    return NextResponse.json(
      { error: 'Failed to update learning data' },
      { status: 500 }
    );
  }
}