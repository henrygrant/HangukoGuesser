import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

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

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
    backgroundColor: "rgba(31,31,31,1)",
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
});
