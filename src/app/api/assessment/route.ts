import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { assessmentPrompt } from "@/lib/ai/prompts";
import { generateStructuredAI } from "@/lib/ai/client";
import { assessmentSchema } from "@/lib/validators/schemas";
import { getOrCreateDemoContext } from "@/lib/auth/context";

export async function POST(req: Request) {
  const payload = assessmentSchema.parse(await req.json());
  const context = await getOrCreateDemoContext();
  const ai = await generateStructuredAI(
    assessmentPrompt(payload),
    { opportunityMap: ["Customer support triage"], automationIdeas: ["Auto-prioritize leads"], estimatedROI: "12-20% operational savings" }
  );

  const assessment = await prisma.assessment.create({
    data: {
      organizationId: payload.organizationId,
      userId: context.user.id,
      industry: payload.industry,
      businessSize: payload.businessSize,
      toolsUsed: payload.toolsUsed,
      painPoints: payload.painPoints,
      opportunityMap: ai.data.opportunityMap,
      automationIdeas: ai.data.automationIdeas,
      estimatedROI: ai.data.estimatedROI
    }
  });

  await prisma.usageLog.create({
    data: {
      organizationId: payload.organizationId,
      userId: context.user.id,
      model: "gpt-4o-mini",
      feature: "assessment",
      promptTokens: ai.usage.promptTokens,
      completionTokens: ai.usage.completionTokens,
      totalTokens: ai.usage.totalTokens,
      estimatedCost: ai.usage.totalTokens * 0.0000015
    }
  });

  return NextResponse.json(assessment);
}
