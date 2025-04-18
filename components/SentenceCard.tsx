import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useState } from "react";
import { Sentence } from "@/types";

interface SentenceCardProps {
  sentence: Sentence;
  initialLanguage: "korean" | "english";
}

export default function SentenceCard({ sentence, initialLanguage }: SentenceCardProps) {
  const [showingKorean, setShowingKorean] = useState(initialLanguage === "korean");

  const toggleLanguage = () => {
    setShowingKorean(!showingKorean);
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={styles.touchable}>
      <ThemedView style={styles.container}>
        <View style={styles.languageSection}>
          <ThemedText style={styles.label}>
            {showingKorean ? "Korean" : "English"}
          </ThemedText>
          <ThemedText style={styles.mainText}>
            {showingKorean ? sentence.korean : sentence.english}
          </ThemedText>
        </View>
        <View style={styles.divider} />
        <View style={styles.instructionSection}>
          <ThemedText style={styles.label}>Tap to see the</ThemedText>
          <ThemedText style={styles.secondaryText}>
            {showingKorean ? "English" : "Korean"} translation
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
    maxWidth: 600,
  },
  container: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "rgba(34, 139, 34, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageSection: {
    marginBottom: 16,
  },
  instructionSection: {
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    opacity: 0.6,
  },
  mainText: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
    textAlign: "center",
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#228B22",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 16,
  },
});
