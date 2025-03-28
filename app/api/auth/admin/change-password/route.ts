// app/api/auth/admin/change-password/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Password complexity check
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Change password in database
    const success = await mongoDBService.changeAdminPassword(
      currentPassword,
      newPassword
    );

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Password changed successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error changing admin password:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
