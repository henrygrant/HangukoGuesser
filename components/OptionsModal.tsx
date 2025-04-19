import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";
import { useAppStore } from "@/stores/useAppStore";

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  language: "korean" | "english";
  setLanguage: (language: "korean" | "english") => void;
}

export function OptionsModal({
  visible,
  onClose,
  language,
  setLanguage,
}: OptionsModalProps) {
  const router = useRouter();
  const { theme, setTheme } = useAppStore();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.title}>Settings</ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Initial Language</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  language === "korean" && styles.buttonSelected,
                ]}
                onPress={() => setLanguage("korean")}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    language === "korean" && styles.buttonTextSelected,
                  ]}
                >
                  Korean
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  language === "english" && styles.buttonSelected,
                ]}
                onPress={() => setLanguage("english")}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    language === "english" && styles.buttonTextSelected,
                  ]}
                >
                  English
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Theme</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  theme === "light" && styles.buttonSelected,
                ]}
                onPress={() => setTheme("light")}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    theme === "light" && styles.buttonTextSelected,
                  ]}
                >
                  Light
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  theme === "dark" && styles.buttonSelected,
                ]}
                onPress={() => setTheme("dark")}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    theme === "dark" && styles.buttonTextSelected,
                  ]}
                >
                  Dark
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  theme === "system" && styles.buttonSelected,
                ]}
                onPress={() => setTheme("system")}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    theme === "system" && styles.buttonTextSelected,
                  ]}
                >
                  System
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View> */}

          <TouchableOpacity
            style={styles.addWordsButton}
            onPress={() => {
              onClose();
              setTimeout(() => router.push("/manage-words"), 300);
            }}
            accessibilityLabel="Go to Manage Words"
          >
            <ThemedText style={styles.addWordsText}>Manage Words</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addWordsButton}
            onPress={() => {
              onClose();
              setTimeout(() => router.push("/manage-sentences"), 300);
            }}
            accessibilityLabel="Go to Manage Sentences"
          >
            <ThemedText style={styles.addWordsText}>Manage Sentences</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addWordsButton}
            onPress={() => {
              onClose();
              setTimeout(() => router.push("/manage-api-keys"), 300);
            }}
            accessibilityLabel="Go to Manage API Keys"
          >
            <ThemedText style={styles.addWordsText}>Manage API Keys</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close Settings">
            <ThemedText style={styles.closeButtonText}>Done</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    opacity: 0.8,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(34, 139, 34, 0.2)",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: "rgba(34, 139, 34, 0.1)",
    borderColor: "#228B22",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextSelected: {
    color: "#228B22",
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  addWordsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#228B22",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  addWordsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
});
