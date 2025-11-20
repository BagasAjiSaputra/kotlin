import { NextRequest, NextResponse } from 'next/server'
import {db }from '@/lib/db' // <- default export bukan named export

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { time, servoAngle, soilMoisture, roomTemp } = body

    await db.query(
      'INSERT INTO sensor_history (time, servoAngle, soilMoisture, roomTemp) VALUES (?, ?, ?, ?)',
      [time, servoAngle, soilMoisture, roomTemp]
    )

    return NextResponse.json({ message: 'Data saved', data: body })
  } catch (error) {
    console.error('POST /api/sensor ERROR:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM sensor_history ORDER BY id DESC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('GET /api/sensor ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
