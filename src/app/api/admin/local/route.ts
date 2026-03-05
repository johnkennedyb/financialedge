import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "edge";

// Database client
const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(connectionString);
};

// Helper to convert DB row to Post format
const dbRowToPost = (row: any) => ({
  id: String(row.id),
  slug: row.slug,
  title: row.title,
  content: row.content || "",
  excerpt: row.excerpt || "",
  status: row.status || "draft",
  author: row.author || "admin",
  createdAt: row.created_at ? new Date(row.created_at).toISOString() : "",
  updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  categories: row.categories || [],
  tags: row.tags || [],
  featuredImage: row.featured_image || undefined,
  meta: {
    description: row.meta_description || undefined,
    keywords: row.meta_keywords || [],
  },
  publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
});

// Helper to convert DB row to Page format
const dbRowToPage = (row: any) => ({
  id: String(row.id),
  slug: row.slug,
  title: row.title,
  content: row.content || "",
  excerpt: row.excerpt || "",
  status: row.status || "draft",
  author: row.author || "admin",
  createdAt: row.created_at ? new Date(row.created_at).toISOString() : "",
  updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  template: row.template || undefined,
  featuredImage: row.featured_image || undefined,
  meta: {
    description: row.meta_description || undefined,
    keywords: row.meta_keywords || [],
  },
  publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
});

