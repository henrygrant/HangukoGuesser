import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAppStore } from "@/stores/useAppStore";
import { useRouter } from "expo-router";
import Badge from "@/components/Badge";

export default function AddWordsScreen() {
  const { words, addWord } = useAppStore();
  const router = useRouter();
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
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.topRowButton}
          onPress={() => router.replace("/")}
          accessibilityLabel="Go back home"
        >
          <ThemedText style={{ color: "#fff", fontSize: 16 }}>{"← Home"}</ThemedText>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Add a new Korean word..."
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
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  topRowButton: {
    height: 48,
    minWidth: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#228B22",
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#23282d",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 16,
    marginRight: 8,
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
  generateButton: {
    marginLeft: 8,
  },
  wordsList: {
    marginTop: 8,
    flex: 1,
    minHeight: 120,
  },
  tableScroll: {
    flex: 1,
    minHeight: 120,
    backgroundColor: "rgba(34, 139, 34, 0.03)",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  tableContent: {
    paddingBottom: 32,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(34, 139, 34, 0.13)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#228B22",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(34, 139, 34, 0.08)",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "rgba(255,255,255,0.01)",
  },
  tableCell: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#228B22",
    fontSize: 16,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 24,
  },
});
