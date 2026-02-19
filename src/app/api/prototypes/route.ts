import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { prototypeSchema } from "@/lib/validators/schemas";
import { prototypePrompt } from "@/lib/ai/prompts";
import { generateStructuredAI } from "@/lib/ai/client";
import { getOrCreateDemoContext } from "@/lib/auth/context";

export async function GET(req: Request) {
  const orgId = new URL(req.url).searchParams.get("organizationId");
  if (!orgId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });
  const data = await prisma.prototype.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const payload = prototypeSchema.parse(await req.json());
  const context = await getOrCreateDemoContext();

  const ai = await generateStructuredAI(
    prototypePrompt({ automation: payload.desiredAutomation }),
    {
      technicalArchitecture: "Event trigger + queue + LLM orchestration + CRM sync",
      requiredApis: ["OpenAI", "Slack", "HubSpot"],
      examplePrompts: ["Summarize ticket urgency", "Suggest next-best-action"],
      estimatedMonthlyCost: "$180 - $420"
    }
  );

  const exportJson = {
    title: payload.title,
    desiredAutomation: payload.desiredAutomation,
    ...ai.data
  };

  const prototype = await prisma.prototype.create({
    data: {
      organizationId: payload.organizationId,
      userId: context.user.id,
      title: payload.title,
      desiredAutomation: payload.desiredAutomation,
      technicalArchitecture: ai.data.technicalArchitecture,
      requiredApis: ai.data.requiredApis,
      examplePrompts: ai.data.examplePrompts,
      estimatedMonthlyCost: ai.data.estimatedMonthlyCost,
      exportJson
    }
  });

  return NextResponse.json(prototype);
}
