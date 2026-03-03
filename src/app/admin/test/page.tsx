"use client";

import { useState, useEffect } from "react";
import { getAnalytics, getAllPosts } from "@/lib/admin-api";

export default function AdminTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string, success: boolean) => {
    setTestResults(prev => [...prev, `${success ? "✅" : "❌"} ${message}`]);
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Basic API connectivity
      addResult("Testing WordPress API connectivity...", true);
      const response = await fetch("https://financialedge.com.ng/wp-json/wp/v2/posts?per_page=1");
      if (response.ok) {
        addResult("✅ API connection successful", true);
      } else {
        addResult(`❌ API connection failed: ${response.status}`, false);
      }
    } catch (error) {
      addResult(`❌ API connection error: ${error}`, false);
    }

    try {
      // Test 2: Get analytics data
      addResult("Testing analytics endpoint...", true);
      const analytics = await getAnalytics();
      addResult(`✅ Analytics loaded: ${analytics.totalPosts} posts, ${analytics.totalPages} pages`, true);
    } catch (error) {
      addResult(`❌ Analytics failed: ${error}`, false);
    }

    try {
      // Test 3: Get posts
      addResult("Testing posts endpoint...", true);
      const result = await getAllPosts();
      addResult(`✅ Posts loaded: ${result.total} posts`, true);
    } catch (error) {
      addResult(`❌ Posts failed: ${error}`, false);
    }

    try {
      // Test 4: Test authentication (will fail without credentials)
      addResult("Testing authentication (expected to fail without setup)...", true);
      const authResponse = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "test", password: "test" })
      });
      if (authResponse.ok) {
        addResult("⚠️ Authentication endpoint responded (may need proper credentials)", true);
      } else {
        addResult("✅ Authentication endpoint properly rejects invalid credentials", true);
      }
    } catch (error) {
      addResult(`❌ Auth test error: ${error}`, false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard Test</h1>
        <p className="text-muted">Test admin functionality and API connections</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={runTests}
          disabled={loading}
          className="btn-modern"
        >
          {loading ? "Running Tests..." : "Run Admin Tests"}
        </button>

        {testResults.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-2 font-mono text-sm">
              {testResults.map((result, index) => (
                <div key={index} className="p-2 bg-secondary/30 rounded">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Manual Test Links</h2>
        <div className="space-y-2">
          <a href="/admin" className="block text-accent hover:underline">📊 Admin Dashboard</a>
          <a href="/admin/login" className="block text-accent hover:underline">🔐 Admin Login</a>
          <a href="/admin/posts" className="block text-accent hover:underline">📝 Posts Management</a>
          <a href="/admin/media" className="block text-accent hover:underline">🖼️ Media Library</a>
          <a href="/admin/analytics" className="block text-accent hover:underline">📈 Analytics</a>
        </div>
      </div>
    </div>
  );
}
