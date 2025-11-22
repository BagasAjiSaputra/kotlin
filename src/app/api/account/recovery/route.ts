import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { recovery } = await req.json();

  await db.execute(
    "UPDATE account SET recovery = ? WHERE id = 1",
    [recovery]
  );

  return NextResponse.json({ message: "Recovery berhasil diperbarui" });
}
