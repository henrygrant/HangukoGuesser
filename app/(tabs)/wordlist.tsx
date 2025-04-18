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
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function WordListScreen() {
  const { words, toggleWordSelection } = useWordList();
  const { sentences } = useSentenceList();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleWordPress = (word: string) => {
    toggleWordSelection(word);
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
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search words..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <TouchableOpacity style={styles.addWordsButton} onPress={() => router.push("/manage-words")}>
          <IconSymbol name="plus" size={20} color="#fff" />
          <ThemedText style={styles.addWordsText}>Manage Words</ThemedText>
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    marginRight: 8,
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
  addWordsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#228B22",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addWordsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
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
