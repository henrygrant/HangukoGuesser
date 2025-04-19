import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAppStore } from "@/stores/useAppStore";
import Badge from "@/components/Badge";

export default function AddWordsScreen() {
  const { words, addWord } = useAppStore();
  const [word, setWord] = useState("");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("#228B22");

  const handleAdd = () => {
    const trimmed = word.trim();
    if (!trimmed) {
      setMessage("Please enter a word");
      setMessageColor("#cc0000");
      return;
    }
    const success = addWord(trimmed);
    if (success) {
      setWord("");
      setMessage("Word added!");
      setMessageColor("#228B22");
    } else {
      setMessage("This word already exists in the list");
      setMessageColor("#cc0000");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Manage Words</ThemedText>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter a Korean word..."
            value={word}
            onChangeText={setWord}
            placeholderTextColor="#7f7f7f"
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd} accessibilityLabel="Add word">
            <IconSymbol name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {!!message && (
          <ThemedText style={[styles.message, { color: messageColor }]}>{message}</ThemedText>
        )}
        <View style={styles.badgeContainer}>
          <Badge
            text={`${words.length} ${words.length === 1 ? "word" : "words"}`}
          />
        </View>
      </View>
      <View style={styles.wordsList}>
        {words.length === 0 ? (
          <ThemedText style={styles.emptyText}>No words added yet.</ThemedText>
        ) : (
          <ScrollView style={styles.tableScroll} contentContainerStyle={styles.tableContent} showsVerticalScrollIndicator={true}>
            <View style={styles.tableHeader}>
              <ThemedText style={[styles.tableCell, styles.headerCell]}>#</ThemedText>
              <ThemedText style={[styles.tableCell, styles.headerCell]}>Word</ThemedText>
              {typeof words[0] === "object" && words[0].english !== undefined && (
                <ThemedText style={[styles.tableCell, styles.headerCell]}>English</ThemedText>
              )}
            </View>
            {words.map((w, idx) => (
              <View key={idx} style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>{idx + 1}</ThemedText>
                <ThemedText style={styles.tableCell}>{typeof w === "string" ? w : w.value}</ThemedText>
                {typeof w === "object" && w.english !== undefined && (
                  <ThemedText style={styles.tableCell}>{w.english}</ThemedText>
                )}
              </View>
            ))}
            {/* Spacer to ensure last row is visible above bottom edge */}
            <View style={{ height: 32 }} />
          </ScrollView>
        )}
      </View>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c20",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#228B22",
    alignSelf: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    marginRight: 8,
    color: "#fff",
    backgroundColor: "#23272e",
  },
  addButton: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 2,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
    marginTop: 4,
  },
  wordsList: {
    marginTop: 8,
    flex: 1,
    minHeight: 120,
    // Ensure the table fills available space
    justifyContent: "flex-start",
  },
  tableScroll: {
    flex: 1,
    backgroundColor: "rgba(34, 139, 34, 0.03)",
  },
  tableContent: {
    paddingBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(34, 139, 34, 0.13)",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "700",
    color: "#228B22",
    fontSize: 16,
  },
  wordItem: {
    fontSize: 18,
    marginVertical: 4,
    color: "#333",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(34, 139, 34, 0.05)",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
  },
});
