// app/api/quote/route.ts
import { mongoDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler for quote form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, phone, company, productInterest, requirements } = data;
    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !productInterest ||
      !requirements
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create quote submission in database
    const result = await mongoDBService.createQuoteSubmission(data);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("Error in quote form submission:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving quote submissions
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const query = searchParams.get("query");

    // If search query is provided, use search function
    if (query) {
      const results = await mongoDBService.searchQuotes(query, page, limit);
      return NextResponse.json(results);
    }

    // Otherwise get paginated list
    const results = await mongoDBService.getQuoteSubmissions(page, limit);
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error fetching quote submissions:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
