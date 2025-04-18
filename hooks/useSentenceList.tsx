import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Word, Sentence } from "@/types";
import { generateKoreanSentence } from "./openai";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SentenceListContextType = {
  sentences: Sentence[];
  error: string | null;
  isLoading: boolean;
  addSentence: (sentence: Sentence) => boolean;
  removeSentence: (sentence: Sentence) => void;
  generateSentences: (words: Word[]) => void;
};

// Create the context with a default value
const SentenceListContext = createContext<SentenceListContextType | undefined>(
  undefined
);

// Provider component
export function SentenceListProvider({ children }: { children: ReactNode }) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const storedSentencesString = await AsyncStorage.getItem("sentences");
        if (storedSentencesString !== null) {
          setSentences(JSON.parse(storedSentencesString));
        }
      } catch (error) {
        console.error("Failed to load sentences from AsyncStorage:", error);
      }
    };
    loadPersistedState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem("sentences", JSON.stringify(sentences));
      } catch (error) {
        console.error("Failed to save sentences to AsyncStorage:", error);
      }
    };
    persistState();
  }, [sentences]);

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

  // Generate sentences based on the provided words
  const generateSentences = async (
    words: Word[]
  ): Promise<Sentence[] | null> => {
    try {
      setIsLoading(true);
      const response = await generateKoreanSentence(words);

      // Add the sentence to the sentence list
      if (response) {
        response.forEach(addSentence);
        return sentences;
      } else {
        setError("No sentences returned");
        return null;
      }
    } catch (e) {
      console.error("Error generating sentences:", e);
      setError("Failed to generate sentences");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SentenceListContext.Provider
      value={{
        sentences,
        error,
        isLoading,
        addSentence,
        removeSentence,
        generateSentences,
      }}
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
    error: context.error,
    isLoading: context.isLoading,
    addSentence: context.addSentence,
    removeSentence: context.removeSentence,
    generateSentences: context.generateSentences,
  };
}
