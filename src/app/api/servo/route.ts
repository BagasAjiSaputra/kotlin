// src/app/api/servo/route.ts

import { NextResponse } from "next/server";

// Variabel state servo (disimpan in-memory)
let servoState: "open" | "close" = "close";

/**
 * GET → diakses oleh ESP32 tiap 5 detik
 * return: { status: "open" | "close" }
 */
export async function GET() {
  return NextResponse.json({ status: servoState });
}

/**
 * POST → ubah state servo
 * body: { status: "open" | "close" }
 */
export async function POST(req: Request) {
  try {
    const { status } = await req.json();

    // Validasi input
    if (status !== "open" && status !== "close") {
      return NextResponse.json(
        { error: "Status must be 'open' or 'close'" },
        { status: 400 }
      );
    }

    // Update state
    servoState = status;

    return NextResponse.json({
      message: "Servo state updated",
      status: servoState,
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
