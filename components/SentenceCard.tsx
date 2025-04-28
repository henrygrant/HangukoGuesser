import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";
import { Sentence } from "@/types";
import { IconSymbol } from "./ui/IconSymbol";

interface SentenceCardProps {
  sentence: Sentence;
  initialLanguage: "korean" | "english";
  onDelete?: (sentence: Sentence) => void;
}

export default function SentenceCard({ sentence, initialLanguage, onDelete }: SentenceCardProps) {
  const [showingKorean, setShowingKorean] = useState(initialLanguage === "korean");
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleLanguage = () => {
    setShowingKorean(!showingKorean);
  };

  useEffect(() => {
    setShowingKorean(initialLanguage === "korean");
  }, [sentence, initialLanguage]);

  return (
    <>
      <TouchableOpacity onPress={toggleLanguage} style={styles.touchable}>
        <ThemedView style={styles.container}>
          <View style={styles.headerRow}>
            <ThemedText style={styles.label}>
              {showingKorean ? "Korean" : "English"}
            </ThemedText>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <IconSymbol name="ellipsis" size={20} color="#228B22" />
            </TouchableOpacity>
          </View>
          <View style={styles.languageSection}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            {onDelete && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  onDelete(sentence);
                }}
              >
                <IconSymbol name="trash" size={20} color="#dc3545" />
                <ThemedText style={[styles.menuText, styles.deleteText]}>
                  Delete Sentence
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "rgba(31,31,31,1)",
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
  deleteText: {
    color: "#dc3545",
  },
});
