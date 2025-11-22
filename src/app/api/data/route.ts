import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST → ESP32 ngirim data sensor (JSON)
 */
export async function POST(req: Request) {
  const body = await req.json();

  const { soil, humidity, temperature } = body;

  await db.query(
    "INSERT INTO sensorlog2 (soil, humidity, temperature) VALUES (?, ?, ?)",
    [soil, humidity, temperature]
  );

  return NextResponse.json({
    message: "Sensor data saved per column",
    received: body,
  });
}
