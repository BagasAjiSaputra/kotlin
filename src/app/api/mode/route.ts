import { NextResponse } from "next/server";

let currentMode: "smart" | "manual" = "manual";

let smartConfig = {
  idle: 0,
  sleep: 0,
  duration: 0,
};

let manualConfig = {
  state: "close",
  duration: 0, // <-- NEW
};

export async function GET() {
  return NextResponse.json({
    mode: currentMode,
    smart: smartConfig,
    manual: manualConfig,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!["smart", "manual"].includes(body.mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    currentMode = body.mode;

    // SMART MODE UPDATE
    if (body.mode === "smart") {
      smartConfig.idle = body.idle ?? smartConfig.idle;
      smartConfig.sleep = body.sleep ?? smartConfig.sleep;
      smartConfig.duration = body.duration ?? smartConfig.duration;
    }

    // MANUAL MODE UPDATE
    if (body.mode === "manual") {
      if (body.servo && ["open", "close"].includes(body.servo)) {
        manualConfig.state = body.servo;
      }
      if (typeof body.duration === "number") {
        manualConfig.duration = body.duration;
      }
    }

    return NextResponse.json({
      success: true,
      mode: currentMode,
      smart: smartConfig,
      manual: manualConfig,
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
