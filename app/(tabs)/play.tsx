import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useSentenceList } from "@/hooks/useSentenceList";
import { useState, useCallback, useEffect } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import SentenceCard from "@/components/SentenceCard";
import { OptionsModal } from "@/components/OptionsModal";
import { ThemedText } from "@/components/ThemedText";
import { Sentence } from "@/types";

export default function PlayScreen() {
  const { sentences, removeSentence } = useSentenceList();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [language, setLanguage] = useState<"korean" | "english">("korean");

  const getRandomSentence = useCallback(() => {
    if (sentences.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }, [sentences]);

  const [currentSentence, setCurrentSentence] = useState<typeof sentences[0] | null>(null);

  useEffect(() => {
    setCurrentSentence(getRandomSentence());
  }, [sentences, getRandomSentence]);

  const handleNextSentence = () => {
    setCurrentSentence(getRandomSentence());
  };

  const handleDelete = useCallback((sentence: Sentence) => {
    removeSentence(sentence);
  }, [removeSentence]);

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setModalVisible(true)}
      >
        <IconSymbol name="gear" size={28} color="#228B22" />
      </TouchableOpacity>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        language={language}
        setLanguage={setLanguage}
      />

      <View style={styles.cardContainer}>
        {currentSentence ? (
          <>
            <SentenceCard sentence={currentSentence} initialLanguage={language} onDelete={handleDelete} />
            <TouchableOpacity style={styles.nextButton} onPress={handleNextSentence}>
              <ThemedText style={styles.buttonText}>Next Sentence</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.messageContainer}>
            <ThemedText style={styles.messageText}>
              No sentences available. Generate some sentences first!
            </ThemedText>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingsButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
