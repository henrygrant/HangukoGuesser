import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word, Sentence } from '@/types';
import wordsData from '@/assets/words.json';
import { generateKoreanSentence } from '@/services/openai';

interface AppState {
  // Words state
  words: Word[];
  addWord: (word: string) => boolean;
  removeWord: (word: string) => void;
  toggleWordSelection: (word: string) => void;
  initializeWords: () => void;

  // Sentences state
  sentences: Sentence[];
  error: string | null;
  isLoading: boolean;
  addSentence: (sentence: Sentence) => boolean;
  removeSentence: (sentence: Sentence) => void;
  removeAllSentences: () => void;
  generateSentences: (words: Word[]) => Promise<Sentence[] | null>;
  setError: (error: string | null) => void;

  // API Keys state
  openrouterApiKey: string;
  elevenlabsApiKey: string;
  setOpenrouterApiKey: (key: string) => void;
  setElevenlabsApiKey: (key: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Words state and actions
      words: [],
      addWord: (word: string) => {
        const trimmedWord = word.trim();
        if (trimmedWord === "") {
          return false;
        }

        let added = false;
        set((state) => {
          // Check if word already exists
          if (state.words.some((w) => w.value === trimmedWord)) {
            return state;
          }

          added = true;
          return {
            words: [
              ...state.words,
              { value: trimmedWord, selected: false },
            ].sort((a, b) => a.value.localeCompare(b.value)),
          };
        });

        return added;
      },
      removeWord: (word: string) => {
        set((state) => ({
          words: state.words.filter((w) => w.value !== word),
        }));
      },
      toggleWordSelection: (word: string) => {
        set((state) => ({
          words: state.words.map((w) =>
            w.value === word ? { ...w, selected: !w.selected } : w
          ),
        }));
      },
      initializeWords: () => {
        set({
          words: wordsData
            .map((word: string) => ({
              value: word,
              selected: false,
            }))
            .sort((a, b) => a.value.localeCompare(b.value)),
        });
      },

      // Sentences state and actions
      sentences: [],
      error: null,
      isLoading: false,
      addSentence: (sentence: Sentence) => {
        const trimmedSentence: Sentence = {
          english: sentence.english.trim(),
          korean: sentence.korean.trim(),
        };

        let added = false;
        set((state) => {
          // Check if sentence already exists
          if (state.sentences.some(
            (s) =>
              s.english === trimmedSentence.english &&
              s.korean === trimmedSentence.korean
          )) {
            return state;
          }

          added = true;
          return {
            sentences: [...state.sentences, trimmedSentence],
          };
        });

        return added;
      },
      removeSentence: (sentence: Sentence) => {
        set((state) => ({
          sentences: state.sentences.filter(
            (s) =>
              s.english !== sentence.english || s.korean !== sentence.korean
          ),
        }));
      },
      removeAllSentences: () => {
        set({ sentences: [] });
      },
      generateSentences: async (words: Word[]) => {
        set({ error: null, isLoading: true });
        try {
          const { openrouterApiKey } = get();
          if (!openrouterApiKey) {
            set({ error: "OpenRouter API key is required" });
            return null;
          }

          const response = await generateKoreanSentence(words, openrouterApiKey);
          if (response) {
            response.forEach((sentence) => get().addSentence(sentence));
            return get().sentences;
          } else {
            set({ error: "No sentences returned" });
            return null;
          }
        } catch (e) {
          console.error("Error generating sentences:", e);
          set({ error: "Failed to generate sentences" });
          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      setError: (error: string | null) => {
        set({ error });
      },

      // API Keys state and actions
      openrouterApiKey: '',
      elevenlabsApiKey: '',
      setOpenrouterApiKey: (key: string) => set({ openrouterApiKey: key }),
      setElevenlabsApiKey: (key: string) => set({ elevenlabsApiKey: key }),
    }),
    {
      name: 'hanguko-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
