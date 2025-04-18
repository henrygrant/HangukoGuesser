import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Word } from "@/types";

interface WordDetailProps {
  word: Word;
  selected: boolean;
  onPress: (word: string) => void;
}

export default function WordDetail({ word, selected, onPress }: WordDetailProps) {
  return (
    <TouchableOpacity onPress={() => onPress(word.value)}>
      <ThemedView style={[styles.container, selected && styles.selectedContainer]}>
        <View style={styles.wordSection}>
          <ThemedText style={styles.label}>Korean</ThemedText>
          <ThemedText style={[styles.korean, selected && styles.selectedText]}>
            {word.value}
          </ThemedText>
        </View>
        <View style={styles.divider} />
        <View style={styles.wordSection}>
          <ThemedText style={styles.label}>English</ThemedText>
          <ThemedText style={[styles.english, selected && styles.selectedText]}>
            {word.english || "Translation not available"}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(34, 139, 34, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedContainer: {
    backgroundColor: "rgba(34, 139, 34, 0.2)",
    borderColor: "#228B22",
  },
  wordSection: {
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.6,
  },
  korean: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  english: {
    fontSize: 16,
    lineHeight: 22,
  },
  selectedText: {
    color: "#228B22",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 8,
  },
});
