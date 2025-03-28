// app/api/auth/admin/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json();

    // Verify admin password against MongoDB
    const isValid = await mongoDBService.verifyAdminPassword(passcode);

    if (isValid) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Error in admin authentication:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
