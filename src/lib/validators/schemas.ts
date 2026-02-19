import { z } from "zod";

export const assessmentSchema = z.object({
  organizationId: z.string().min(1),
  industry: z.string().min(2),
  businessSize: z.string().min(1),
  toolsUsed: z.string().min(2),
  painPoints: z.string().min(2)
});

export const prototypeSchema = z.object({
  organizationId: z.string().min(1),
  title: z.string().min(2),
  desiredAutomation: z.string().min(4)
});

export const workflowSchema = z.object({
  organizationId: z.string().min(1),
  name: z.string().min(2),
  trigger: z.record(z.any()),
  aiStep: z.record(z.any()),
  actionStep: z.record(z.any())
});
