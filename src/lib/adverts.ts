// Advertisement types and database functions
import { neon } from "@neondatabase/serverless";
import { cache } from "react";
import { unstable_cache } from "next/cache";

const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(connectionString);
};

// Static fallback data when DB quota exceeded
const STATIC_ADVERTS: Record<string, Advert[]> = {
  homepage_hero: [],
  homepage_sidebar: [],
  footer: [],
  sidebar: [],
  inline: []
};

// Helper to handle DB errors gracefully
async function withFallback<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    // Check for quota exceeded (402) or connection errors
    if (error?.message?.includes("402") || 
        error?.message?.includes("quota") ||
        error?.message?.includes("compute time")) {
      console.warn(`[DB QUOTA EXCEEDED] ${operationName} - using fallback data`);
      return fallback;
    }
    console.error(`[DB ERROR] ${operationName}:`, error);
    return fallback;
  }
}

export type Advert = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  position: "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";
  status: "active" | "inactive";
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
  linkUrl?: string | null;
  position: Advert["position"];
  status?: "active" | "inactive";
  startDate?: string | null;
  endDate?: string | null;
};

// Get all adverts - cached for 1 hour with fallback
export const getAllAdverts = cache(
  unstable_cache(
    async (): Promise<Advert[]> => {
      return withFallback(async () => {
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
            start_date as startDate,
            end_date as endDate,
            created_at as createdAt,
            updated_at as updatedAt,
            click_count as clickCount,
            impression_count as impressionCount
          FROM adverts
          ORDER BY created_at DESC
        `;

        return result.map((row: any) => ({
          id: String(row.id),
          title: String(row.title),
          description: row.description,
          imageUrl: row.imageUrl || row.imageurl,
          linkUrl: String(row.linkurl),
          position: row.position,
          status: row.status,
          priority: Number(row.priority),
          startDate: row.startDate || row.startdate,
          endDate: row.endDate || row.enddate,
          createdAt: row.createdAt || row.createdat,
          updatedAt: row.updatedAt || row.updatedat,
          clickCount: Number(row.clickCount || row.clickcount || 0),
          impressionCount: Number(row.impressionCount || row.impressioncount || 0),
        }));
      }, [], "getAllAdverts");
    },
    ["adverts-all"],
    { revalidate: 3600, tags: ["adverts"] }
  )
);

// Get active adverts by position - cached for 5 minutes with fallback
export const getActiveAdvertsByPosition = cache(
  unstable_cache(
    async (position: Advert["position"]): Promise<Advert[]> => {
      return withFallback(async () => {
        const db = getDb();
        
        // Use current date in YYYY-MM-DD format for date-only comparison
        const today = new Date().toISOString().split('T')[0];
        
        const result = await db`
          SELECT 
            id,
            title,
            description,
            image_url as imageUrl,
            link_url as linkUrl,
            position,
            status,
            start_date as startDate,
            end_date as endDate,
            created_at as createdAt,
            updated_at as updatedAt,
            click_count as clickCount,
            impression_count as impressionCount
          FROM adverts
          WHERE position = ${position}
            AND status = 'active'
            AND (start_date IS NULL OR DATE(start_date) <= ${today})
            AND (end_date IS NULL OR DATE(end_date) >= ${today})
          ORDER BY created_at DESC
          LIMIT 5
        `;

        return result.map((row: any) => ({
          id: String(row.id),
          title: String(row.title),
          description: row.description,
          imageUrl: row.imageUrl || row.imageurl,
          linkUrl: row.linkUrl || row.linkurl,
          position: row.position,
          status: row.status,
          startDate: row.startDate || row.startdate,
          endDate: row.endDate || row.enddate,
          createdAt: row.createdAt || row.createdat,
          updatedAt: row.updatedAt || row.updatedat,
          clickCount: Number(row.clickCount || row.clickcount || 0),
          impressionCount: Number(row.impressionCount || row.impressioncount || 0),
        }));
      }, STATIC_ADVERTS[position], `getActiveAdvertsByPosition-${position}`);
    },
    ["adverts-position"],
    { revalidate: 300, tags: ["adverts", "adverts-active"] }
  )
);

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
    imageUrl: row.imageUrl || row.imageurl,
    linkUrl: row.linkUrl || row.linkurl,
    position: row.position,
    status: row.status,
    startDate: row.startDate || row.startdate,
    endDate: row.endDate || row.enddate,
    createdAt: row.createdAt || row.createdat,
    updatedAt: row.updatedAt || row.updatedat,
    clickCount: Number(row.clickCount || row.clickcount || 0),
    impressionCount: Number(row.impressionCount || row.impressioncount || 0),
  };
}

// Create new advert
export async function createAdvert(input: AdvertInput): Promise<Advert> {
  console.log('DEBUG createAdvert input:', input);
  const db = getDb();
  
  const result = await db`
    INSERT INTO adverts (
      title, description, image_url, link_url, position, 
      status, start_date, end_date
    ) VALUES (
      ${input.title}, 
      ${input.description || null}, 
      ${input.imageUrl || null}, 
      ${input.linkUrl || null}, 
      ${input.position},
      ${input.status || 'active'}, 
      ${input.startDate || null}, 
      ${input.endDate || null}
    )
    RETURNING id, title, description, image_url as imageUrl, link_url as linkUrl, 
              position, status, start_date as startDate, end_date as endDate,
              created_at as createdAt, updated_at as updatedAt, 
              click_count as clickCount, impression_count as impressionCount
  `;

  const row = result[0];
  console.log('DEBUG createAdvert raw row:', row);
  const mapped = {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageUrl || row.imageurl,
    linkUrl: row.linkUrl || row.linkurl,
    position: row.position,
    status: row.status,
    startDate: row.startDate || row.startdate,
    endDate: row.endDate || row.enddate,
    createdAt: row.createdAt || row.createdat,
    updatedAt: row.updatedAt || row.updatedat,
    clickCount: Number(row.clickCount || row.clickcount || 0),
    impressionCount: Number(row.impressionCount || row.impressioncount || 0),
  };
  console.log('DEBUG createAdvert mapped:', mapped);
  return mapped;
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
      start_date = COALESCE(${input.startDate}, start_date),
      end_date = COALESCE(${input.endDate}, end_date),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, description, image_url as imageUrl, link_url as linkUrl, 
              position, status, start_date as startDate, end_date as endDate,
              created_at as createdAt, updated_at as updatedAt,
              click_count as clickCount, impression_count as impressionCount
  `;

  if (result.length === 0) return null;
  
  const row = result[0];
  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description,
    imageUrl: row.imageUrl || row.imageurl,
    linkUrl: row.linkUrl || row.linkurl,
    position: row.position,
    status: row.status,
    startDate: row.startDate || row.startdate,
    endDate: row.endDate || row.enddate,
    createdAt: row.createdAt || row.createdat,
    updatedAt: row.updatedAt || row.updatedat,
    clickCount: Number(row.clickCount || row.clickcount || 0),
    impressionCount: Number(row.impressionCount || row.impressioncount || 0),
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
