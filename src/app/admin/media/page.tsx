"use client";

import { useState, useEffect } from "react";
import { deleteMedia, getAllMedia } from "@/lib/admin-api";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const [debugInfo, setDebugInfo] = useState<string>("");

  const loadMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo("Fetching media...");

      const wpMedia = await getAllMedia();
      setDebugInfo(`Fetched ${wpMedia?.length || 0} items from API`);

      if (!wpMedia || !Array.isArray(wpMedia)) {
        setDebugInfo("Invalid response format from API");
        setMediaFiles([]);
        return;
      }

      const formattedMedia: MediaFile[] = wpMedia.map((media: any) => {
        const mime = String(media.mimeType ?? "");
        const type: MediaFile["type"] = mime.startsWith("image/")
          ? "image"
          : mime.startsWith("video/")
            ? "video"
            : "document";

        return {
          id: String(media.id ?? ""),
          name: String(media.originalName ?? media.filename ?? "Untitled"),
          url: String(media.url ?? ""),
          type,
          size: Number(media.size ?? 0),
          uploadedAt: String(media.uploadedAt ?? "").split("T")[0],
        };
      });

      setMediaFiles(formattedMedia);
      setDebugInfo(`Displaying ${formattedMedia.length} media files`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to load media";
      setError(errorMsg);
      setDebugInfo(`Error: ${errorMsg}`);
      console.error("Media error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [lastRefresh]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", selectedFile);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Upload failed");
      }
      const uploaded = await res.json();
      const newMedia: MediaFile = {
        id: String(uploaded.id),
        name: String(uploaded.originalName ?? uploaded.filename ?? selectedFile.name),
        url: String(uploaded.url ?? ""),
        type: selectedFile.type.startsWith("image/") ? "image" : selectedFile.type.startsWith("video/") ? "video" : "document",
        size: Number(uploaded.size ?? selectedFile.size),
        uploadedAt: String(uploaded.uploadedAt ?? new Date().toISOString()).split("T")[0],
      };

      setMediaFiles((prev) => [newMedia, ...prev]);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id);
      setMediaFiles(prev => prev.filter(file => file.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading media</p>
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
          <p className="text-muted">Loading media library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted">Manage your images, videos, and documents</p>
          <p className="text-xs text-muted mt-1">Last updated: {lastRefresh.toLocaleTimeString()}</p>
          {debugInfo && (
            <p className="text-xs text-accent mt-1">Debug: {debugInfo}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLastRefresh(new Date())}
            disabled={loading}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary disabled:opacity-50"
          >
            {loading ? "Loading..." : "🔄 Refresh"}
          </button>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary"
          >
            {view === "grid" ? "📋 List" : "🖼️ Grid"}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Upload New Media</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={handleFileSelect}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-accent file:text-accent-foreground hover:file:bg-accent/90"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="btn-modern disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {selectedFile && (
          <div className="mt-4 text-sm text-muted">
            Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </div>
        )}
      </div>

      {/* Media Files */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaFiles.map((file) => (
            <div key={file.id} className="rounded-xl border border-border bg-card overflow-hidden group hover:shadow-elevated transition-all">
              <div className="aspect-video bg-secondary/20 relative">
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-3xl">
                      {file.type === "video" ? "🎥" : "📄"}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">{file.name}</h3>
                <p className="text-sm text-muted">{formatFileSize(file.size)}</p>
                <p className="text-xs text-muted">{file.uploadedAt}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button className="text-accent hover:text-accent/80 text-sm font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="text-destructive hover:text-destructive/80 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mediaFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-secondary/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {file.type === "image" ? "🖼️" : file.type === "video" ? "🎥" : "📄"}
                        </span>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          {file.dimensions && (
                            <p className="text-sm text-muted">
                              {file.dimensions.width} × {file.dimensions.height}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent capitalize">
                        {file.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{formatFileSize(file.size)}</td>
                    <td className="px-6 py-4 text-sm text-muted">{file.uploadedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-accent hover:text-accent/80 text-sm font-medium">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
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
      )}

      {mediaFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No media files found.</p>
        </div>
      )}
    </div>
  );
}
