import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET → Ambil semua history data sensor dari DB (sensorlog2)
 */
export async function GET() {
  // Query ambil data dari sensorlog2, urutkan terbaru dulu
  const [rows] = await db.query(
    "SELECT id, soil, humidity, temperature, created_at FROM sensorlog2 ORDER BY id DESC"
  );

  // Map data supaya konsisten dengan format sebelumnya
  const data = (rows as any[]).map((row) => ({
    id: row.id,
    time: row.created_at,
    soil: row.soil,
    humidity: row.humidity,
    temperature: row.temperature,
  }));

  return NextResponse.json({
    success: true,
    history: data,
  });
}
