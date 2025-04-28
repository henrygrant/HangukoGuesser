export type Word = {
  value: string;
  selected: boolean;
  english?: string;
  type?: 'verb' | 'noun' | 'adjective' | 'adverb' | 'conjunction' | 'preposition' | 'pronoun' | 'other';
  past?: string;
  present?: string;
  future?: string;
};

export type Sentence = {
  english: string;
  korean: string;
};
