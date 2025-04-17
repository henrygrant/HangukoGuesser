import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Slider from "@react-native-community/slider";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  language: "korean" | "english";
  setLanguage: (language: "korean" | "english") => void;
  numSentences: number;
  setNumSentences: (num: number) => void;
}

export function OptionsModal({
  visible,
  onClose,
  language,
  setLanguage,
  numSentences,
  setNumSentences,
}: OptionsModalProps) {
  const colorScheme = useColorScheme() ?? "light";
  const tintColor = Colors[colorScheme].tint;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalView}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            Options
          </ThemedText>

          <View style={styles.optionRow}>
            <ThemedText style={styles.optionLabel}>Output Language:</ThemedText>
            <View style={styles.optionControl}>
              <ThemedText>Korean</ThemedText>
              <Switch
                trackColor={{
                  false: "#767577",
                  true: Colors[colorScheme].tint,
                }}
                thumbColor={language === "english" ? tintColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setLanguage(language === "korean" ? "english" : "korean")
                }
                value={language === "english"}
              />
              <ThemedText>English</ThemedText>
            </View>
          </View>

          <View style={styles.optionRow}>
            <ThemedText style={styles.optionLabel}>
              Number of Sentences: {numSentences}
            </ThemedText>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={numSentences}
                onValueChange={(value: number) => setNumSentences(value)}
                minimumTrackTintColor={tintColor}
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <ThemedText style={styles.buttonText}>Save Options</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },
  modalTitle: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  optionControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150,
  },
  sliderContainer: {
    width: "100%",
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
