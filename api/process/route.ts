import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Simulate saving to database or backend
  if (body?.name) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "نام وارد نشده است" }, { status: 400 });
}
