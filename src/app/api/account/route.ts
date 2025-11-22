import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // sesuai lib lu

export async function POST(req: Request) {
  const { pin } = await req.json();

  await db.execute(
    "UPDATE account SET pin = ? WHERE id = 1",
    [pin]
  );

  return NextResponse.json({ message: "PIN berhasil diperbarui" });
}
