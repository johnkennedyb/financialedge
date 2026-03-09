"use client";

import { useState, useEffect } from "react";

interface Advert {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  position: "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";
  status: "active" | "inactive";
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  clickCount: number;
  impressionCount: number;
}

const positionLabels: Record<string, string> = {
  homepage_hero: "Homepage Hero",
  homepage_sidebar: "Homepage Sidebar",
  footer: "Footer",
  sidebar: "Sidebar",
  inline: "Inline Content",
};

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState<Advert | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    position: "sidebar" as Advert["position"],
    status: "active" as "active" | "inactive",
    startDate: "",
    endDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAdverts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/adverts");
      if (!res.ok) throw new Error("Failed to load adverts");
      const data = await res.json();
      setAdverts(data.adverts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load adverts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdverts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const url = editingAdvert
        ? `/api/admin/adverts?id=${editingAdvert.id}`
        : "/api/admin/adverts";
      const method = editingAdvert ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate || null,
          endDate: formData.endDate || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save advert");

      setShowForm(false);
      setEditingAdvert(null);
      resetForm();
      loadAdverts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save advert");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this advert?")) return;
    try {
      const res = await fetch(`/api/admin/adverts?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete advert");
      loadAdverts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete advert");
    }
  };

  const handleEdit = (advert: Advert) => {
    setEditingAdvert(advert);
    setFormData({
      title: advert.title,
      description: advert.description || "",
      imageUrl: advert.imageUrl || "",
      linkUrl: advert.linkUrl || "",
      position: advert.position,
      status: advert.status,
      startDate: advert.startDate ? advert.startDate.split("T")[0] : "",
      endDate: advert.endDate ? advert.endDate.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      position: "sidebar",
      status: "active",
      startDate: "",
      endDate: "",
    });
  };

  const handleNew = () => {
    setEditingAdvert(null);
    resetForm();
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advertisements</h1>
          <p className="text-muted">Manage website adverts and promotions</p>
        </div>
        <button onClick={handleNew} className="btn-modern">
          + New Advert
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive text-destructive px-4 py-3">
          {error}
        </div>
      )}

      {/* Advert Form */}
      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingAdvert ? "Edit Advert" : "New Advert"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link URL (optional)</label>
                <input
                  type="url"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                          const res = await fetch('/api/admin/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          if (res.ok) {
                            const data = await res.json();
                            setFormData(prev => ({ ...prev, imageUrl: data.url }));
                          }
                        } catch (err) {
                          console.error('Upload failed:', err);
                        }
                      }
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  />
                </div>
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position *</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value as Advert["position"] })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  required
                >
                  <option value="homepage_hero">Homepage Hero</option>
                  <option value="homepage_sidebar">Homepage Sidebar</option>
                  <option value="footer">Footer</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="inline">Inline Content</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="btn-modern"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : editingAdvert ? "Update Advert" : "Create Advert"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingAdvert(null); }}
                className="rounded-lg border border-border bg-secondary px-4 py-2 hover:bg-secondary/80"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Adverts List */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase">Advert</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase">Stats</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {adverts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No adverts yet. Create your first advert to get started.
                  </td>
                </tr>
              ) : (
                adverts.map((advert) => (
                  <tr key={advert.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {advert.imageUrl && (
                          <img
                            src={advert.imageUrl}
                            alt={advert.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{advert.title}</p>
                          <p className="text-xs text-muted truncate max-w-xs">
                            {advert.linkUrl}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                        {positionLabels[advert.position] || advert.position}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${advert.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-gray-500/10 text-gray-500"
                          }`}
                      >
                        {advert.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted">
                      <div className="text-xs">
                        <span className="text-accent">{advert.clickCount}</span> clicks
                        <br />
                        <span className="text-accent">{advert.impressionCount}</span> impressions
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(advert)}
                          className="text-accent hover:text-accent/80 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(advert.id)}
                          className="text-destructive hover:text-destructive/80 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Position Guide */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Advert Position Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-medium text-accent">Homepage Hero</p>
            <p className="text-muted mt-1">Large banner at the top of homepage below hero section</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-medium text-accent">Homepage Sidebar</p>
            <p className="text-muted mt-1">Sidebar placement on homepage alongside content</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-medium text-accent">Footer</p>
            <p className="text-muted mt-1">Advert section in the website footer</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-medium text-accent">Sidebar</p>
            <p className="text-muted mt-1">General sidebar placement on article/category pages</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-medium text-accent">Inline Content</p>
            <p className="text-muted mt-1">Embedded within article content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
