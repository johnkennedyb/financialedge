// Database-based content fetching for frontend
// Replaces local-content.ts with database queries

import { neon } from "@neondatabase/serverless";

const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(connectionString);
};

export type ContentItem = {
  slug: string;
  url: string;
  title: string | null;
  description: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  html: string;
  section?: string | null;
  sectionSlug?: string | null;
  type?: "post" | "page";
  author?: string | null;
};

export type ContentIndexItem = {
  slug: string;
  type: "post" | "page";
  title: string | null;
  description: string | null;
  publishedAt: string | null;
  featuredImage: string | null;
  sourceUrl: string;
  section?: string | null;
  sectionSlug?: string | null;
  author?: string | null;
};

// Always returns true since we have database
export function hasImportedContent() {
  return true;
}

// List latest posts from database
export async function listLatestPosts(limit = 12): Promise<ContentIndexItem[]> {
  const db = getDb();
  
  const posts = await db`
    SELECT 
      slug,
      title,
      excerpt as description,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      status,
      author
    FROM posts 
    WHERE LOWER(TRIM(status)) = 'publish'
    ORDER BY published_at DESC NULLS LAST, created_at DESC
    LIMIT ${limit}
  `;

  return posts.map((post: any) => ({
    slug: post.slug,
    type: "post" as const,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedat,
    featuredImage: post.featuredimage || null,
    sourceUrl: `/${post.slug}`,
    section: post.categories?.[0] || null,
    sectionSlug: post.categories?.[0] || null,
    author: post.author || null,
  }));
}

// List all sections/categories from database
export async function listSections(limit = 12): Promise<{ section: string; slug: string; count: number }[]> {
  const db = getDb();
  
  const result = await db`
    SELECT 
      c.name as section,
      c.slug,
      COUNT(p.id)::int as count
    FROM categories c
    LEFT JOIN posts p ON c.slug = ANY(p.categories) AND LOWER(TRIM(p.status)) = 'publish'
    GROUP BY c.id, c.name, c.slug
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  return result.map((row: any) => ({
    section: row.section,
    slug: row.slug,
    count: row.count,
  }));
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<ContentItem | null> {
  const db = getDb();
  
  const result = await db`
    SELECT 
      slug,
      title,
      excerpt as description,
      content as html,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      author,
      status
    FROM posts 
    WHERE slug = ${slug}
      AND LOWER(TRIM(status)) = 'publish'
    LIMIT 1
  `;

  if (result.length === 0) return null;

  const post = result[0];
  return {
    slug: post.slug,
    url: `/${post.slug}`,
    title: post.title,
    description: post.description,
    featuredImage: post.featuredimage || null,
    publishedAt: post.publishedat,
    html: post.html || "",
    section: post.categories?.[0] || null,
    sectionSlug: post.categories?.[0] || null,
    type: "post",
    author: post.author || null,
  };
}

// Get posts by category/section
export async function getPostsBySection(sectionSlug: string, limit = 12): Promise<ContentIndexItem[]> {
  const db = getDb();
  
  const posts = await db`
    SELECT 
      slug,
      title,
      excerpt as description,
      featured_image as featuredImage,
      published_at as publishedAt,
      categories,
      status,
      author
    FROM posts 
    WHERE LOWER(TRIM(status)) = 'publish'
      AND ${sectionSlug} = ANY(categories)
    ORDER BY published_at DESC NULLS LAST, created_at DESC
    LIMIT ${limit}
  `;

  return posts.map((post: any) => ({
    slug: post.slug,
    type: "post" as const,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedat,
    featuredImage: post.featuredimage || null,
    sourceUrl: `/${post.slug}`,
    section: sectionSlug,
    sectionSlug: sectionSlug,
    author: post.author || null,
  }));
}

// Get all posts (for static generation)
export async function getAllPostSlugs(): Promise<string[]> {
  const db = getDb();
  
  const result = await db`
    SELECT slug FROM posts WHERE LOWER(TRIM(status)) = 'publish'
  `;

  if (!result || !Array.isArray(result)) {
    return [];
  }

  return result
    .filter((row: any) => row && row.slug)
    .map((row: any) => row.slug);
}
