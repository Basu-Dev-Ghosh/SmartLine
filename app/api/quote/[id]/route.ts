// app/api/quote/[id]/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for retrieving a single quote submission by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const quote = await mongoDBService.getQuoteById(id);

    if (!quote) {
      return NextResponse.json(
        { error: "Quote submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quote);
  } catch (error: any) {
    console.error(`Error fetching quote with ID ${id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a quote submission
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = await request.json();

    const updatedQuote = await mongoDBService.updateQuote(id, data);

    if (!updatedQuote) {
      return NextResponse.json(
        { error: "Quote submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedQuote);
  } catch (error: any) {
    console.error(`Error updating quote with ID ${id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing a quote submission
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const success = await mongoDBService.deleteQuote(id);

    if (!success) {
      return NextResponse.json(
        { error: "Quote submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote submission deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting quote with ID ${id}:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
