import { NextRequest, NextResponse } from 'next/server';
import {db} from '@/lib/db';

// Helper untuk parsing query param ?id=1
const getId = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  return id;
};

export async function GET(req: NextRequest) {
  const id = getId(req);
  if (id) {
    const [rows] = await db.query('SELECT * FROM iot WHERE id = ?', [id]);
    return NextResponse.json((rows as any)[0] || null);
  } else {
    const [rows] = await db.query('SELECT * FROM iot');
    return NextResponse.json(rows);
  }
}

export async function POST(req: NextRequest) {
  const { moisture, temperature } = await req.json();

  if (!moisture || !temperature)
    return NextResponse.json({ message: 'Data incomplete' }, { status: 400 });

  const [result] = await db.query(
    'INSERT INTO iot (moisture, temperature) VALUES (?, ?)',
    [moisture, temperature]
  );

  return NextResponse.json({
    id: (result as any).insertId,
    moisture,
    temperature,
  });
}

export async function PUT(req: NextRequest) {
  const id = getId(req);
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  const { moisture, temperature } = await req.json();

  await db.query('UPDATE iot SET moisture = ?, temperature = ? WHERE id = ?', [
    moisture,
    temperature,
    id,
  ]);

  return NextResponse.json({ id, moisture, temperature });
}

export async function DELETE(req: NextRequest) {
  const id = getId(req);
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  await db.query('DELETE FROM iot WHERE id = ?', [id]);
  return NextResponse.json({ message: 'Deleted' });
}
