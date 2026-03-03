"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  pageViews: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    trend: "up" | "down" | "stable";
  };
  topPosts: Array<{
    id: string;
    title: string;
    views: number;
    category: string;
  }>;
  trafficSources: Array<{
    source: string;
    percentage: number;
    count: number;
  }>;
  popularCategories: Array<{
    category: string;
    views: number;
    posts: number;
  }>;
  dailyViews: Array<{
    date: string;
    views: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setData({
          pageViews: {
            total: 45832,
            today: 1247,
            thisWeek: 8234,
            thisMonth: 32156,
            trend: "up"
          },
          topPosts: [
            { id: "1", title: "Market Analysis: Q1 2025 Outlook", views: 3421, category: "Market Analysis" },
            { id: "2", title: "Investment Strategies for Beginners", views: 2897, category: "Investment" },
            { id: "3", title: "Tech Stocks: What to Watch", views: 2156, category: "Stocks" },
            { id: "4", title: "Cryptocurrency Trends 2025", views: 1876, category: "Cryptocurrency" },
            { id: "5", title: "Real Estate Investment Guide", views: 1654, category: "Real Estate" },
          ],
          trafficSources: [
            { source: "Direct", percentage: 42, count: 19249 },
            { source: "Search", percentage: 31, count: 14208 },
            { source: "Social", percentage: 18, count: 8250 },
            { source: "Referral", percentage: 6, count: 2750 },
            { source: "Other", percentage: 3, count: 1375 },
          ],
          popularCategories: [
            { category: "Market Analysis", views: 12456, posts: 12 },
            { category: "Investment", views: 9876, posts: 18 },
            { category: "Stocks", views: 8234, posts: 15 },
            { category: "Cryptocurrency", views: 6543, posts: 8 },
            { category: "Real Estate", views: 4321, posts: 6 },
          ],
          dailyViews: [
            { date: "2025-02-01", views: 987 },
            { date: "2025-02-02", views: 1234 },
            { date: "2025-02-03", views: 1156 },
            { date: "2025-02-04", views: 1342 },
            { date: "2025-02-05", views: 1456 },
            { date: "2025-02-06", views: 1234 },
            { date: "2025-02-07", views: 1567 },
          ],
        });
        setLoading(false);
      }, 1500);
    };

    loadAnalytics();
  }, [timeRange]);

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

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted">Track your website performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Page Views Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted">Total Views</p>
            <span className={`text-lg ${data.pageViews.trend === "up" ? "text-green-500" : data.pageViews.trend === "down" ? "text-red-500" : "text-yellow-500"}`}>
              {data.pageViews.trend === "up" ? "📈" : data.pageViews.trend === "down" ? "📉" : "➡️"}
            </span>
          </div>
          <p className="text-2xl font-bold">{data.pageViews.total.toLocaleString()}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted mb-2">Today</p>
          <p className="text-2xl font-bold">{data.pageViews.today.toLocaleString()}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted mb-2">This Week</p>
          <p className="text-2xl font-bold">{data.pageViews.thisWeek.toLocaleString()}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted mb-2">This Month</p>
          <p className="text-2xl font-bold">{data.pageViews.thisMonth.toLocaleString()}</p>
        </div>
      </div>

      {/* Top Posts */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performing Posts</h2>
        <div className="space-y-3">
          {data.topPosts.map((post, index) => (
            <div key={post.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-muted">#{index + 1}</span>
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted">{post.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{post.views.toLocaleString()}</p>
                <p className="text-sm text-muted">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
          <div className="space-y-3">
            {data.trafficSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {source.source === "Direct" ? "🔗" : 
                     source.source === "Search" ? "🔍" : 
                     source.source === "Social" ? "📱" : 
                     source.source === "Referral" ? "🔗" : "📊"}
                  </span>
                  <span className="font-medium">{source.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted w-12 text-right">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
          <div className="space-y-3">
            {data.popularCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{category.category}</p>
                  <p className="text-sm text-muted">{category.posts} posts</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{category.views.toLocaleString()}</p>
                  <p className="text-sm text-muted">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Views Chart Placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Daily Views Trend</h2>
        <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg">
          <p className="text-muted">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}
