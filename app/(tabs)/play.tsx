import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import words from "@/assets/words.json";
import { useGenerateKoreanSentence } from "@/hooks/openai";
import { useState } from "react";

export default function PlayScreen() {
  const { generate, isLoading, error, result } = useGenerateKoreanSentence();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleStartPress = () => {
    setShowAnswer(false);
    generate(words);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Play
      </ThemedText>
      <ThemedText>Practice your Korean vocabulary!</ThemedText>

      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
        <ThemedText style={styles.buttonText}>Generate a sentence</ThemedText>
      </TouchableOpacity>

      {error && (
        <ThemedView style={styles.wordContainer}>
          <ThemedText style={[styles.wordText, { color: "red" }]}>
            {error}
          </ThemedText>
        </ThemedView>
      )}

      {isLoading && (
        <ThemedView style={styles.wordContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </ThemedView>
      )}

      {result && (
        <TouchableOpacity onPress={() => setShowAnswer(true)}>
          <ThemedView style={styles.wordContainer}>
            {showAnswer ? (
              <ThemedText style={styles.wordText}>{result.english}</ThemedText>
            ) : (
              <ThemedText style={styles.wordText}>{result.korean}</ThemedText>
            )}
          </ThemedView>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  wordContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  wordText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
