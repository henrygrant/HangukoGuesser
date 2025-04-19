


// Deck Export -> Notes in plain text (uncheck everything)
export function parseKoreanVocab(fileContent: string): string[] {
  // Split the content into lines and filter out empty lines or comments
  const lines = fileContent
    .split('\n')
    .filter(line => line.trim() !== '' && !line.startsWith('#'));

  // Extract the first column (Korean word) from each line and collect unique words
  const koreanWords = new Set(
    lines.map(line => {
      // Split by tab and take the first column
      const [koreanWord] = line.split('\t');
      return koreanWord.trim();
    })
  );

  // Convert Set to Array and return
  return Array.from(koreanWords);
}
