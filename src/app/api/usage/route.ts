import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  const orgId = new URL(req.url).searchParams.get("organizationId");
  if (!orgId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });

  const logs = await prisma.usageLog.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" }, take: 50 });
  const totalTokens = logs.reduce((sum, log) => sum + log.totalTokens, 0);
  const totalCost = logs.reduce((sum, log) => sum + log.estimatedCost, 0);

  return NextResponse.json({ logs, totalTokens, totalCost });
}
