import { OpenAI } from "openai";
import { Word, Sentence } from "@/types";

// Initialize OpenAI client

const baseURL = "https://openrouter.ai/api/v1";

export interface GeneratedWordResponse {
  words: Word[];
}

export async function generateKoreanWordsMetadata(
  words: Word[],
  apiKey: string
): Promise<Word[]> {
  if (!apiKey) {
    throw new Error("OpenRouter API key is required");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });

  try {
    console.log('starting')
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "words",
          schema: {
            type: "object",
            properties: {
              words: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    value: { type: "string" },
                    english: { type: "string" },
                    type: { type: "string", enum: ["verb", "noun", "adjective", "adverb", "conjunction", "preposition", "pronoun", "other"] },
                    past: { type: ["string", "null"] },
                    present: { type: ["string", "null"] },
                    future: { type: ["string", "null"] },
                  },
                  required: ["value", "english", "type"],
                  additionalProperties: false,
                },
              },
            },
            required: ["words"],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "system",
          content:
            "You are a Korean language expert. The sentences should be appropriate for beginner learners.",
        },
        {
          role: "user",
          content: `TASK: 
            For the given list of words, generate a list objects that represent information about each word. The given word in korean should be the "value"
            property. The word in english should be the "english" property. The type of word should be the "type" property and should be one of ["verb", "noun", "adjective", "adverb", "conjunction", "preposition", "pronoun", "other"].
            If the word is a verb, give the past, present, and future tense forms in the "past", "present", and "future" properties. The output should be valid json.

            INPUT: ${words.map(w => w.value).join(", ")}`
        },
      ],
      temperature: 0.7,
      max_tokens: words.length * 100,
    });
    console.log('finished')
    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error("No response from OpenAI");
    }
    const jsonResponse: GeneratedWordResponse = JSON.parse(response);
    return jsonResponse.words
  } catch (error) {
    console.error("Error generating Korean word metadata:", error);
    throw error;
  }
}

export interface GeneratedSentenceResponse {
  sentences: Sentence[];
}

export async function generateKoreanSentence(
  words: Word[],
  apiKey: string
): Promise<Sentence[]> {
  if (!apiKey) {
    throw new Error("OpenRouter API key is required");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "sentences",
          schema: {
            type: "object",
            properties: {
              sentences: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    english: { type: "string" },
                    korean: { type: "string" },
                  },
                  required: ["english", "korean"],
                  additionalProperties: false,
                },
              },
            },
            required: ["sentences"],
            additionalProperties: false,
          },
        },
      },
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
            level korean speaker. Sentences should be a mix of past, present, and future tense.

            INPUT:
            ${words.map((w) => w.value).join(", ")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: words.length * 30,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }
    const jsonResponse: GeneratedSentenceResponse = JSON.parse(response);
    return jsonResponse.sentences;
  } catch (error) {
    console.error("Error generating Korean sentence:", error);
    throw error;
  }
}
