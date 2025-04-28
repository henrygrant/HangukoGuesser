import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAppStore } from "@/stores/useAppStore";
import { useRouter } from "expo-router";
import Badge from "@/components/Badge";
import * as DocumentPicker from 'expo-document-picker';
import { parseKoreanVocab } from "@/services/anki";
import { WordDetailRow } from '@/components/WordDetailRow';



export default function AddWordsScreen() {
  const { words, addWord } = useAppStore();
  const router = useRouter();
  const [word, setWord] = useState("");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("#228B22");

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      // Read the file content
      const response = await fetch(result.assets[0].uri);
      const text = await response.text();

      // Parse the content and add words
      const koreanWords = parseKoreanVocab(text);
      let addedCount = 0;

      koreanWords.forEach(word => {
        if (addWord(word)) {
          addedCount++;
        }
      });

      setMessage(`Added ${addedCount} new words from file`);
      setMessageColor("#228B22");
    } catch (error) {
      setMessage("Error uploading file");
      setMessageColor("#cc0000");
    }
  };

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
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleFileUpload}
        accessibilityLabel="Upload text file"
      >
        <IconSymbol name="square.and.arrow.down" size={20} color="#228B22" />
        <ThemedText style={styles.uploadText}>Import from Text File</ThemedText>
      </TouchableOpacity>
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
              <WordDetailRow key={idx} index={idx} word={w} />
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
    paddingTop: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
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
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 16,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 16,
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
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonText: {
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
    marginTop: 24,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "500",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#228B22",
    marginBottom: 16,
    backgroundColor: "rgba(34, 139, 34, 0.1)",
    marginHorizontal: 16,
  },
});
