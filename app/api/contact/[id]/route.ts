// app/api/contact/[id]/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

/**
 * GET handler for retrieving a single contact submission by ID
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const contact = await mongoDBService.getContactById(id);

    if (!contact) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error: any) {
    console.error(`Error fetching contact with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a contact submission
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const data = await request.json();

    const updatedContact = await mongoDBService.updateContact(id, data);

    if (!updatedContact) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContact);
  } catch (error: any) {
    console.error(`Error updating contact with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing a contact submission
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Await params before destructuring
    const id = params.id;
    const success = await mongoDBService.deleteContact(id);

    if (!success) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact submission deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting contact with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
