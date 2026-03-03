import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // In production, validate against WordPress API or secure auth system
    // For now, using environment variables as credentials
    const ADMIN_USERNAME = process.env.WP_ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.WP_ADMIN_PASSWORD || "admin123";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
