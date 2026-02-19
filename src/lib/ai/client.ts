import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateStructuredAI<T>(prompt: string, fallback: T): Promise<{ data: T; usage: { promptTokens: number; completionTokens: number; totalTokens: number } }> {
  if (!process.env.OPENAI_API_KEY) {
    return { data: fallback, usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 } };
  }

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    temperature: 0.2
  });

  const text = response.output_text || JSON.stringify(fallback);
  let data: T = fallback;
  try {
    data = JSON.parse(text) as T;
  } catch {
    data = fallback;
  }

  return {
    data,
    usage: {
      promptTokens: response.usage?.input_tokens ?? 0,
      completionTokens: response.usage?.output_tokens ?? 0,
      totalTokens: response.usage?.total_tokens ?? 0
    }
  };
}
