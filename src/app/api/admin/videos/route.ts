import { NextRequest, NextResponse } from "next/server";
import { getAllVideos, createVideo, updateVideo, deleteVideo } from "@/lib/videos";

// GET /api/admin/videos - List all videos
export async function GET() {
  try {
    const videos = await getAllVideos();
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// POST /api/admin/videos - Create new video
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.youtubeUrl) {
      return NextResponse.json(
        { error: "Title and YouTube URL are required" },
        { status: 400 }
      );
    }

    const video = await createVideo({
      title: body.title,
      description: body.description,
      youtubeUrl: body.youtubeUrl,
      status: body.status || "active",
      position: body.position || "homepage",
      sortOrder: body.sortOrder || 0,
    });

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create video" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/videos?id=xxx - Update video
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const video = await updateVideo(id, body);

    return NextResponse.json({ video });
  } catch (error) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update video" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/videos?id=xxx - Delete video
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    await deleteVideo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
