# API Routes Documentation

This document provides comprehensive documentation for all API routes in the DIYAMA application.

## Base URL
All API routes are prefixed with `/api/`

## Routes Overview

### 1. News API (`/api/news`)

**Endpoint:** `GET /api/news`
- **Description:** Retrieve news articles with filtering, sorting, and pagination
- **Query Parameters:**
  - `category` (optional): Filter by category (blockchain, defi, nft, web3, crypto)
  - `search` (optional): Search in title and content
  - `sortBy` (optional): Sort by date, title, or views (default: date)
  - `order` (optional): asc or desc (default: desc)
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response:** Array of news articles with metadata

**Endpoint:** `POST /api/news`
- **Description:** Create a new news article
- **Body:** NewsArticle object
- **Response:** Created article with generated ID

### 2. Opportunities API (`/api/opportunities`)

**Endpoint:** `GET /api/opportunities`
- **Description:** Retrieve blockchain opportunities with real-time updates
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `network` (optional): Filter by blockchain network
  - `minReward` (optional): Minimum reward amount
  - `maxReward` (optional): Maximum reward amount
  - `sortBy` (optional): Sort by reward, participants, or deadline
  - `order` (optional): asc or desc
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Array of opportunities with real-time participant counts

**Endpoint:** `POST /api/opportunities`
- **Description:** Create a new blockchain opportunity
- **Body:** BlockchainOpportunity object
- **Response:** Created opportunity with generated ID

### 3. Exchange API (`/api/exchange/request`)

**Endpoint:** `POST /api/exchange/request`
- **Description:** Submit a P2P exchange request
- **Body:**
  ```json
  {
    "amountUSDC": number,
    "baseAddress": string,
    "fullName": string,
    "phoneNumber": string
  }
  ```
- **Response:** Exchange request confirmation with real-time ZMW rate
- **Note:** Only POST method is supported (GET returns 405 Method Not Allowed)

### 4. Community API (`/api/community`)

**Endpoint:** `GET /api/community`
- **Description:** Retrieve community posts with filtering and pagination
- **Query Parameters:**
  - `type` (optional): Filter by post type (discussion, announcement, question)
  - `search` (optional): Search in title and content
  - `sortBy` (optional): Sort by date, likes, or comments
  - `order` (optional): asc or desc
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Array of community posts with engagement metrics

**Endpoint:** `POST /api/community`
- **Description:** Create a new community post
- **Body:** CommunityPost object
- **Response:** Created post with generated ID

#### Community Subroutes

##### Creators (`/api/community/creators`)

**Endpoint:** `GET /api/community/creators`
- **Description:** Retrieve creator profiles with real-time stats
- **Query Parameters:**
  - `verified` (optional): Filter by verification status
  - `category` (optional): Filter by creator category
  - `sortBy` (optional): Sort by followers, posts, or engagement
  - `search` (optional): Search by name or username
- **Response:** Array of creator profiles with live statistics

**Endpoint:** `POST /api/community/creators`
- **Description:** Follow/unfollow creators or update creator profiles
- **Body:** Action object (follow/unfollow) or creator update
- **Response:** Updated creator data

##### Discussions (`/api/community/discussions`)

**Endpoint:** `GET /api/community/discussions`
- **Description:** Retrieve community discussions with real-time metrics
- **Query Parameters:**
  - `category` (optional): Filter by discussion category
  - `status` (optional): Filter by status (active, resolved, closed)
  - `sortBy` (optional): Sort by date, replies, or views
  - `search` (optional): Search in title and content
- **Response:** Array of discussions with engagement data

**Endpoint:** `POST /api/community/discussions`
- **Description:** Create new discussion or add replies
- **Body:** Discussion object or reply object
- **Response:** Created discussion/reply with generated ID

##### Events (`/api/community/events`)

**Endpoint:** `GET /api/community/events`
- **Description:** Retrieve community events with live status updates
- **Query Parameters:**
  - `type` (optional): Filter by event type (workshop, webinar, meetup, conference)
  - `upcoming` (optional): Filter upcoming events (true/false)
  - `live` (optional): Filter live events (true/false)
  - `sortBy` (optional): Sort by date, attendees, or title
- **Response:** Array of events with real-time attendee counts

**Endpoint:** `POST /api/community/events`
- **Description:** Register for events or update attendance
- **Body:** Event registration object
- **Response:** Updated event data with attendance confirmation

### 5. Learn API (`/api/learn`)

**Endpoint:** `GET /api/learn`
- **Description:** Retrieve learning courses and lessons
- **Query Parameters:**
  - `category` (optional): Filter by difficulty (beginner, intermediate, advanced)
  - `network` (optional): Filter by blockchain network
  - `search` (optional): Search in title and description
  - `sortBy` (optional): Sort by date, duration, or difficulty
- **Response:** Array of courses with lesson details

**Endpoint:** `POST /api/learn`
- **Description:** Create new course or lesson
- **Body:** Course/Lesson object
- **Response:** Created course/lesson with generated ID

#### Learn Subroutes

##### Progress (`/api/learn/progress`)

**Endpoint:** `GET /api/learn/progress`
- **Description:** Retrieve user learning progress with real-time updates
- **Response:** User progress data including:
  - Individual tutorial progress percentages
  - Completed tutorials list
  - Overall statistics (total/completed tutorials, progress percentage)

**Endpoint:** `POST /api/learn/progress`
- **Description:** Update user learning progress
- **Body:**
  ```json
  {
    "tutorialId": string,
    "progress": number (0-100),
    "completed": boolean (optional)
  }
  ```
- **Response:** Updated progress data

## Data Models

### NewsArticle
```typescript
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  views: number;
  likes: number;
}
```

### BlockchainOpportunity
```typescript
interface BlockchainOpportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  network: string;
  reward: number;
  currency: string;
  deadline: string;
  requirements: string[];
  participants: number;
  maxParticipants: number;
  difficulty: string;
  estimatedTime: string;
  tags: string[];
}
```

### CommunityPost
```typescript
interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  type: string;
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK`: Successful GET requests
- `201 Created`: Successful POST requests
- `400 Bad Request`: Invalid request data
- `405 Method Not Allowed`: Unsupported HTTP method
- `500 Internal Server Error`: Server errors

## Rate Limiting

Currently, no rate limiting is implemented, but it's recommended for production use.

## Authentication

Currently, no authentication is required for these endpoints. Consider implementing authentication for production use.

## Real-time Features

Several endpoints include simulated real-time updates:
- Opportunity participant counts
- Community engagement metrics
- Learning progress tracking
- Event attendance numbers
- Creator statistics

These features simulate live data updates for demonstration purposes.