import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Sentence } from "@/types";

interface SentenceDetailProps {
  sentence: Sentence;
}

export default function SentenceDetail({ sentence }: SentenceDetailProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.sentenceSection}>
        <ThemedText style={styles.label}>Korean</ThemedText>
        <ThemedText style={styles.korean}>{sentence.korean}</ThemedText>
      </View>
      <View style={styles.divider} />
      <View style={styles.sentenceSection}>
        <ThemedText style={styles.label}>English</ThemedText>
        <ThemedText style={styles.english}>{sentence.english}</ThemedText>
      </View>
    </ThemedView>
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
  },
  sentenceSection: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.6,
  },
  korean: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  english: {
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 8,
  },
});
