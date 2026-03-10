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
  
  // Build dynamic update
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;
  
  if (input.title !== undefined) {
    updates.push(`title = $${paramCount++}`);
    values.push(input.title);
  }
  if (input.description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(input.description);
  }
  if (input.youtubeUrl !== undefined) {
    const youtubeId = extractYouTubeId(input.youtubeUrl);
    if (!youtubeId) {
      throw new Error("Invalid YouTube URL");
    }
    updates.push(`youtube_url = $${paramCount++}`);
    values.push(input.youtubeUrl);
    updates.push(`youtube_id = $${paramCount++}`);
    values.push(youtubeId);
    updates.push(`thumbnail_url = $${paramCount++}`);
    values.push(getYouTubeThumbnail(youtubeId));
  }
  if (input.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(input.status);
  }
  if (input.position !== undefined) {
    updates.push(`position = $${paramCount++}`);
    values.push(input.position);
  }
  if (input.sortOrder !== undefined) {
    updates.push(`sort_order = $${paramCount++}`);
    values.push(input.sortOrder);
  }
  
  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  
  // Build the query with embedded values for unsafe()
  const setClause = updates.map((update, index) => {
    const value = values[index];
    if (typeof value === 'string') {
      return `${update.replace(/\$\d+/, "'$1'")}`.replace("'$1'", value.replace(/'/g, "''"));
    }
    return update.replace(/\$\d+/, String(value));
  }).join(', ');
  
  const query = `
    UPDATE videos 
    SET ${setClause} 
    WHERE id = '${id.replace(/'/g, "''")}'
    RETURNING 
      id, title, description, youtube_url as youtubeUrl, 
      youtube_id as youtubeId, thumbnail_url as thumbnailUrl,
      status, position, sort_order as sortOrder,
      created_at as createdAt, updated_at as updatedAt
  `;
  
  const result = await db.unsafe(query);
  if (result.length === 0) {
    throw new Error("Video not found");
  }
  
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
