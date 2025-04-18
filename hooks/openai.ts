import OpenAI from "openai";
import { Word, Sentence } from "@/types";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_OPENROUTER_BASE_URL,
  dangerouslyAllowBrowser: true,
});

export interface GeneratedResponse {
  sentences: Sentence[];
}

export async function generateKoreanSentence(
  words: Word[]
): Promise<Sentence[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: {
            name: 'weewoo',
            type: "object",
            properties: {
              sentences: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    english: { type: "string" },
                    korean: { type: "string" }
                  },
                  required: ["english", "korean"],
                  additionalProperties: false
                }
              }
            },
            required: ["sentences"],
            additionalProperties: false
          }
        }
      }
      messages: [
        {
          role: "system",
          content:
            "You are a Korean language expert. Generate natural Korean sentences using the given words. The sentences should be appropriate for beginner learners.",
        },
        {
          role: "user",
          content: `TASK: 
            for each of the given words, generate a beginner-level sentence in korean. 
            use the other words in the list as context of what words the user knows. 
            you can add other words, but keep in mind that the user is a beginner-intermediate 
            level korean speaker. Sentences should be a mix of past and present tense.

            INPUT:
            ${words.map((w) => w.value).join(", ")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: words.length * 30,
    });

    const response = completion.choices[0].message.content;
    console.log(response);
    if (!response) {
      throw new Error("No response from OpenAI");
    }
    const jsonResponse: GeneratedResponse = JSON.parse(response.sentences);
    console.log("ai response:", jsonResponse);
    return jsonResponse.sentences;
  } catch (error) {
    console.error("Error generating Korean sentence:", error);
    throw new Error("Failed to generate Korean sentence");
  }
}
