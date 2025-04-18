import { generateKoreanSentence, GeneratedResponse } from "../../services/openai";

describe("generateKoreanSentence", () => {
  it("should generate a Korean sentence with the given words", async () => {
    const words = [
      { value: "도서관", selected: false },
      { value: "마시다", selected: false },
      { value: "예쁘다", selected: false },
    ];

    const response = await generateKoreanSentence(words);
    expect(Array.isArray(response)).toBe(true);
    response.forEach((sentence) => {
      expect(typeof sentence.korean).toBe("string");
      expect(typeof sentence.english).toBe("string");
      expect(sentence.korean).not.toBe("");
      expect(sentence.english).not.toBe("");
    });
  });
});
