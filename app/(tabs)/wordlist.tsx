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
import { useState, useMemo } from "react";
import { useWordList } from "@/hooks/useWordList";
import { useSentenceList } from "@/hooks/useSentenceList";
import WordDetail from "@/components/WordDetail";

export default function WordListScreen() {
  const { words, addWord, toggleWordSelection } = useWordList();
  const { sentences } = useSentenceList();
  const [newWord, setNewWord] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const insets = useSafeAreaInsets();

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

  const filteredWords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return words;
    
    return words.filter(word => 
      word.value.toLowerCase().includes(query) || 
      (word.english?.toLowerCase().includes(query) ?? false)
    );
  }, [words, searchQuery]);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search words..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7f7f7f"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a Korean word"
          value={newWord}
          onChangeText={setNewWord}
          placeholderTextColor="#7f7f7f"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
          <ThemedText style={styles.buttonText}>Add</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.badgeContainer}>
        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>
            {filteredWords.length} of {words.length} {words.length === 1 ? "word" : "words"}
          </ThemedText>
        </ThemedView>
      </View>

      <FlatList
        data={filteredWords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <WordDetail
            word={item}
            selected={item.selected}
            onPress={handleWordPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
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
    backgroundColor: "#228B22",
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
    paddingBottom: 16,
  },
  separator: {
    height: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(34, 139, 34, 0.1)",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#228B22",
  },
});
