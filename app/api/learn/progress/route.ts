import { NextResponse } from 'next/server';

interface UserProgress {
  [tutorialId: string]: number;
}

// In-memory storage for demo purposes (in production, use a database with user authentication)
let userProgressData: UserProgress = {
  "crypto-basics": 100,
  "wallet-setup": 75,
  "base-network": 50,
  "nft-basics": 25,
  "defi-intro": 0,
  "smart-contracts": 0
};

let completedTutorials: string[] = ["crypto-basics"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';

    // Simulate progress updates
    const updatedProgress = { ...userProgressData };
    
    // Simulate some progress for active tutorials
    Object.keys(updatedProgress).forEach(tutorialId => {
      if (updatedProgress[tutorialId] > 0 && updatedProgress[tutorialId] < 100) {
        updatedProgress[tutorialId] = Math.min(100, updatedProgress[tutorialId] + Math.floor(Math.random() * 5));
        
        // Mark as completed if reaches 100%
        if (updatedProgress[tutorialId] === 100 && !completedTutorials.includes(tutorialId)) {
          completedTutorials.push(tutorialId);
        }
      }
    });

    userProgressData = updatedProgress;

    const stats = {
      totalTutorials: Object.keys(userProgressData).length,
      completedTutorials: completedTutorials.length,
      averageProgress: Math.round(
        Object.values(userProgressData).reduce((sum, progress) => sum + progress, 0) / 
        Object.keys(userProgressData).length
      ),
      totalTimeSpent: '12.5 hours',
      streak: 7
    };

    return NextResponse.json({
      progress: userProgressData,
      completed: completedTutorials,
      stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tutorialId, progress, userId = 'demo-user' } = body;

    if (!tutorialId || progress === undefined) {
      return NextResponse.json(
        { error: 'Missing tutorialId or progress' },
        { status: 400 }
      );
    }

    // Update progress
    userProgressData[tutorialId] = Math.max(0, Math.min(100, progress));

    // Mark as completed if 100%
    if (userProgressData[tutorialId] === 100 && !completedTutorials.includes(tutorialId)) {
      completedTutorials.push(tutorialId);
    }

    return NextResponse.json({
      success: true,
      progress: userProgressData[tutorialId],
      completed: completedTutorials.includes(tutorialId),
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}