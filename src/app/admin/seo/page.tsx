"use client";

import { useState, useEffect } from "react";
import { getSeoSettings, saveSeoSettings } from "@/lib/admin-api";

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  homeKeywords: string[];
  ogImage: string;
  twitterHandle: string;
  googleAnalytics: string;
  googleSearchConsole: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
  indexEnabled: boolean;
}

export default function SEOPage() {
  const [settings, setSettings] = useState<SEOSettings>({
    siteTitle: "Financial EDGE",
    siteDescription: "Your trusted source for financial news, market analysis, and investment insights",
    homeKeywords: ["finance", "business", "markets", "investment", "economy"],
    ogImage: "",
    twitterHandle: "",
    googleAnalytics: "",
    googleSearchConsole: "",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://financialedge.com.ng/sitemap.xml",
    sitemapEnabled: true,
    indexEnabled: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await getSeoSettings();
        if (saved) {
          setSettings((prev) => ({ ...prev, ...saved }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load SEO settings");
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k);
    setSettings(prev => ({ ...prev, homeKeywords: keywords }));
  };

  const handleToggle = (setting: keyof SEOSettings) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await saveSeoSettings(settings);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Settings</h1>
          <p className="text-muted">Manage your website's SEO configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-modern disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">SEO settings saved successfully!</p>
        </div>
      )}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive">{error}</p>
        </div>
      )}

      {/* Basic SEO Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Basic SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Title</label>
            <input
              type="text"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Appears in search engine results and browser tabs</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Meta description for your homepage (150-160 characters recommended)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Homepage Keywords</label>
            <input
              type="text"
              value={settings.homeKeywords.join(', ')}
              onChange={(e) => handleKeywordsChange(e.target.value)}
              placeholder="finance, business, markets, investment"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Separate keywords with commas</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Social Media & Open Graph</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default OG Image</label>
            <input
              type="url"
              name="ogImage"
              value={settings.ogImage}
              onChange={handleChange}
              placeholder="https://example.com/og-image.jpg"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">1200x630px recommended for best display</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Twitter Handle</label>
            <input
              type="text"
              name="twitterHandle"
              value={settings.twitterHandle}
              onChange={handleChange}
              placeholder="@financialedge"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Without the @ symbol</p>
          </div>
        </div>
      </div>

      {/* Analytics & Tracking */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics & Tracking</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
            <input
              type="text"
              name="googleAnalytics"
              value={settings.googleAnalytics}
              onChange={handleChange}
              placeholder="G-XXXXXXXXXX"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Google Analytics 4 measurement ID</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Google Search Console</label>
            <input
              type="text"
              name="googleSearchConsole"
              value={settings.googleSearchConsole}
              onChange={handleChange}
              placeholder="https://search.google.com/search-console"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Verification code or full URL</p>
          </div>
        </div>
      </div>

      {/* Technical SEO */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Technical SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Robots.txt</label>
            <textarea
              name="robotsTxt"
              value={settings.robotsTxt}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-muted mt-1">Instructions for search engine crawlers</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.sitemapEnabled}
                onChange={() => handleToggle('sitemapEnabled')}
                className="rounded border-border bg-background text-accent focus:ring-accent"
              />
              <div>
                <p className="font-medium">Enable XML Sitemap</p>
                <p className="text-sm text-muted">Automatically generate sitemap.xml</p>
              </div>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.indexEnabled}
                onChange={() => handleToggle('indexEnabled')}
                className="rounded border-border bg-background text-accent focus:ring-accent"
              />
              <div>
                <p className="font-medium">Allow Search Engine Indexing</p>
                <p className="text-sm text-muted">Let search engines index your content</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* SEO Tools */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">SEO Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80">
            📊 Generate SEO Report
          </button>
          <button className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80">
            🗺️ Update Sitemap
          </button>
          <button className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80">
            🔍 Test Robots.txt
          </button>
          <button className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/80">
            📱 Check Mobile SEO
          </button>
        </div>
      </div>
    </div>
  );
}
