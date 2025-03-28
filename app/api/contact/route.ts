// app/api/contact/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create contact submission in database
    const result = await mongoDBService.createContactSubmission(data);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving contact submissions
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const query = searchParams.get("query");

    // If search query is provided, use search function
    if (query) {
      const results = await mongoDBService.searchContacts(query, page, limit);
      return NextResponse.json(results);
    }

    // Otherwise get paginated list
    const results = await mongoDBService.getContactSubmissions(page, limit);
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}



