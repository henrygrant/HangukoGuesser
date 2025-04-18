import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import wordsData from "@/assets/words.json";
import { Word } from "@/types";

type WordListContextType = {
  words: Word[];
  addWord: (word: string) => boolean;
  removeWord: (word: string) => void;
  toggleWordSelection: (word: string) => void;
};

// Create the context with a default value
const WordListContext = createContext<WordListContextType | undefined>(
  undefined
);

// Provider component
export function WordListProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);

  // Load words from JSON file on initial render
  useEffect(() => {
    const words = wordsData.map((word: string) => ({
      value: word,
      selected: false,
    })).sort((a, b) => a.value.localeCompare(b.value));
    setWords(words);
  }, []);

  // Add a new word to the list
  const addWord = (word: string): boolean => {
    const trimmedWord = word.trim();

    if (trimmedWord === "") {
      return false;
    }

    // Check if word already exists
    if (words.some((w) => w.value === trimmedWord)) {
      return false;
    }

    // Add new word with selected set to false
    setWords((prevWords) => [
      ...prevWords,
      { value: trimmedWord, selected: false },
    ]);
    return true;
  };

  // Remove a word from the list
  const removeWord = (word: string) => {
    setWords((prevWords) => prevWords.filter((w) => w.value !== word));
  };

  // Toggle the selected state of a word
  const toggleWordSelection = (word: string) => {
    setWords((prevWords) =>
      prevWords.map((w) =>
        w.value === word ? { ...w, selected: !w.selected } : w
      )
    );
  };

  return (
    <WordListContext.Provider
      value={{ words, addWord, removeWord, toggleWordSelection }}
    >
      {children}
    </WordListContext.Provider>
  );
}

// Custom hook to use the wordlist context
export function useWordList() {
  const context = useContext(WordListContext);

  if (context === undefined) {
    throw new Error("useWordList must be used within a WordListProvider");
  }

  return context;
}
