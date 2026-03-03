// Client-side API functions that call the server-side API routes

export interface LocalPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'publish' | 'private' | 'trash';
  author: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  meta?: {
    description?: string;
    keywords?: string[];
  };
}

export interface LocalPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'publish' | 'private' | 'trash';
  author: string;
  createdAt: string;
  updatedAt: string;
  template?: string;
  meta?: {
    description?: string;
    keywords?: string[];
  };
}

export interface LocalCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalMedia {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  caption?: string;
  uploadedAt: string;
}

// API helper function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`/api/admin/local${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Posts
export async function getAllPosts(): Promise<LocalPost[]> {
  return apiCall('?type=posts');
}

export async function getPostById(id: string): Promise<LocalPost | null> {
  return apiCall(`?type=posts&id=${id}`);
}

export async function getPostBySlug(slug: string): Promise<LocalPost | null> {
  return apiCall(`?type=posts&slug=${slug}`);
}

export async function createPost(postData: Omit<LocalPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<LocalPost> {
  return apiCall('', {
    method: 'POST',
    body: JSON.stringify({ type: 'posts', data: postData }),
  });
}

export async function updatePost(id: string, updates: Partial<LocalPost>): Promise<LocalPost> {
  return apiCall('', {
    method: 'PUT',
    body: JSON.stringify({ type: 'posts', id, data: updates }),
  });
}

export async function deletePost(id: string): Promise<boolean> {
  await apiCall(`?type=posts&id=${id}`, { method: 'DELETE' });
  return true;
}

// Pages
export async function getAllPages(): Promise<LocalPage[]> {
  return apiCall('?type=pages');
}

export async function getPageById(id: string): Promise<LocalPage | null> {
  return apiCall(`?type=pages&id=${id}`);
}

export async function getPageBySlug(slug: string): Promise<LocalPage | null> {
  return apiCall(`?type=pages&slug=${slug}`);
}

export async function createPage(pageData: Omit<LocalPage, 'id' | 'createdAt' | 'updatedAt'>): Promise<LocalPage> {
  return apiCall('', {
    method: 'POST',
    body: JSON.stringify({ type: 'pages', data: pageData }),
  });
}

export async function updatePage(id: string, updates: Partial<LocalPage>): Promise<LocalPage> {
  return apiCall('', {
    method: 'PUT',
    body: JSON.stringify({ type: 'pages', id, data: updates }),
  });
}

export async function deletePage(id: string): Promise<boolean> {
  await apiCall(`?type=pages&id=${id}`, { method: 'DELETE' });
  return true;
}

// Categories
export async function getAllCategories(): Promise<LocalCategory[]> {
  return apiCall('?type=categories');
}

export async function getCategoryById(id: string): Promise<LocalCategory | null> {
  return apiCall(`?type=categories&id=${id}`);
}

export async function getCategoryBySlug(slug: string): Promise<LocalCategory | null> {
  return apiCall(`?type=categories&slug=${slug}`);
}

export async function createCategory(categoryData: Omit<LocalCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<LocalCategory> {
  return apiCall('', {
    method: 'POST',
    body: JSON.stringify({ type: 'categories', data: categoryData }),
  });
}

export async function updateCategory(id: string, updates: Partial<LocalCategory>): Promise<LocalCategory> {
  return apiCall('', {
    method: 'PUT',
    body: JSON.stringify({ type: 'categories', id, data: updates }),
  });
}

export async function deleteCategory(id: string): Promise<boolean> {
  await apiCall(`?type=categories&id=${id}`, { method: 'DELETE' });
  return true;
}

// Media
export async function getAllMedia(): Promise<LocalMedia[]> {
  return apiCall('?type=media');
}

export async function getMediaById(id: string): Promise<LocalMedia | null> {
  return apiCall(`?type=media&id=${id}`);
}

export async function createMedia(mediaData: Omit<LocalMedia, 'id' | 'uploadedAt'>): Promise<LocalMedia> {
  return apiCall('', {
    method: 'POST',
    body: JSON.stringify({ type: 'media', data: mediaData }),
  });
}

export async function deleteMedia(id: string): Promise<boolean> {
  await apiCall(`?type=media&id=${id}`, { method: 'DELETE' });
  return true;
}

export async function uploadMedia(file: File) {
  const form = new FormData();
  form.append('file', file);
  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Upload error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Analytics
export async function getAnalytics() {
  return apiCall('?type=analytics');
}

// SEO
export async function getSeoSettings() {
  return apiCall('?type=seo');
}

export async function saveSeoSettings(settings: any) {
  return apiCall('', {
    method: 'POST',
    body: JSON.stringify({ type: 'seo', data: settings }),
  });
}

// Additional helper functions for admin dashboard
export async function getPostsByStatus(status: LocalPost['status']) {
  const posts = await getAllPosts();
  return posts.filter(post => post.status === status);
}

export async function getPagesByStatus(status: LocalPage['status']) {
  const pages = await getAllPages();
  return pages.filter(page => page.status === status);
}

export async function searchPosts(query: string) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase())
  );
}

export async function searchPages(query: string) {
  const pages = await getAllPages();
  return pages.filter(page => 
    page.title.toLowerCase().includes(query.toLowerCase()) ||
    page.content.toLowerCase().includes(query.toLowerCase()) ||
    page.excerpt.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getRecentPosts(limit = 10) {
  const posts = await getAllPosts();
  return posts
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

export async function getRecentPages(limit = 10) {
  const pages = await getAllPages();
  return pages
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

export async function getPostsByCategory(categorySlug: string) {
  const posts = await getAllPosts();
  return posts.filter(post => post.categories.includes(categorySlug));
}

export async function duplicatePost(id: string) {
  const originalPost = await getPostById(id);
  if (!originalPost) return undefined;

  const duplicatedPost = await createPost({
    ...originalPost,
    title: `${originalPost.title} (Copy)`,
    slug: `${originalPost.slug}-copy`,
    status: 'draft',
  });

  return duplicatedPost;
}

export async function duplicatePage(id: string) {
  const originalPage = await getPageById(id);
  if (!originalPage) return undefined;

  const duplicatedPage = await createPage({
    ...originalPage,
    title: `${originalPage.title} (Copy)`,
    slug: `${originalPage.slug}-copy`,
    status: 'draft',
  });

  return duplicatedPage;
}
