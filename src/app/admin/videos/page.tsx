"use client";

import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string | null;
  status: string;
  position: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    status: "active",
    position: "homepage",
    sortOrder: 0,
  });

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openCreateModal = () => {
    setEditingVideo(null);
    setFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      status: "active",
      position: "homepage",
      sortOrder: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || "",
      youtubeUrl: video.youtubeUrl,
      status: video.status,
      position: video.position,
      sortOrder: video.sortOrder,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVideo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = editingVideo
        ? `/api/admin/videos?id=${editingVideo.id}`
        : "/api/admin/videos";
      const method = editingVideo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to save video");
      }

      await fetchVideos();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving video");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(`/api/admin/videos?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete video");
      await fetchVideos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting video");
    }
  };

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /youtube\.com\/shorts\/([^&\s?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Videos</h1>
          <p className="text-muted">Manage YouTube videos on your site</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
        >
          + Add Video
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-secondary">
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  ▶ Watch on YouTube
                </a>
              </div>
              {video.status === "inactive" && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Inactive
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2" title={video.title}>
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-muted line-clamp-2">
                  {video.description}
                </p>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted bg-secondary px-2 py-1 rounded">
                    {video.position}
                  </span>
                  <span className="text-xs text-muted">#{video.sortOrder}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(video)}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12 bg-secondary/30 rounded-xl border border-border">
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
          <p className="text-muted mb-4">Add YouTube videos to display on your site</p>
          <button
            onClick={openCreateModal}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Add Your First Video
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border border-border shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingVideo ? "Edit Video" : "Add New Video"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-muted hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* YouTube URL */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.youtubeUrl}
                    onChange={(e) => {
                      const url = e.target.value;
                      setFormData({ ...formData, youtubeUrl: url });
                    }}
                    placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  />
                  {formData.youtubeUrl && extractVideoId(formData.youtubeUrl) && (
                    <p className="text-xs text-green-500 mt-1">
                      ✓ Valid YouTube URL detected
                    </p>
                  )}
                  {formData.youtubeUrl && !extractVideoId(formData.youtubeUrl) && (
                    <p className="text-xs text-red-500 mt-1">
                      ✗ Invalid YouTube URL
                    </p>
                  )}
                </div>

                {/* Preview */}
                {formData.youtubeUrl && extractVideoId(formData.youtubeUrl) && (
                  <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractVideoId(formData.youtubeUrl)}`}
                      title="YouTube video preview"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Video title"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Optional description"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  />
                </div>

                {/* Position & Sort Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Position
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    >
                      <option value="homepage">Homepage</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="videos_page">Videos Page</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sortOrder: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-accent text-white px-4 py-2 hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingVideo
                      ? "Update Video"
                      : "Add Video"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
