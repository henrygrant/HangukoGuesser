import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Ionicons } from '@expo/vector-icons';
import { Sentence } from "@/types";

interface SentenceDetailProps {
  sentence: Sentence;
  onDelete?: () => void;
}

export default function SentenceDetail({ sentence, onDelete }: SentenceDetailProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.sentenceSection}>
          <ThemedText style={styles.label}>Korean</ThemedText>
          <ThemedText style={styles.korean}>{sentence.korean}</ThemedText>
        </View>
        {!!onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete} accessibilityLabel="Delete sentence">
            <Ionicons name="trash" size={20} color="#cc0000" />
          </TouchableOpacity>
        )}
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  sentenceSection: {
    marginVertical: 8,
    flex: 1,
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
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(204,0,0,0.07)',
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
});
