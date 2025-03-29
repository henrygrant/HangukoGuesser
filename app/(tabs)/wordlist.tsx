import { StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import words from "@/assets/words.json";

export default function TabTwoScreen() {
  const handleWordPress = (word: string) => {
    // generate(word);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Korean Words
      </ThemedText>
      <FlatList
        data={words}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleWordPress(item)}
            style={styles.wordItem}
          >
            <>
              <ThemedText style={styles.wordText}>{item}</ThemedText>
            </>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
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
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  wordItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  wordText: {
    fontSize: 16,
  },
});
