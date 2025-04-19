import { StyleSheet, FlatList, View, TouchableOpacity, ActivityIndicator, TextInput, Alert, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSentenceList } from "@/hooks/useSentenceList";
import SentenceDetail from "@/components/SentenceDetail";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import Badge from "@/components/Badge";

export default function SentencesScreen() {
  const { sentences, generateSentences, error, isLoading, removeSentence, removeAllSentences } = useSentenceList();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
      <View style={styles.topRow}>
        <TouchableOpacity
          style={[styles.topRowButton, styles.goBackButton]}
          onPress={() => router.push("/")}
          accessibilityLabel="Go back home"
        >
          <ThemedText style={styles.goBackText}>{"← Home"}</ThemedText>
        </TouchableOpacity>
        <TextInput
          style={styles.topRowInput}
          placeholder="Search sentences..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7f7f7f"
        />
        <TouchableOpacity style={[styles.topRowButton, styles.generateButton]} onPress={handleGeneratePress}>
          <ThemedText style={styles.buttonText}>Generate</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.badgeContainer}>
        <Badge>
          {searchQuery
            ? `${filteredSentences.length} of ${sentences.length} ${sentences.length === 1 ? "sentence" : "sentences"}`
            : `${sentences.length} ${sentences.length === 1 ? "sentence" : "sentences"}`}
        </Badge>
        {sentences.length > 0 && (
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={() => {
              if (Platform.OS === "web") {
                if (window.confirm("Are you sure you want to delete ALL sentences?")) {
                  removeAllSentences();
                }
              } else {
                Alert.alert(
                  "Delete All Sentences",
                  "Are you sure you want to delete ALL sentences?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete All", style: "destructive", onPress: removeAllSentences },
                  ]
                );
              }
            }}
            accessibilityLabel="Delete all sentences"
          >
            <ThemedText style={styles.deleteAllText}>Delete All</ThemedText>
          </TouchableOpacity>
        )}
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
        renderItem={({ item }) => (
          <SentenceDetail
            sentence={item}
            onDelete={() => {
              if (Platform.OS === "web") {
                if (window.confirm("Are you sure you want to delete this sentence?")) {
                  removeSentence(item);
                }
              } else {
                Alert.alert(
                  "Delete Sentence",
                  "Are you sure you want to delete this sentence?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => removeSentence(item) },
                  ]
                );
              }
            }}
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  topRowButton: {
    height: 48,
    minWidth: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  topRowInput: {
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginHorizontal: 8,
  },
  goBackButton: {
    backgroundColor: "rgba(34, 139, 34, 0.1)",
  },
  generateButton: {
    backgroundColor: "#228B22",
    marginLeft: 0,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#228B22",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  deleteAllButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(204,0,0,0.13)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  deleteAllText: {
    color: '#cc0000',
    fontWeight: 'bold',
    fontSize: 14,
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
