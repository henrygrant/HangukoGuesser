import React, { createContext, useContext, useState, ReactNode } from "react";

export type Sentence = {
  english: string;
  korean: string;
};

type SentenceListContextType = {
  sentences: Sentence[];
  addSentence: (sentence: Sentence) => boolean;
  removeSentence: (sentence: Sentence) => void;
};

// Create the context with a default value
const SentenceListContext = createContext<SentenceListContextType | undefined>(
  undefined
);

// Provider component
export function SentenceListProvider({ children }: { children: ReactNode }) {
  const [sentences, setSentences] = useState<Sentence[]>([]);

  // Add a new sentence to the list
  const addSentence = (sentence: Sentence): boolean => {
    const trimmedSentence: Sentence = { ...sentence };
    trimmedSentence.english = trimmedSentence.english.trim();
    trimmedSentence.korean = trimmedSentence.korean.trim();

    // Check if sentence already exists
    if (
      sentences.some(
        (s) =>
          s.english === trimmedSentence.english &&
          s.korean === trimmedSentence.korean
      )
    ) {
      return false;
    }

    // Add new sentence
    setSentences((prevSentences) => [...prevSentences, trimmedSentence]);
    return true;
  };

  // Remove a sentence from the list
  const removeSentence = (sentence: Sentence) => {
    setSentences((prevSentences) =>
      prevSentences.filter(
        (s) => s.english !== sentence.english || s.korean !== sentence.korean
      )
    );
  };

  return (
    <SentenceListContext.Provider
      value={{ sentences, addSentence, removeSentence }}
    >
      {children}
    </SentenceListContext.Provider>
  );
}

// Custom hook to use the sentence list context
export function useSentenceList() {
  const context = useContext(SentenceListContext);

  if (context === undefined) {
    throw new Error(
      "useSentenceList must be used within a SentenceListProvider"
    );
  }

  return {
    sentences: context.sentences,
    addSentence: context.addSentence,
    removeSentence: context.removeSentence,
  };
}
