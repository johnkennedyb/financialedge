import { NextRequest, NextResponse } from "next/server";
import { getAdvertDetailedReport } from "@/lib/adverts";

// GET /api/admin/adverts/report?id=xxx (optional)
// Returns detailed advert performance report(s)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || undefined;

    const reports = await getAdvertDetailedReport(id);

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Error generating advert report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
