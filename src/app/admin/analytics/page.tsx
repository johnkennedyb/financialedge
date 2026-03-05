"use client";

import { useState, useEffect } from "react";

interface RealAnalyticsData {
  totalPosts: number;
  totalPages: number;
  totalCategories: number;
  totalMedia: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<RealAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/admin/local?type=analytics");
        if (!response.ok) {
          throw new Error("Failed to load analytics");
        }
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-accent hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate some derived statistics
  const totalContent = data.totalPosts + data.totalPages;
  const avgPostsPerCategory = data.totalCategories > 0
    ? Math.round(data.totalPosts / data.totalCategories)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted">Real-time website statistics from your database</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent/10 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Content Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted">Total Posts</p>
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-3xl font-bold">{data.totalPosts.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">Articles published</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted">Total Pages</p>
            <span className="text-2xl">📄</span>
          </div>
          <p className="text-3xl font-bold">{data.totalPages.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">Static pages</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted">Categories</p>
            <span className="text-2xl">🏷️</span>
          </div>
          <p className="text-3xl font-bold">{data.totalCategories.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">~{avgPostsPerCategory} posts each</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted">Media Files</p>
            <span className="text-2xl">🖼️</span>
          </div>
          <p className="text-3xl font-bold">{data.totalMedia.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">Images uploaded</p>
        </div>
      </div>

      {/* Total Content Summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Total Content</h2>
            <p className="text-muted">All posts and pages combined</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-accent">{totalContent.toLocaleString()}</p>
            <p className="text-sm text-muted">items in database</p>
          </div>
        </div>
      </div>

      {/* Top Pages (if available) */}
      {data.topPages && data.topPages.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Most Viewed Pages</h2>
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted">#{index + 1}</span>
                  <p className="font-medium truncate max-w-md">{page.path}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{page.views.toLocaleString()}</p>
                  <p className="text-sm text-muted">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-2">📊 About These Analytics</h2>
        <p className="text-muted text-sm">
          These statistics are pulled directly from your PostgreSQL database and reflect the actual
          content stored in your CMS. For detailed visitor analytics (page views, traffic sources, etc.),
          please connect Google Analytics in your SEO settings.
        </p>
      </div>
    </div>
  );
}
