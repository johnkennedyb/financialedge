"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deletePage, getAllPages } from "@/lib/admin-api";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft" | "scheduled";
  author: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "scheduled">("all");

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        setError(null);
        const wpPages = await getAllPages();

        const formattedPages = wpPages.map((page: any) => ({
          id: page.id?.toString?.() ?? String(page.slug ?? page.id ?? ""),
          title: String(page.title ?? page.slug ?? "Untitled"),
          slug: page.slug,
          status: (page.status === "publish" ? "published" : page.status) as "published" | "draft" | "scheduled",
          author: page.author || "Unknown",
          publishedAt: page.createdAt ? String(page.createdAt).split("T")[0] : "",
          updatedAt: page.updatedAt ? String(page.updatedAt).split("T")[0] : "",
          excerpt: String(page.excerpt ?? ""),
        }));

        setPages(formattedPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load pages");
        console.error("Pages error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    try {
      await deletePage(id);
      setPages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading pages</p>
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
          <p className="text-muted">Loading pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted">Manage your website pages</p>
        </div>
        <Link href="/admin/pages/new" className="btn-modern">
          <span className="mr-2">➕</span> New Page
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Pages Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-secondary/30">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{page.title}</p>
                      <p className="text-sm text-muted line-clamp-1">{page.excerpt}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : page.status === "draft"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{page.author}</td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {page.publishedAt || page.updatedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/pages/${page.id}/edit`}
                        className="text-accent hover:text-accent/80 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${page.title}"?`)) {
                            handleDelete(page.id);
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

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No pages found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
