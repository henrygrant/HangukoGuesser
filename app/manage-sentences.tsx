import { StyleSheet, FlatList, View, TouchableOpacity, ActivityIndicator, TextInput, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppStore } from "@/stores/useAppStore";
import SentenceDetail from "@/components/SentenceDetail";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import Badge from "@/components/Badge";
import { AlertDialog } from "@/components/AlertDialog";

export default function SentencesScreen() {
  const {
    sentences,
    generateSentences,
    error,
    isLoading,
    removeSentence,
    removeAllSentences,
    words,
    openrouterApiKey
  } = useAppStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    buttons: { text: string; style?: "default" | "cancel"; onPress: () => void; }[];
  } | null>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleGeneratePress = () => {
    if (!openrouterApiKey) {
      setAlertConfig({
        title: "API Key Required",
        message: "Please set your OpenRouter API key in Settings > Manage API Keys to generate sentences.",
        buttons: [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setShowAlert(false)
          },
          {
            text: "Set API Key",
            onPress: () => {
              setShowAlert(false);
              router.push("/manage-api-keys")
            }
          }
        ]
      });
      setShowAlert(true);
      return;
    }
    generateSentences(words.filter(w => w.selected));
  };

  const handleRemoveAllPress = () => {
    setAlertConfig({
      title: "Delete All Sentences",
      message: "Are you sure you want to delete all sentences? This cannot be undone.",
      buttons: [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setShowAlert(false)
        },
        {
          text: "Delete All",
          onPress: () => {
            setShowAlert(false);
            removeAllSentences();
          }
        }
      ]
    });
    setShowAlert(true);
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
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <ThemedText>← Back</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>Sentences</ThemedText>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search sentences..."
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.badgeRow}>
          <Badge
            text={`${filteredSentences.length} sentence${filteredSentences.length === 1 ? "" : "s"}`}
          />
          {filteredSentences.length > 0 && (
            <TouchableOpacity
              onPress={handleRemoveAllPress}
            >
              <Badge text="Delete All" color="#cc0000" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleGeneratePress}>
            <Badge
              text={isLoading ? "Generating..." : "Generate"}
              color={isLoading ? "#666" : "#228B22"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          {error.includes("API key") && (
            <TouchableOpacity
              style={styles.errorButton}
              onPress={() => router.push("/manage-api-keys")}
            >
              <ThemedText style={styles.errorButtonText}>Set API Key</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={filteredSentences}
        keyExtractor={(item, index) => `${item.korean}-${index}`}
        renderItem={({ item }) => (
          <SentenceDetail
            sentence={item}
            onDelete={() => removeSentence(item)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {alertConfig && (
        <AlertDialog
          visible={showAlert}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onDismiss={() => setShowAlert(false)}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  searchContainer: {
    paddingVertical: 8,
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
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
  errorContainer: {
    backgroundColor: "#cc000022",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#cc0000",
    flex: 1,
    marginRight: 16,
  },
  errorButton: {
    backgroundColor: "#cc0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
