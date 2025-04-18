import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSentenceList } from "@/hooks/useSentenceList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SentencesScreen() {
  const { sentences } = useSentenceList();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={sentences}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.wordItem]}>
            <ThemedText style={[styles.wordText]}>{item.korean}</ThemedText>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        numColumns={1}
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
    borderColor: "#228B22",
  },
  wordText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedWordText: {
    fontWeight: "bold",
    color: "#228B22",
  },
  separator: {
    height: 12,
  },
  toggleButton: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
