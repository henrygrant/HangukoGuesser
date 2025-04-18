import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useWordList } from "@/hooks/useWordList";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { OptionsModal } from "@/components/OptionsModal";
import { useSentenceList } from "@/hooks/useSentenceList";
import SentenceCard from "@/components/SentenceCard";

export default function PlayScreen() {
  const { words } = useWordList();
  const { sentences, generateSentences, error, isLoading } = useSentenceList();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState<"korean" | "english">("korean");
  const [numSentences, setNumSentences] = useState<number>(1);

  const handleStartPress = () => {
    setShowAnswer(false);

    // Check if any words are selected
    const selectedWords = words.filter((word) => word.selected);

    // If there are selected words, use only those; otherwise use all words
    const wordsToUse = selectedWords.length > 0 ? selectedWords : words;
    // Pass the language and numSentences options
    generateSentences(wordsToUse);
  };

  const handleGeneratePress = () => {
    setShowAnswer(false);

    // Check if any words are selected
    const selectedWords = words.filter((word) => word.selected);

    // If there are selected words, use only those; otherwise use all words
    const wordsToUse = selectedWords.length > 0 ? selectedWords : words;

    // Pass the language and numSentences options
    generateSentences(wordsToUse);
  };

  return (
    <ThemedView style={[styles.container]}>
      {/* Settings Gear Icon */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setModalVisible(true)}
      >
        <IconSymbol name="gear" size={28} color="#007AFF" />
      </TouchableOpacity>

      <ThemedText type="title" style={styles.title}>
        Play
      </ThemedText>
      <ThemedText>Practice your Korean vocabulary!</ThemedText>

      {/* Options Modal */}
      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        language={language}
        setLanguage={setLanguage}
        numSentences={numSentences}
        setNumSentences={setNumSentences}
      />
      <TouchableOpacity style={styles.button} onPress={handleGeneratePress}>
        <ThemedText style={styles.buttonText}>Generate Sentences</ThemedText>
      </TouchableOpacity>
      <ThemedText>{JSON.stringify(sentences)}</ThemedText>
      {/* <TouchableOpacity style={styles.button} onPress={handleStartPress}>
        <ThemedText style={styles.buttonText}>
          Generate{" "}
          {numSentences === 1 ? "a sentence" : `${numSentences} sentences`}
        </ThemedText>
      </TouchableOpacity> */}

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

      <FlatList
        data={sentences}
        renderItem={({ item }) => (
          <SentenceCard sentence={item} initialLanguage={language} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  settingsButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 8,
  },
  sentenceContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  sentenceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sentenceTranslation: {
    fontSize: 16,
    color: "gray",
  },
});
