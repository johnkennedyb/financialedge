// Advertisement types and database functions
import { neon } from "@neondatabase/serverless";

const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(connectionString);
};

export type Advert = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string;
  position: "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";
  status: "active" | "inactive";
  priority: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  clickCount: number;
  impressionCount: number;
};

export type AdvertInput = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  linkUrl: string;
  position: Advert["position"];
  status?: "active" | "inactive";
  priority?: number;
  startDate?: string | null;
  endDate?: string | null;
};

// Get all adverts
export async function getAllAdverts(): Promise<Advert[]> {
  const db = getDb();
  
  const result = await db`
    SELECT 
      id,
      title,
      description,
      image_url as imageUrl,
      link_url as linkUrl,
      position,
      status,
      priority,
      start_date as startDate,
      end_date as endDate,
      created_at as createdAt,
      updated_at as updatedAt,
      click_count as clickCount,
      impression_count as impressionCount
    FROM adverts
    ORDER BY priority DESC, created_at DESC
  `;

  return result.map((row: any) => ({
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageurl,
    linkUrl: String(row.linkurl),
    position: row.position,
    status: row.status,
    priority: Number(row.priority),
    startDate: row.startdate,
    endDate: row.enddate,
    createdAt: String(row.createdat),
    updatedAt: String(row.updatedat),
    clickCount: Number(row.clickcount || 0),
    impressionCount: Number(row.impressioncount || 0),
  }));
}

// Get active adverts by position
export async function getActiveAdvertsByPosition(position: Advert["position"]): Promise<Advert[]> {
  const db = getDb();
  
  const now = new Date().toISOString();
  
  const result = await db`
    SELECT 
      id,
      title,
      description,
      image_url as imageUrl,
      link_url as linkUrl,
      position,
      status,
      priority,
      start_date as startDate,
      end_date as endDate,
      created_at as createdAt,
      updated_at as updatedAt,
      click_count as clickCount,
      impression_count as impressionCount
    FROM adverts
    WHERE position = ${position}
      AND status = 'active'
      AND (start_date IS NULL OR start_date <= ${now})
      AND (end_date IS NULL OR end_date >= ${now})
    ORDER BY priority DESC, created_at DESC
    LIMIT 5
  `;

  return result.map((row: any) => ({
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageurl,
    linkUrl: String(row.linkurl),
    position: row.position,
    status: row.status,
    priority: Number(row.priority),
    startDate: row.startdate,
    endDate: row.enddate,
    createdAt: String(row.createdat),
    updatedAt: String(row.updatedat),
    clickCount: Number(row.clickcount || 0),
    impressionCount: Number(row.impressioncount || 0),
  }));
}

// Get single advert by ID
export async function getAdvertById(id: string): Promise<Advert | null> {
  const db = getDb();
  
  const result = await db`
    SELECT 
      id,
      title,
      description,
      image_url as imageUrl,
      link_url as linkUrl,
      position,
      status,
      priority,
      start_date as startDate,
      end_date as endDate,
      created_at as createdAt,
      updated_at as updatedAt,
      click_count as clickCount,
      impression_count as impressionCount
    FROM adverts
    WHERE id = ${id}
    LIMIT 1
  `;

  if (result.length === 0) return null;
  
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageurl,
    linkUrl: String(row.linkurl),
    position: row.position,
    status: row.status,
    priority: Number(row.priority),
    startDate: row.startdate,
    endDate: row.enddate,
    createdAt: String(row.createdat),
    updatedAt: String(row.updatedat),
    clickCount: Number(row.clickcount || 0),
    impressionCount: Number(row.impressioncount || 0),
  };
}

// Create new advert
export async function createAdvert(input: AdvertInput): Promise<Advert> {
  const db = getDb();
  
  const result = await db`
    INSERT INTO adverts (
      title, description, image_url, link_url, position, 
      status, priority, start_date, end_date
    ) VALUES (
      ${input.title}, 
      ${input.description || null}, 
      ${input.imageUrl || null}, 
      ${input.linkUrl}, 
      ${input.position},
      ${input.status || 'active'}, 
      ${input.priority || 0}, 
      ${input.startDate || null}, 
      ${input.endDate || null}
    )
    RETURNING id, title, description, image_url as imageUrl, link_url as linkUrl, 
              position, status, priority, start_date as startDate, end_date as endDate,
              created_at as createdAt, updated_at as updatedAt, 
              click_count as clickCount, impression_count as impressionCount
  `;

  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageurl,
    linkUrl: String(row.linkurl),
    position: row.position,
    status: row.status,
    priority: Number(row.priority),
    startDate: row.startdate,
    endDate: row.enddate,
    createdAt: String(row.createdat),
    updatedAt: String(row.updatedat),
    clickCount: Number(row.clickcount || 0),
    impressionCount: Number(row.impressioncount || 0),
  };
}

// Update advert
export async function updateAdvert(id: string, input: Partial<AdvertInput>): Promise<Advert | null> {
  const db = getDb();
  
  const result = await db`
    UPDATE adverts
    SET 
      title = COALESCE(${input.title}, title),
      description = COALESCE(${input.description}, description),
      image_url = COALESCE(${input.imageUrl}, image_url),
      link_url = COALESCE(${input.linkUrl}, link_url),
      position = COALESCE(${input.position}, position),
      status = COALESCE(${input.status}, status),
      priority = COALESCE(${input.priority}, priority),
      start_date = COALESCE(${input.startDate}, start_date),
      end_date = COALESCE(${input.endDate}, end_date),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, description, image_url as imageUrl, link_url as linkUrl, 
              position, status, priority, start_date as startDate, end_date as endDate,
              created_at as createdAt, updated_at as updatedAt,
              click_count as clickCount, impression_count as impressionCount
  `;

  if (result.length === 0) return null;
  
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageurl,
    linkUrl: String(row.linkurl),
    position: row.position,
    status: row.status,
    priority: Number(row.priority),
    startDate: row.startdate,
    endDate: row.enddate,
    createdAt: String(row.createdat),
    updatedAt: String(row.updatedat),
    clickCount: Number(row.clickcount || 0),
    impressionCount: Number(row.impressioncount || 0),
  };
}

// Delete advert
export async function deleteAdvert(id: string): Promise<boolean> {
  const db = getDb();
  
  const result = await db`
    DELETE FROM adverts
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}

// Increment click count
export async function incrementAdvertClick(id: string): Promise<void> {
  const db = getDb();
  
  await db`
    UPDATE adverts
    SET click_count = click_count + 1
    WHERE id = ${id}
  `;
}

// Increment impression count
export async function incrementAdvertImpression(id: string): Promise<void> {
  const db = getDb();
  
  await db`
    UPDATE adverts
    SET impression_count = impression_count + 1
    WHERE id = ${id}
  `;
}
