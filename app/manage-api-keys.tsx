import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAppStore } from "@/stores/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ManageApiKeysScreen() {
  const { openrouterApiKey, elevenlabsApiKey, setOpenrouterApiKey, setElevenlabsApiKey } = useAppStore();
  const [showOpenrouterKey, setShowOpenrouterKey] = useState(false);
  const [showElevenlabsKey, setShowElevenlabsKey] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <ThemedText>← Home</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>API Keys</ThemedText>
          <View style={{ width: 50 }} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>OpenRouter API Key</ThemedText>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={openrouterApiKey}
              onChangeText={setOpenrouterApiKey}
              placeholder="Enter OpenRouter API key"
              placeholderTextColor="#666"
              secureTextEntry={!showOpenrouterKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowOpenrouterKey(!showOpenrouterKey)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showOpenrouterKey ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>ElevenLabs API Key</ThemedText>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={elevenlabsApiKey}
              onChangeText={setElevenlabsApiKey}
              placeholder="Enter ElevenLabs API key"
              placeholderTextColor="#666"
              secureTextEntry={!showElevenlabsKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowElevenlabsKey(!showElevenlabsKey)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showElevenlabsKey ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c20",
    padding: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#fff"
  },
  eyeButton: {
    padding: 8,
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
