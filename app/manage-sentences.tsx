import { StyleSheet, FlatList, View, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSentenceList } from "@/hooks/useSentenceList";
import SentenceDetail from "@/components/SentenceDetail";
import { useState, useMemo } from "react";

export default function SentencesScreen() {
  const { sentences, generateSentences, error, isLoading } = useSentenceList();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const insets = useSafeAreaInsets();

  const handleGeneratePress = () => {
    generateSentences([]);  // Pass empty array to use all words
  };

  const filteredSentences = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return sentences;
    
    return sentences.filter(sentence => 
      sentence.korean.toLowerCase().includes(query) || 
      sentence.english.toLowerCase().includes(query)
    );
  }, [sentences, searchQuery]);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <TouchableOpacity style={styles.button} onPress={handleGeneratePress}>
        <ThemedText style={styles.buttonText}>Generate Sentences</ThemedText>
      </TouchableOpacity>

      <View style={styles.badgeContainer}>
        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>
            {filteredSentences.length} of {sentences.length} {sentences.length === 1 ? "sentence" : "sentences"}
          </ThemedText>
        </ThemedView>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search sentences..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7f7f7f"
        />
      </View>

      {error && (
        <View style={styles.messageContainer}>
          <ThemedText style={[styles.messageText, { color: "red" }]}>
            {error}
          </ThemedText>
        </View>
      )}

      {isLoading && (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="#228B22" />
        </View>
      )}

      <FlatList
        data={filteredSentences}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <SentenceDetail sentence={item} />}
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
  button: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
  listContainer: {
    paddingBottom: 16,
  },
  separator: {
    height: 12,
  },
  messageContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
