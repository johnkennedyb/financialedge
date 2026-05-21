import { NextRequest, NextResponse } from "next/server";
import { getAdvertById, recordAdvertEvent } from "@/lib/adverts";

// GET /api/adverts/click?id=xxx
// Records a click and redirects to the advert's link URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Advert ID is required" },
        { status: 400 }
      );
    }

    const advert = await getAdvertById(id);

    if (!advert) {
      return NextResponse.json(
        { error: "Advert not found" },
        { status: 404 }
      );
    }

    // Record the click event with metadata
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || "";

    await recordAdvertEvent(id, "click", {
      ip: ip.split(",")[0].trim(),
      userAgent,
      referrer,
    });

    // If the advert has a link URL, redirect to it
    if (advert.linkUrl) {
      return NextResponse.redirect(advert.linkUrl, 302);
    }

    // No link URL — return a simple message
    return NextResponse.json(
      { message: "Click recorded, but no link URL is set for this advert" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error tracking advert click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}
