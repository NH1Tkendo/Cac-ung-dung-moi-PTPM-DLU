import { NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  guestbookEntries.splice(index, 1);

  return NextResponse.json({ success: true });
}
