import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  console.log("forwarded: ", forwarded);

  const ip = forwarded?.split(",")[0] || req.ip || "Unknown";

  return NextResponse.json({ ip });
}
