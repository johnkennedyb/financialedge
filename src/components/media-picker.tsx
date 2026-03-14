"use client";

import { useState, useEffect } from "react";
import { getAllMedia } from "@/lib/admin-api";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  uploadedAt: string;
}

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");

  const loadMedia = async () => {
    try {
      setLoading(true);
      const wpMedia = await getAllMedia();

      if (!wpMedia || !Array.isArray(wpMedia)) {
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
      setFilteredFiles(formattedMedia);
    } catch (err) {
      console.error("Failed to load media:", err);
      setMediaFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFiles(mediaFiles);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = mediaFiles.filter(file =>
      file.name.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query)
    );
    setFilteredFiles(filtered);
  }, [searchQuery, mediaFiles]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", selectedFile);
      const res = await fetch("/api/admin/upload/cloudinary", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Upload failed");
      }
      const uploaded = await res.json();

      // Select the newly uploaded image
      onSelect(uploaded.url);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectFromLibrary = (url: string) => {
    onSelect(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl border border-border shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold">Select Media</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "library" ? "border-b-2 border-accent text-accent" : "text-muted hover:text-foreground"}`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "upload" ? "border-b-2 border-accent text-accent" : "text-muted hover:text-foreground"}`}
          >
            Upload New
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "library" ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 pl-10 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Media Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted">No media files found.</p>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="mt-2 text-accent hover:underline text-sm"
                  >
                    Upload new media
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredFiles.filter(f => f.type === "image").map((file) => (
                    <button
                      key={file.id}
                      onClick={() => handleSelectFromLibrary(file.url)}
                      className="group relative aspect-square rounded-lg border border-border overflow-hidden hover:border-accent transition-all"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs truncate">{file.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="media-picker-upload"
                />
                <label
                  htmlFor="media-picker-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <span className="text-4xl">📷</span>
                  <span className="text-sm font-medium">Click to select file</span>
                  <span className="text-xs text-muted">or drag and drop</span>
                </label>
              </div>

              {selectedFile && (
                <div className="space-y-2">
                  <p className="text-sm text-muted">Selected: {selectedFile.name}</p>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-modern w-full disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Upload and Select"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-border bg-secondary px-4 py-2 hover:bg-secondary/80">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
