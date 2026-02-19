import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  const orgId = new URL(req.url).searchParams.get("organizationId");
  if (!orgId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });
  const integrations = await prisma.integration.findMany({ where: { organizationId: orgId } });
  return NextResponse.json(integrations);
}

export async function POST(req: Request) {
  const body = (await req.json()) as { organizationId: string; provider: string; name: string };
  const integration = await prisma.integration.create({
    data: {
      organizationId: body.organizationId,
      provider: body.provider,
      name: body.name,
      scopes: ["read", "write"]
    }
  });
  return NextResponse.json(integration);
}
