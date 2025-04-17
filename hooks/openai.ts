import OpenAI from "openai";
import { useState, useContext } from "react";
import { useSentenceList } from "./useSentenceList";

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

export interface GenerateOptions {
  language?: "korean" | "english";
  numSentences?: number;
}

export function useGenerateKoreanSentence() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResponse | null>(null);
  const { addSentence } = useSentenceList();

  const generate = async (words: string[], options: GenerateOptions = {}) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateKoreanSentence(words, options);
      console.log(response);

      // Add the sentence to the sentence list
      if (response) {
        const added = addSentence(response);
        if (!added) {
          setError("This sentence already exists in the list.");
        }
      }

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
  words: string[],
  options: GenerateOptions = {}
): Promise<GeneratedResponse> {
  const { language = "korean", numSentences = 1 } = options;
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a Korean language expert. Generate natural Korean sentences using the given words. The sentences should be appropriate for beginner learners.",
        },
        {
          role: "user",
          content: `Generate ${numSentences} short beginner-level Korean ${
            numSentences === 1 ? "sentence" : "sentences"
          } using some of
           the following list of words: "${words}".
          Include both the Korean ${
            numSentences === 1 ? "sentence" : "sentences"
          } and ${language === "korean" ? "its" : "their"} English translation.
          The output should be in JSON format, with one property called
          "english" for the english ${
            numSentences === 1 ? "sentence" : "sentences"
          } and one property called "korean" for the korean ${
            numSentences === 1 ? "sentence" : "sentences"
          }.
          ${
            language === "english"
              ? "The user prefers to see the English translation first."
              : "The user prefers to see the Korean sentence first."
          }`,
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
