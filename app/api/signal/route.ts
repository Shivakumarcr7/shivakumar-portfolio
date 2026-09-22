import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string; email?: string };
    const message = body.message?.trim();
    const email = body.email?.trim();

    if (!message) {
      return NextResponse.json({ ok: false, error: "Message is required." }, { status: 400 });
    }

    // The UI is intentionally ready for an email provider/webhook later.
    // For now, Vercel/server logs capture the submitted signal without exposing it publicly.
    console.log("PORTFOLIO_SIGNAL", {
      message,
      email: email || null,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
