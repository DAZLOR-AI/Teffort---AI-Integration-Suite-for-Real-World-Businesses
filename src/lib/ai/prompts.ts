export const assessmentPrompt = (payload: {
  industry: string;
  businessSize: string;
  toolsUsed: string;
  painPoints: string;
}) => `Return strict JSON with keys opportunityMap (array), automationIdeas (array), estimatedROI (string) for this business: ${JSON.stringify(payload)}`;

export const prototypePrompt = (payload: { automation: string }) =>
  `Return strict JSON with keys technicalArchitecture (string), requiredApis (array), examplePrompts (array), estimatedMonthlyCost (string) for automation: ${payload.automation}`;
