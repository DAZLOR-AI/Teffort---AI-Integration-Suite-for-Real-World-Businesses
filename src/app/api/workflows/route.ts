import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { workflowSchema } from "@/lib/validators/schemas";
import { getOrCreateDemoContext } from "@/lib/auth/context";

export async function GET(req: Request) {
  const orgId = new URL(req.url).searchParams.get("organizationId");
  if (!orgId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });
  const workflows = await prisma.workflow.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(workflows);
}

export async function POST(req: Request) {
  const payload = workflowSchema.parse(await req.json());
  const context = await getOrCreateDemoContext();
  const workflow = await prisma.workflow.create({
    data: {
      organizationId: payload.organizationId,
      userId: context.user.id,
      name: payload.name,
      trigger: payload.trigger,
      aiStep: payload.aiStep,
      actionStep: payload.actionStep,
      mockResult: { status: "success", message: "Mock execution completed." }
    }
  });
  return NextResponse.json(workflow);
}

export async function PATCH(req: Request) {
  const { id, status } = (await req.json()) as { id: string; status: "ACTIVE" | "INACTIVE" };
  const workflow = await prisma.workflow.update({ where: { id }, data: { status } });
  return NextResponse.json(workflow);
}
