"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteCategory, getAllCategories } from "@/lib/admin-api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const wpCategories = await getAllCategories();

        const formattedCategories = wpCategories.map((cat: any) => ({
          id: cat.id.toString(),
          name: cat.name,
          slug: cat.slug,
          description: cat.description || "",
          count: cat.count || 0,
        }));

        setCategories(formattedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
        console.error("Categories error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading categories</p>
          <p className="text-muted text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 btn-modern"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted">Manage your blog categories</p>
        </div>
        <Link href="/admin/categories/new" className="btn-modern">
          <span className="mr-2">➕</span> New Category
        </Link>
      </div>

      {/* Categories Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Post Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-secondary/30">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{category.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-secondary/30 px-2 py-1 rounded">
                      {category.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted line-clamp-2">
                      {category.description || "No description"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent font-medium">
                      {category.count} posts
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-accent hover:text-accent/80 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
                            handleDelete(category.id);
                          }
                        }}
                        className="text-destructive hover:text-destructive/80 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No categories found.</p>
        </div>
      )}
    </div>
  );
}
