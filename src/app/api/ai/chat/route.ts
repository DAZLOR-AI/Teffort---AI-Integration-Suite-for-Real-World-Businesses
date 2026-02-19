import { NextResponse } from "next/server";
import { generateStructuredAI } from "@/lib/ai/client";

export async function POST(req: Request) {
  const body = (await req.json()) as { prompt: string };
  const result = await generateStructuredAI(body.prompt, { response: "AI offline fallback response." });
  return NextResponse.json(result);
}
