"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAnalytics } from "@/lib/admin-api";

interface DashboardStats {
  totalPosts: number;
  totalPages: number;
  totalCategories: number;
  totalMedia: number;
  recentActivity: Array<{
    id: string;
    type: "post" | "page" | "media";
    title: string;
    date: string;
    status: "published" | "draft" | "updated";
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalPages: 0,
    totalCategories: 0,
    totalMedia: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAnalytics();

        // Process recent activity from real data
        const recentActivity = [
          ...data.posts.slice(0, 3).map((post: any) => ({
            id: post.slug?.toString?.() ?? post.slug ?? post.id?.toString?.() ?? String(post.id ?? ""),
            type: "post" as const,
            title: String(post.title ?? post.slug ?? "Untitled").replace(/<[^>]*>/g, ""),
            date: String(post.publishedAt ?? post.date ?? "").split("T")[0],
            status: (post.status ?? "updated") as "published" | "draft" | "updated",
          })),
          ...data.pages.slice(0, 2).map((page: any) => ({
            id: page.slug?.toString?.() ?? page.slug ?? page.id?.toString?.() ?? String(page.id ?? ""),
            type: "page" as const,
            title: String(page.title ?? page.slug ?? "Untitled").replace(/<[^>]*>/g, ""),
            date: String(page.publishedAt ?? page.date ?? "").split("T")[0],
            status: (page.status ?? "updated") as "published" | "draft" | "updated",
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        setStats({
          totalPosts: data.totalPosts,
          totalPages: data.totalPages,
          totalCategories: data.totalCategories,
          totalMedia: data.totalMedia,
          recentActivity,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading dashboard</p>
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
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted">Welcome to the FinancialEDGE Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Posts</p>
              <p className="text-2xl font-bold">{stats.totalPosts}</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Pages</p>
              <p className="text-2xl font-bold">{stats.totalPages}</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Categories</p>
              <p className="text-2xl font-bold">{stats.totalCategories}</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <span className="text-2xl">🏷️</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Media Files</p>
              <p className="text-2xl font-bold">{stats.totalMedia}</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <span className="text-2xl">🖼️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {activity.type === "post" ? "📝" : activity.type === "page" ? "📄" : "🖼️"}
                </span>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted">{activity.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.status === "published"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : activity.status === "draft"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/posts/new" className="btn-modern text-center">
            <span className="mr-2">➕</span> New Post
          </Link>
          <Link href="/admin/media" className="btn-modern text-center">
            <span className="mr-2">📤</span> Upload Media
          </Link>
          <Link href="/admin/analytics" className="btn-modern text-center">
            <span className="mr-2">📊</span> View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
