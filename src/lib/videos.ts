import { getDb } from "./db";

export interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string | null;
  status: string;
  position: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoInput {
  title: string;
  description?: string;
  youtubeUrl: string;
  status?: string;
  position?: string;
  sortOrder?: number;
}

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/shorts\/([^&\s?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Get thumbnail URL from YouTube ID
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Get all videos
export async function getAllVideos(): Promise<Video[]> {
  const db = getDb();
  const result = await db`
    SELECT 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
    FROM videos 
    ORDER BY sort_order ASC, created_at DESC
  `;
  return result.map(row => ({
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    youtubeUrl: String(row.youtubeurl),
    youtubeId: String(row.youtubeid),
    thumbnailUrl: row.thumbnailurl,
    status: String(row.status),
    position: String(row.position),
    sortOrder: Number(row.sortorder || 0),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  }));
}

// Get active videos by position
export async function getActiveVideosByPosition(position: string): Promise<Video[]> {
  const db = getDb();
  const result = await db`
    SELECT 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
    FROM videos 
    WHERE status = 'active' AND position = ${position}
    ORDER BY sort_order ASC, created_at DESC
  `;
  return result.map(row => ({
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    youtubeUrl: String(row.youtubeurl),
    youtubeId: String(row.youtubeid),
    thumbnailUrl: row.thumbnailurl,
    status: String(row.status),
    position: String(row.position),
    sortOrder: Number(row.sortorder || 0),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  }));
}

// Get video by ID
export async function getVideoById(id: string): Promise<Video | null> {
  const db = getDb();
  const result = await db`
    SELECT 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
    FROM videos 
    WHERE id = ${id}
  `;
  if (result.length === 0) return null;
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    youtubeUrl: String(row.youtubeurl),
    youtubeId: String(row.youtubeid),
    thumbnailUrl: row.thumbnailurl,
    status: String(row.status),
    position: String(row.position),
    sortOrder: Number(row.sortorder || 0),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  };
}

// Create video
export async function createVideo(input: VideoInput): Promise<Video> {
  const db = getDb();
  const youtubeId = extractYouTubeId(input.youtubeUrl);
  if (!youtubeId) {
    throw new Error("Invalid YouTube URL");
  }
  
  const thumbnailUrl = getYouTubeThumbnail(youtubeId);
  
  const result = await db`
    INSERT INTO videos (
      title, description, youtube_url, youtube_id, thumbnail_url,
      status, position, sort_order
    ) VALUES (
      ${input.title}, 
      ${input.description || null}, 
      ${input.youtubeUrl}, 
      ${youtubeId},
      ${thumbnailUrl},
      ${input.status || 'active'}, 
      ${input.position || 'homepage'},
      ${input.sortOrder || 0}
    )
    RETURNING 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
  `;
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    youtubeUrl: String(row.youtubeurl),
    youtubeId: String(row.youtubeid),
    thumbnailUrl: row.thumbnailurl,
    status: String(row.status),
    position: String(row.position),
    sortOrder: Number(row.sortorder || 0),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  };
}

// Update video
export async function updateVideo(id: string, input: Partial<VideoInput>): Promise<Video> {
  const db = getDb();
  
  // Get existing video first
  const existing = await getVideoById(id);
  if (!existing) {
    throw new Error("Video not found");
  }
  
  // Build updated values, using existing as fallback
  const title = input.title ?? existing.title;
  const description = input.description ?? existing.description;
  const status = input.status ?? existing.status;
  const position = input.position ?? existing.position;
  const sortOrder = input.sortOrder ?? existing.sortOrder;
  
  // Handle YouTube URL change
  let youtubeUrl = input.youtubeUrl ?? existing.youtubeUrl;
  let youtubeId = existing.youtubeId;
  let thumbnailUrl = existing.thumbnailUrl;
  
  if (input.youtubeUrl) {
    const newYoutubeId = extractYouTubeId(input.youtubeUrl);
    if (!newYoutubeId) {
      throw new Error("Invalid YouTube URL");
    }
    youtubeId = newYoutubeId;
    thumbnailUrl = getYouTubeThumbnail(newYoutubeId);
  }
  
  const result = await db`
    UPDATE videos 
    SET 
      title = ${title},
      description = ${description},
      youtube_url = ${youtubeUrl},
      youtube_id = ${youtubeId},
      thumbnail_url = ${thumbnailUrl},
      status = ${status},
      position = ${position},
      sort_order = ${sortOrder},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
  `;
  
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    youtubeUrl: String(row.youtubeurl),
    youtubeId: String(row.youtubeid),
    thumbnailUrl: row.thumbnailurl,
    status: String(row.status),
    position: String(row.position),
    sortOrder: Number(row.sortorder || 0),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  };
}

// Delete video
export async function deleteVideo(id: string): Promise<void> {
  const db = getDb();
  await db`DELETE FROM videos WHERE id = ${id}`;
}
