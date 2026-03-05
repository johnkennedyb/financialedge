"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPost, getAllCategories } from "@/lib/admin-api";

export default function NewPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "publish" | "scheduled",
    publishedAt: "",
    featuredImage: "",
    tags: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats.map((cat: any) => ({ name: cat.name, slug: cat.slug })));
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const response = await fetch("/api/admin/upload/cloudinary", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Upload failed");
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, featuredImage: result.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, featuredImage: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (status: "draft" | "publish") => {
    setSaving(true);
    setError(null);

    try {
      // Find category ID from name
      const categoryId = formData.category; // In real implementation, map name to ID

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        status: status,
        categories: formData.category ? [categories.find(c => c.name === formData.category)?.slug || formData.category] : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        author: 'admin', // Default author
        featuredImage: formData.featuredImage,
      };

      await createPost(postData);
      router.push("/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Post</h1>
          <p className="text-muted">Create a new blog post</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSave("publish")}
            disabled={saving}
            className="btn-modern"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter post title..."
            className="w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2">URL Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="post-url-slug"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief description of the post..."
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            rows={12}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
          />
        </div>

        {/* Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loadingCategories}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <div className="space-y-3">
            {formData.featuredImage ? (
              <div className="relative w-full max-w-md">
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="featured-image-upload"
                />
                <label
                  htmlFor="featured-image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                      <span className="text-muted">Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl">📷</span>
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-muted">or drag and drop</span>
                      <span className="text-xs text-muted">JPG, PNG, GIF up to 10MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
            {formData.featuredImage && (
              <p className="text-xs text-muted break-all">{formData.featuredImage}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tag1, tag2, tag3"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-sm text-muted mt-1">Separate tags with commas</p>
        </div>

        {/* Publish Date (for scheduled posts) */}
        {formData.status === "scheduled" && (
          <div>
            <label className="block text-sm font-medium mb-2">Publish Date</label>
            <input
              type="datetime-local"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
