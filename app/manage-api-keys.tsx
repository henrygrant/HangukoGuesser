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
});
