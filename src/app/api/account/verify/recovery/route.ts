import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { code, newPin } = await req.json();

  const [rows]: any = await db.query(
    "SELECT recovery FROM account WHERE id = 1"
  );

  if (!rows.length) {
    return NextResponse.json({ success: false, message: "Data tidak ditemukan" });
  }

  if (rows[0].recovery !== code) {
    return NextResponse.json({ success: false, message: "Recovery code salah" });
  }

  await db.execute(
    "UPDATE account SET pin = ? WHERE id = 1",
    [newPin]
  );

  return NextResponse.json({ success: true, message: "PIN berhasil direset" });
}
