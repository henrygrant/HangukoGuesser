import {
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useWordList } from "@/hooks/useWordList";

export default function WordListScreen() {
  const { words, addWord, toggleWordSelection } = useWordList();
  const [newWord, setNewWord] = useState<string>("");

  const handleWordPress = (word: string) => {
    toggleWordSelection(word);
  };

  const handleAddWord = () => {
    const success = addWord(newWord);

    if (success) {
      setNewWord("");
      Alert.alert("Success", "Word added successfully");
    } else {
      if (newWord.trim() === "") {
        Alert.alert("Error", "Please enter a word");
      } else {
        Alert.alert("Error", "This word already exists in the list");
      }
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedText type="title" style={styles.title}>
        Korean Words
      </ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a Korean word"
          value={newWord}
          onChangeText={setNewWord}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
          <ThemedText style={styles.buttonText}>Add</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={words}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleWordPress(item.value)}
            style={[styles.wordItem, item.selected && styles.selectedWordItem]}
          >
            <ThemedText
              style={[
                styles.wordText,
                item.selected && styles.selectedWordText,
              ]}
            >
              {item.value}
              {/* {JSON.stringify(item)} */}
            </ThemedText>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
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
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 24,
  },
  wordItem: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(100, 100, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedWordItem: {
    backgroundColor: "rgba(100, 255, 100, 0.2)",
    borderColor: "#007AFF",
  },
  wordText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedWordText: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  separator: {
    height: 12,
  },
});
