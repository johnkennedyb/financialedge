"use client";

import { useState, useEffect } from "react";
import { getAnalytics } from "@/lib/admin-api";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  facebookUrl: string;
  xUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  enableComments: boolean;
  maintenanceMode: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: "Financial EDGE",
  siteDescription: "Nigeria's most reliable financial newsletter",
  contactEmail: "fosety@yahoo.com",
  contactPhone: "+234 803 440 2525",
  facebookUrl: "https://facebook.com/financialedge",
  xUrl: "https://x.com/financialedge",
  youtubeUrl: "https://youtube.com/financialedge",
  tiktokUrl: "https://tiktok.com/@financialedge",
  enableComments: false,
  maintenanceMode: false,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalPages: 0,
    totalCategories: 0,
    totalMedia: 0,
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    getAnalytics().then((data) => {
      setStats({
        totalPosts: data.totalPosts || 0,
        totalPages: data.totalPages || 0,
        totalCategories: data.totalCategories || 0,
        totalMedia: data.totalMedia || 0,
      });
    }).catch(console.error);

    const saved = localStorage.getItem("siteSettings");
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted">Configure your site settings and preferences</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted">Total Posts</p>
          <p className="text-2xl font-bold">{stats.totalPosts}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted">Total Pages</p>
          <p className="text-2xl font-bold">{stats.totalPages}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted">Categories</p>
          <p className="text-2xl font-bold">{stats.totalCategories}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted">Media Files</p>
          <p className="text-2xl font-bold">{stats.totalMedia}</p>
        </div>
      </div>

      <div className="border-b border-border">
        <nav className="flex gap-6">
          {[
            { id: "general", label: "General", icon: "⚙️" },
            { id: "social", label: "Social Media", icon: "🔗" },
            { id: "advanced", label: "Advanced", icon: "🔧" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">General Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => updateSetting("siteName", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSetting("contactEmail", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting("siteDescription", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => updateSetting("contactPhone", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Social Media Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Facebook URL</label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => updateSetting("facebookUrl", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">X (Twitter) URL</label>
                <input
                  type="url"
                  value={settings.xUrl}
                  onChange={(e) => updateSetting("xUrl", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) => updateSetting("youtubeUrl", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TikTok URL</label>
                <input
                  type="url"
                  value={settings.tiktokUrl}
                  onChange={(e) => updateSetting("tiktokUrl", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Advanced Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Enable Comments</p>
                  <p className="text-sm text-muted">Allow users to comment on posts</p>
                </div>
                <button
                  onClick={() => updateSetting("enableComments", !settings.enableComments)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.enableComments ? "bg-accent" : "bg-muted"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.enableComments ? "translate-x-6" : ""}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted">Show maintenance page to visitors</p>
                </div>
                <button
                  onClick={() => updateSetting("maintenanceMode", !settings.maintenanceMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.maintenanceMode ? "bg-red-500" : "bg-muted"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.maintenanceMode ? "translate-x-6" : ""}`} />
                </button>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/50">
                <p className="font-medium mb-2">Cloudinary Configuration</p>
                <p className="text-sm text-muted mb-2">Cloud name: dw7w2at8k</p>
                <p className="text-xs text-muted">Configured in .env.local</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
          <button onClick={handleSave} className="btn-modern bg-accent">
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-green-600">Settings saved successfully</span>}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/posts" className="p-4 rounded-lg border border-border hover:border-accent transition-colors text-center">
            <span className="text-2xl mb-2 block">📝</span>
            <span className="text-sm font-medium">Manage Posts</span>
          </a>
          <a href="/admin/pages" className="p-4 rounded-lg border border-border hover:border-accent transition-colors text-center">
            <span className="text-2xl mb-2 block">📄</span>
            <span className="text-sm font-medium">Manage Pages</span>
          </a>
          <a href="/admin/media" className="p-4 rounded-lg border border-border hover:border-accent transition-colors text-center">
            <span className="text-2xl mb-2 block">🖼️</span>
            <span className="text-sm font-medium">Media Library</span>
          </a>
          <a href="/" target="_blank" className="p-4 rounded-lg border border-border hover:border-accent transition-colors text-center">
            <span className="text-2xl mb-2 block">🌐</span>
            <span className="text-sm font-medium">View Site</span>
          </a>
        </div>
      </div>
    </div>
  );
}
