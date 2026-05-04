import { NextRequest, NextResponse } from "next/server";
import { getActiveAdvertsByPosition } from "@/lib/adverts";

// GET /api/adverts?position=homepage_hero
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get("position") as "homepage_hero" | "homepage_sidebar" | "footer" | "sidebar" | "inline";

    if (!position) {
      return NextResponse.json(
        { error: "Position is required" },
        { status: 400 }
      );
    }

    const adverts = await getActiveAdvertsByPosition(position);
    return NextResponse.json({ adverts });
  } catch (error) {
    console.error("Error fetching adverts:", error);
    return NextResponse.json(
      { error: "Failed to fetch adverts" },
      { status: 500 }
    );
  }
}
