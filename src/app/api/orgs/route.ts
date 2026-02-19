import { NextResponse } from "next/server";
import { getOrCreateDemoContext } from "@/lib/auth/context";

export async function GET() {
  const context = await getOrCreateDemoContext();
  return NextResponse.json({ organization: context.organization, user: context.user, role: "OWNER" });
}
