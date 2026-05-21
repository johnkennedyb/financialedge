import { NextRequest, NextResponse } from "next/server";
import { recordAdvertEvent } from "@/lib/adverts";

// POST /api/adverts/track
// Body: { id: string, type: "impression" | "click" }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, type } = body;

    if (!id || !type) {
      return NextResponse.json(
        { error: "Advert ID and event type are required" },
        { status: 400 }
      );
    }

    if (type !== "impression" && type !== "click") {
      return NextResponse.json(
        { error: "Event type must be 'impression' or 'click'" },
        { status: 400 }
      );
    }

    // Only handle impressions here; clicks use /api/adverts/click for redirect
    if (type === "click") {
      return NextResponse.json(
        { error: "Use /api/adverts/click?id=xxx for click tracking with redirect" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || "";

    await recordAdvertEvent(id, type, {
      ip: ip.split(",")[0].trim(),
      userAgent,
      referrer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking advert event:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
