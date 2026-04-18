import { NextResponse } from "next/server";
import { guestbookEntries, GuestbookEntry } from "@/data/guestbook";

export async function GET() {
  return NextResponse.json(guestbookEntries);
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    const newEntry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    // Add to beginning of array
    guestbookEntries.unshift(newEntry);

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
