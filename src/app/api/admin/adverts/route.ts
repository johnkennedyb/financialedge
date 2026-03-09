import { NextRequest, NextResponse } from "next/server";
import { getAllAdverts, createAdvert, updateAdvert, deleteAdvert, getAdvertById } from "@/lib/adverts";

// GET /api/admin/adverts - List all adverts
export async function GET() {
  try {
    const adverts = await getAllAdverts();
    return NextResponse.json({ adverts });
  } catch (error) {
    console.error("Error fetching adverts:", error);
    return NextResponse.json(
      { error: "Failed to fetch adverts" },
      { status: 500 }
    );
  }
}

// POST /api/admin/adverts - Create new advert
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.position) {
      return NextResponse.json(
        { error: "Title and position are required" },
        { status: 400 }
      );
    }

    const advert = await createAdvert({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      linkUrl: body.linkUrl,
      position: body.position,
      status: body.status || "active",
      startDate: body.startDate,
      endDate: body.endDate,
    });

    return NextResponse.json({ advert }, { status: 201 });
  } catch (error) {
    console.error("Error creating advert:", error);
    return NextResponse.json(
      { error: "Failed to create advert" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/adverts?id=xxx - Update advert
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Advert ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const advert = await updateAdvert(id, body);

    if (!advert) {
      return NextResponse.json(
        { error: "Advert not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ advert });
  } catch (error) {
    console.error("Error updating advert:", error);
    return NextResponse.json(
      { error: "Failed to update advert" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/adverts?id=xxx - Delete advert
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Advert ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteAdvert(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Advert not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting advert:", error);
    return NextResponse.json(
      { error: "Failed to delete advert" },
      { status: 500 }
    );
  }
}
