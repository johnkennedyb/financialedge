import type { WPPost } from "@/lib/wp-types";

const WP_API_URL = process.env.WORDPRESS_API_URL;

if (!WP_API_URL) {
  console.warn("WORDPRESS_API_URL not configured");
}

export async function getLatestPosts(limit: number = 12): Promise<WPPost[]> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL not configured");
  }

  try {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/posts?per_page=${limit}&_embed`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WPPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts from WordPress:", error);
    throw error;
  }
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  limit: number = 12
): Promise<WPPost[]> {
  return getPostsByCategory(categorySlug, limit);
}

export async function getPost(slug: string): Promise<WPPost | null> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL not configured");
  }

  try {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WPPost[] = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Failed to fetch post from WordPress:", error);
    throw error;
  }
}

export async function getPageBySlug(slug: string): Promise<WPPost | null> {
  // For now, treat pages the same as posts
  return getPost(slug);
}

export async function getPostsByCategory(
  categorySlug: string,
  limit: number = 12
): Promise<WPPost[]> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL not configured");
  }

  try {
    // First get the category ID from the slug
    const categoryResponse = await fetch(
      `${WP_API_URL}/wp/v2/categories?slug=${categorySlug}`,
      {
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!categoryResponse.ok) {
      throw new Error(`WordPress API error: ${categoryResponse.status}`);
    }

    const categories = await categoryResponse.json();
    if (categories.length === 0) {
      return [];
    }

    const categoryId = categories[0].id;

    // Then get posts by category
    const postsResponse = await fetch(
      `${WP_API_URL}/wp/v2/posts?categories=${categoryId}&per_page=${limit}&_embed`,
      {
        next: { revalidate: 300 },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!postsResponse.ok) {
      throw new Error(`WordPress API error: ${postsResponse.status}`);
    }

    const posts: WPPost[] = await postsResponse.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts by category from WordPress:", error);
    throw error;
  }
}
