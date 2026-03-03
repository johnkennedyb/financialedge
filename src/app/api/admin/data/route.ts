import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir, writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { readContentIndex, ContentIndexItem } from '@/lib/local-content';

const CONTENT_DIR = join(process.cwd(), 'content');
const POSTS_DIR = join(CONTENT_DIR, 'posts');
const PAGES_DIR = join(CONTENT_DIR, 'pages');

// Helper to read content index
function getContentIndex() {
  return readContentIndex();
}

// Helper to write content index
async function writeContentIndex(index: { generatedAt: string; items: Record<string, ContentIndexItem> }) {
  await mkdir(CONTENT_DIR, { recursive: true });
  await writeFile(join(CONTENT_DIR, 'index.json'), JSON.stringify(index, null, 2));
}

// Helper to write a post/page JSON file
async function writeItemFile(type: 'posts' | 'pages', slug: string, data: any) {
  const dir = type === 'posts' ? POSTS_DIR : PAGES_DIR;
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, `${slug}.json`), JSON.stringify(data, null, 2));
}

// Helper to delete a post/page file
async function deleteItemFile(type: 'posts' | 'pages', slug: string) {
  const dir = type === 'posts' ? POSTS_DIR : PAGES_DIR;
  try {
    await unlink(join(dir, `${slug}.json`));
  } catch {
    // File might not exist
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  try {
    switch (type) {
      case 'analytics':
        // Fetch data from local content
        const index = readContentIndex();
        if (!index) {
          return NextResponse.json({
            totalPosts: 0,
            totalPages: 0,
            totalCategories: 0,
            totalMedia: 0,
            posts: [],
            pages: []
          });
        }
        const items = Object.values(index.items);
        const localPosts = items.filter(item => item.type === 'post');
        const localPages = items.filter(item => item.type === 'page');
        
        // Get unique categories from sections
        const categories = [...new Set(items.map(item => item.section).filter(Boolean))];
        
        // Count media files in public/images
        let mediaCount = 0;
        try {
          const imagesDir = join(process.cwd(), 'public', 'images');
          const files = await readdir(imagesDir);
          mediaCount = files.length;
        } catch {
          mediaCount = 0;
        }

        return NextResponse.json({
          totalPosts: localPosts.length,
          totalPages: localPages.length,
          totalCategories: categories.length,
          totalMedia: mediaCount,
          posts: localPosts.slice(0, 10),
          pages: localPages.slice(0, 10)
        });

      case 'posts':
        const indexPosts = readContentIndex();
        if (!indexPosts) {
          return NextResponse.json([]);
        }
        const allPosts = Object.values(indexPosts.items).filter(item => item.type === 'post');
        if (id) {
          const post = allPosts.find(p => p.slug === id);
          return NextResponse.json(post || { error: 'Post not found' }, { status: post ? 200 : 404 });
        }
        return NextResponse.json(allPosts);

      case 'pages':
        const indexPages = readContentIndex();
        if (!indexPages) {
          return NextResponse.json([]);
        }
        const allPages = Object.values(indexPages.items).filter(item => item.type === 'page');
        if (id) {
          const page = allPages.find(p => p.slug === id);
          return NextResponse.json(page || { error: 'Page not found' }, { status: page ? 200 : 404 });
        }
        return NextResponse.json(allPages);

      case 'categories':
        const catIndex = readContentIndex();
        if (!catIndex) {
          return NextResponse.json([]);
        }
        const sections = [...new Set(Object.values(catIndex.items).map(item => item.section).filter((s): s is string => !!s))];
        const allCategories = sections.map((name, i) => ({
          id: i + 1,
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: ''
        }));
        return NextResponse.json(allCategories);

      case 'media': {
        // Return local images from public/images
        try {
          const imagesDir = join(process.cwd(), 'public', 'images');
          const files = await readdir(imagesDir);
          const media = files.map((filename, i) => ({
            id: i + 1,
            filename,
            url: `/images/${filename}`,
            mimeType: 'image/jpeg',
            uploadedAt: new Date().toISOString()
          }));
          if (id) {
            const item = media.find(m => m.id.toString() === id);
            return NextResponse.json(item || { error: 'Not found' }, { status: item ? 200 : 404 });
          }
          return NextResponse.json(media);
        } catch {
          return NextResponse.json([]);
        }
      }

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Type and data are required' },
        { status: 400 }
      );
    }

    const index = getContentIndex() || { generatedAt: new Date().toISOString(), items: {} };
    const now = new Date().toISOString();

    switch (type) {
      case 'posts': {
        const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const postData = {
          slug,
          type: 'post' as const,
          title: data.title,
          description: data.excerpt || data.description || null,
          publishedAt: data.publishedAt || now,
          featuredImage: data.featuredImage || null,
          sourceUrl: `https://financialedge.com.ng/${slug}/`,
          section: data.categories?.[0] || 'Uncategorized',
          sectionSlug: (data.categories?.[0] || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          html: data.content || '',
          status: data.status || 'draft',
          author: data.author || 'admin',
          tags: data.tags || [],
        };

        await writeItemFile('posts', slug, postData);
        
        index.items[slug] = {
          slug,
          type: 'post',
          title: postData.title,
          description: postData.description,
          publishedAt: postData.publishedAt,
          featuredImage: postData.featuredImage,
          sourceUrl: postData.sourceUrl,
          section: postData.section,
          sectionSlug: postData.sectionSlug,
        };
        await writeContentIndex(index);

        return NextResponse.json(postData, { status: 201 });
      }

      case 'pages': {
        const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const pageData = {
          slug,
          type: 'page' as const,
          title: data.title,
          description: data.description || null,
          publishedAt: data.publishedAt || now,
          featuredImage: data.featuredImage || null,
          sourceUrl: `https://financialedge.com.ng/${slug}/`,
          section: data.section || 'Pages',
          sectionSlug: (data.section || 'pages').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          html: data.content || '',
          status: data.status || 'draft',
        };

        await writeItemFile('pages', slug, pageData);
        
        index.items[slug] = {
          slug,
          type: 'page',
          title: pageData.title,
          description: pageData.description,
          publishedAt: pageData.publishedAt,
          featuredImage: pageData.featuredImage,
          sourceUrl: pageData.sourceUrl,
          section: pageData.section,
          sectionSlug: pageData.sectionSlug,
        };
        await writeContentIndex(index);

        return NextResponse.json(pageData, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return NextResponse.json(
        { error: 'Type, ID, and data are required' },
        { status: 400 }
      );
    }

    const index = getContentIndex();
    if (!index) {
      return NextResponse.json({ error: 'No content found' }, { status: 404 });
    }

    const existingItem = index.items[id] as any;
    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    switch (type) {
      case 'posts': {
        const updatedPost = {
          ...existingItem,
          title: data.title || existingItem.title,
          description: data.excerpt || data.description || existingItem.description,
          featuredImage: data.featuredImage !== undefined ? data.featuredImage : existingItem.featuredImage,
          html: data.content || existingItem.html,
          section: data.categories?.[0] || existingItem.section,
          sectionSlug: (data.categories?.[0] || existingItem.section || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: data.status || 'draft',
        };

        await writeItemFile('posts', id, updatedPost);
        index.items[id] = { ...existingItem, ...updatedPost };
        await writeContentIndex(index);

        return NextResponse.json(updatedPost);
      }

      case 'pages': {
        const updatedPage = {
          ...existingItem,
          title: data.title || existingItem.title,
          description: data.description || existingItem.description,
          featuredImage: data.featuredImage !== undefined ? data.featuredImage : existingItem.featuredImage,
          html: data.content || existingItem.html,
          section: data.section || existingItem.section,
          sectionSlug: (data.section || existingItem.section || 'pages').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: data.status || 'draft',
        };

        await writeItemFile('pages', id, updatedPage);
        index.items[id] = { ...existingItem, ...updatedPage };
        await writeContentIndex(index);

        return NextResponse.json(updatedPage);
      }

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Type and ID are required' },
        { status: 400 }
      );
    }

    const index = getContentIndex();
    if (!index || !index.items[id]) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    switch (type) {
      case 'posts':
        await deleteItemFile('posts', id);
        delete index.items[id];
        await writeContentIndex(index);
        return NextResponse.json({ success: true });

      case 'pages':
        await deleteItemFile('pages', id);
        delete index.items[id];
        await writeContentIndex(index);
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
