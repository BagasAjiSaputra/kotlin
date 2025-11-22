import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { pin } = await req.json();

  const [rows]: any = await db.query(
    "SELECT pin FROM account WHERE id = 1"
  );

  if (!rows.length) {
    return NextResponse.json({ success: false, message: "Data tidak ditemukan" });
  }

  const dbPin = String(rows[0].pin); // <-- penting
  const isCorrect = dbPin === pin;

  return NextResponse.json({
    success: isCorrect,
    message: isCorrect ? "PIN benar" : "PIN salah",
  });
}
