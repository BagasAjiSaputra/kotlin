import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.refreshData !== "true") {
    return NextResponse.json({ error: "refreshData must be true" }, { status: 400 });
  }

  // Generate random response
  const payload = {
    time: new Date().toLocaleTimeString(),               
    servoAngle: Math.floor(Math.random() * 181),        
    soilMoisture: Math.floor(Math.random() * 101),        
    roomTemp: (20 + Math.random() * 10).toFixed(1),       
  };

  // Wajib gunakan URL absolut
  const res = await fetch(`http://localhost:3000/api/sensor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return NextResponse.json({
    message: "Trigger executed, data sent to /api/sensor",
    sent: payload,
    sensorResponse: result,
  });
}
