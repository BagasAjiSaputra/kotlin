// src/app/api/control/route.ts
import { NextResponse } from "next/server";

let trigger = false;

/**
 * GET → Dipanggil ESP32
 * Jika trigger = true → langsung reset setelah dibaca
 */
export async function GET() {
  const current = trigger;

  // auto-reset setelah dibaca
  if (trigger === true) trigger = false;

  return NextResponse.json({ send: current });
}

/**
 * POST → Digunakan UI untuk mengirim trigger
 */
export async function POST(req: Request) {
  const body = await req.json();

  if (typeof body.send !== "boolean") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  trigger = body.send; // set true
  return NextResponse.json({ message: "Updated", send: trigger });
}
