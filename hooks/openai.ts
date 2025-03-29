import OpenAI from "openai";
import { useState } from "react";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_OPENROUTER_BASE_URL,
  dangerouslyAllowBrowser: true,
});

export interface GeneratedResponse {
  korean: string;
  english: string;
}

export function useGenerateKoreanSentence() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResponse | null>(null);

  const generate = async (words: string[]) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateKoreanSentence(words);
      console.log(response);
      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate sentence"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    result,
  };
}

export async function generateKoreanSentence(
  words: string[]
): Promise<GeneratedResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a Korean language expert. Generate a natural Korean sentence using the given word. The sentence should be appropriate for beginner learners.",
        },
        {
          role: "user",
          content: `Generate a short beginner-level Korean sentence using some of
           the following list of words: "${words}". 
          Include both the Korean sentence and its English translation. 
          The output should be in JSON format, with one property called 
          "english" for the english sentence and one property called "korean" for the korean sentence. `,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }
    const jsonResponse: GeneratedResponse = JSON.parse(response);
    return jsonResponse;
  } catch (error) {
    console.error("Error generating Korean sentence:", error);
    throw new Error("Failed to generate Korean sentence");
  }
}
