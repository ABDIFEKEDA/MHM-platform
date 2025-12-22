import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    // Forward to Node backend
    const res = await fetch(process.env.NODE_ENDPOINT ?? "http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ reply: "Error contacting backend." }, { status: 500 });
  }
}