// GET handler
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as "posts" | "pages" | "categories" | "media" | "seo" | "analytics" | null;
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  if (!type) {
    return NextResponse.json({ error: "Type parameter is required" }, { status: 400 });
  }

  const db = getDb();

  try {
    switch (type) {
      case "posts": {
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "50", 10);
        const offset = (page - 1) * limit;

        if (id) {
          const result = await db`SELECT * FROM posts WHERE id = ${id} OR slug = ${id}`;
          if (result.length === 0) return NextResponse.json(null);
          return NextResponse.json(dbRowToPost(result[0]));
        }

        if (slug) {
          const result = await db`SELECT * FROM posts WHERE slug = ${slug}`;
          if (result.length === 0) return NextResponse.json(null);
          return NextResponse.json(dbRowToPost(result[0]));
        }

        const posts = await db`SELECT * FROM posts ORDER BY published_at DESC NULLS LAST, created_at DESC LIMIT ${limit} OFFSET ${offset}`;
        const countResult = await db`SELECT COUNT(*) as total FROM posts`;
        const total = parseInt(countResult[0].total, 10);

        return NextResponse.json({
          posts: posts.map(dbRowToPost),
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        });
      }

      case "pages": {
        if (id) {
          const result = await db`SELECT * FROM pages WHERE id = ${id} OR slug = ${id}`;
          if (result.length === 0) return NextResponse.json(null);
          return NextResponse.json(dbRowToPage(result[0]));
        }

        if (slug) {
          const result = await db`SELECT * FROM pages WHERE slug = ${slug}`;
          if (result.length === 0) return NextResponse.json(null);
          return NextResponse.json(dbRowToPage(result[0]));
        }

        const pages = await db`SELECT * FROM pages ORDER BY created_at DESC`;
        return NextResponse.json(pages.map(dbRowToPage));
      }

      case "categories": {
        const categories = await db`SELECT * FROM categories ORDER BY name`;
        return NextResponse.json(
          categories.map((c: any) => ({
            id: String(c.id),
            slug: c.slug,
            name: c.name,
            description: c.description || "",
            parent: c.parent_slug || undefined,
            createdAt: c.created_at ? new Date(c.created_at).toISOString() : "",
            updatedAt: c.updated_at ? new Date(c.updated_at).toISOString() : "",
          }))
        );
      }

      case "media": {
        const media = await db`SELECT * FROM media ORDER BY uploaded_at DESC`;
        return NextResponse.json(
          media.map((m: any) => ({
            id: String(m.id),
            filename: m.filename,
            originalName: m.original_name,
            mimeType: m.mime_type,
            size: m.size,
            url: m.url,
            altText: m.alt_text || "",
            caption: m.caption || "",
            uploadedAt: m.uploaded_at ? new Date(m.uploaded_at).toISOString() : "",
          }))
        );
      }

      case "seo": {
        const result = await db`SELECT * FROM seo_settings WHERE id = 1`;
        if (result.length === 0) {
          return NextResponse.json({
            siteTitle: "FinancialEDGE",
            siteDescription: "Nigeria's definitive market intelligence platform",
          });
        }
        const s = result[0];
        return NextResponse.json({
          siteTitle: s.site_title,
          siteDescription: s.site_description,
          defaultMetaDescription: s.default_meta_description,
          defaultKeywords: s.default_keywords || [],
          googleAnalyticsId: s.google_analytics_id,
        });
      }

      case "analytics": {
        const postsCount = await db`SELECT COUNT(*) as count FROM posts`;
        const pagesCount = await db`SELECT COUNT(*) as count FROM pages`;
        const categoriesCount = await db`SELECT COUNT(*) as count FROM categories`;
        const mediaCount = await db`SELECT COUNT(*) as count FROM media`;
        const pageViews = await db`SELECT * FROM page_views ORDER BY views DESC LIMIT 10`;

        return NextResponse.json({
          totalPosts: parseInt(postsCount[0].count, 10),
          totalPages: parseInt(pagesCount[0].count, 10),
          totalCategories: parseInt(categoriesCount[0].count, 10),
          totalMedia: parseInt(mediaCount[0].count, 10),
          topPages: pageViews.map((pv: any) => ({
            path: pv.path,
            views: pv.views,
          })),
        });
      }

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// POST handler - Create new records
export async function POST(request: NextRequest) {
  const db = getDb();

  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 });
    }

    switch (type) {
      case "posts": {
        const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        if (!slug) {
          return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        const result = await db`INSERT INTO posts (slug, title, content, excerpt, status, author, featured_image, categories, tags, meta_description, meta_keywords, published_at)
           VALUES (${slug}, ${data.title}, ${data.content}, ${data.excerpt}, ${data.status || "draft"}, ${data.author || "admin"}, ${data.featuredImage}, ${data.categories || []}, ${data.tags || []}, ${data.meta?.description}, ${data.meta?.keywords || []}, ${data.status === "publish" ? new Date().toISOString() : null})
           RETURNING *`;

        return NextResponse.json(dbRowToPost(result[0]), { status: 201 });
      }

      case "pages": {
        const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        if (!slug) {
          return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        const result = await db`INSERT INTO pages (slug, title, content, excerpt, status, author, featured_image, template, meta_description, meta_keywords, published_at)
           VALUES (${slug}, ${data.title}, ${data.content}, ${data.excerpt}, ${data.status || "draft"}, ${data.author || "admin"}, ${data.featuredImage}, ${data.template}, ${data.meta?.description}, ${data.meta?.keywords || []}, ${data.status === "publish" ? new Date().toISOString() : null})
           RETURNING *`;

        return NextResponse.json(dbRowToPage(result[0]), { status: 201 });
      }

      case "categories": {
        const slug = data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        if (!slug) {
          return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        const result = await db`INSERT INTO categories (slug, name, description, parent_slug)
           VALUES (${slug}, ${data.name}, ${data.description}, ${data.parent})
           RETURNING *`;

        const c = result[0];
        return NextResponse.json(
          {
            id: String(c.id),
            slug: c.slug,
            name: c.name,
            description: c.description || "",
            parent: c.parent_slug || undefined,
            createdAt: c.created_at ? new Date(c.created_at).toISOString() : "",
            updatedAt: c.updated_at ? new Date(c.updated_at).toISOString() : "",
          },
          { status: 201 }
        );
      }

      case "media": {
        const result = await db`INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, caption)
           VALUES (${data.filename}, ${data.originalName}, ${data.mimeType}, ${data.size}, ${data.url}, ${data.altText}, ${data.caption})
           RETURNING *`;

        const m = result[0];
        return NextResponse.json(
          {
            id: String(m.id),
            filename: m.filename,
            originalName: m.original_name,
            mimeType: m.mime_type,
            size: m.size,
            url: m.url,
            altText: m.alt_text || "",
            caption: m.caption || "",
            uploadedAt: m.uploaded_at ? new Date(m.uploaded_at).toISOString() : "",
          },
          { status: 201 }
        );
      }

      case "seo": {
        await db`INSERT INTO seo_settings (id, site_title, site_description, default_meta_description, default_keywords, google_analytics_id, updated_at)
           VALUES (1, ${data.siteTitle}, ${data.siteDescription}, ${data.defaultMetaDescription}, ${data.defaultKeywords || []}, ${data.googleAnalyticsId}, CURRENT_TIMESTAMP)
           ON CONFLICT (id) DO UPDATE SET
             site_title = EXCLUDED.site_title,
             site_description = EXCLUDED.site_description,
             default_meta_description = EXCLUDED.default_meta_description,
             default_keywords = EXCLUDED.default_keywords,
             google_analytics_id = EXCLUDED.google_analytics_id,
             updated_at = CURRENT_TIMESTAMP`;

        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT handler - Update records
export async function PUT(request: NextRequest) {
  const db = getDb();

  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return NextResponse.json({ error: "Type, id, and data are required" }, { status: 400 });
    }

    switch (type) {
      case "posts": {
        const existing = await db`SELECT * FROM posts WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const existingId = existing[0].id;
        const result = await db`UPDATE posts SET
            title = COALESCE(${data.title}, title),
            content = COALESCE(${data.content}, content),
            excerpt = COALESCE(${data.excerpt}, excerpt),
            status = COALESCE(${data.status}, status),
            author = COALESCE(${data.author}, author),
            featured_image = COALESCE(${data.featuredImage}, featured_image),
            categories = COALESCE(${data.categories}, categories),
            tags = COALESCE(${data.tags}, tags),
            meta_description = COALESCE(${data.meta?.description}, meta_description),
            meta_keywords = COALESCE(${data.meta?.keywords}, meta_keywords),
            updated_at = CURRENT_TIMESTAMP,
            published_at = CASE WHEN ${data.status} = 'publish' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
           WHERE id = ${existingId}
           RETURNING *`;

        return NextResponse.json(dbRowToPost(result[0]));
      }

      case "pages": {
        const existing = await db`SELECT * FROM pages WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        const existingId = existing[0].id;
        const result = await db`UPDATE pages SET
            title = COALESCE(${data.title}, title),
            content = COALESCE(${data.content}, content),
            excerpt = COALESCE(${data.excerpt}, excerpt),
            status = COALESCE(${data.status}, status),
            author = COALESCE(${data.author}, author),
            featured_image = COALESCE(${data.featuredImage}, featured_image),
            template = COALESCE(${data.template}, template),
            meta_description = COALESCE(${data.meta?.description}, meta_description),
            meta_keywords = COALESCE(${data.meta?.keywords}, meta_keywords),
            updated_at = CURRENT_TIMESTAMP,
            published_at = CASE WHEN ${data.status} = 'publish' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
           WHERE id = ${existingId}
           RETURNING *`;

        return NextResponse.json(dbRowToPage(result[0]));
      }

      case "categories": {
        const existing = await db`SELECT * FROM categories WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const existingId = existing[0].id;
        const result = await db`UPDATE categories SET
            name = COALESCE(${data.name}, name),
            description = COALESCE(${data.description}, description),
            parent_slug = COALESCE(${data.parent}, parent_slug),
            updated_at = CURRENT_TIMESTAMP
           WHERE id = ${existingId}
           RETURNING *`;

        const c = result[0];
        return NextResponse.json({
          id: String(c.id),
          slug: c.slug,
          name: c.name,
          description: c.description || "",
          parent: c.parent_slug || undefined,
          createdAt: c.created_at ? new Date(c.created_at).toISOString() : "",
          updatedAt: c.updated_at ? new Date(c.updated_at).toISOString() : "",
        });
      }

      case "media": {
        const mediaId = parseInt(id, 10);
        const existing = await db`SELECT * FROM media WHERE id = ${mediaId}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Media not found" }, { status: 404 });
        }

        const result = await db`UPDATE media SET
            alt_text = COALESCE(${data.altText}, alt_text),
            caption = COALESCE(${data.caption}, caption)
           WHERE id = ${mediaId}
           RETURNING *`;

        const m = result[0];
        return NextResponse.json({
          id: String(m.id),
          filename: m.filename,
          originalName: m.original_name,
          mimeType: m.mime_type,
          size: m.size,
          url: m.url,
          altText: m.alt_text || "",
          caption: m.caption || "",
          uploadedAt: m.uploaded_at ? new Date(m.uploaded_at).toISOString() : "",
        });
      }

      case "seo": {
        await db`INSERT INTO seo_settings (id, site_title, site_description, default_meta_description, default_keywords, google_analytics_id, updated_at)
           VALUES (1, ${data.siteTitle}, ${data.siteDescription}, ${data.defaultMetaDescription}, ${data.defaultKeywords || []}, ${data.googleAnalyticsId}, CURRENT_TIMESTAMP)
           ON CONFLICT (id) DO UPDATE SET
             site_title = EXCLUDED.site_title,
             site_description = EXCLUDED.site_description,
             default_meta_description = EXCLUDED.default_meta_description,
             default_keywords = EXCLUDED.default_keywords,
             google_analytics_id = EXCLUDED.google_analytics_id,
             updated_at = CURRENT_TIMESTAMP`;

        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as "posts" | "pages" | "categories" | "media" | null;
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "Type and id are required" }, { status: 400 });
  }

  const db = getDb();

  try {
    switch (type) {
      case "posts": {
        const existing = await db`SELECT id FROM posts WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        await db`DELETE FROM posts WHERE id = ${existing[0].id}`;
        return NextResponse.json({ success: true });
      }

      case "pages": {
        const existing = await db`SELECT id FROM pages WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }
        await db`DELETE FROM pages WHERE id = ${existing[0].id}`;
        return NextResponse.json({ success: true });
      }

      case "categories": {
        const existing = await db`SELECT id FROM categories WHERE id = ${id} OR slug = ${id}`;
        if (existing.length === 0) {
          return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }
        await db`DELETE FROM categories WHERE id = ${existing[0].id}`;
        return NextResponse.json({ success: true });
      }

      case "media": {
        const mediaId = parseInt(id, 10);
        if (isNaN(mediaId)) {
          return NextResponse.json({ error: "Invalid media id" }, { status: 400 });
        }
        await db`DELETE FROM media WHERE id = ${mediaId}`;
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
