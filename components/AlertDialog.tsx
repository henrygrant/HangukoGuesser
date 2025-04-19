import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: {
    text: string;
    style?: "default" | "cancel";
    onPress: () => void;
  }[];
  onDismiss?: () => void;
}

export function AlertDialog({ visible, title, message, buttons, onDismiss }: AlertDialogProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === "cancel" && styles.cancelButton,
                ]}
                onPress={button.onPress}
              >
                <ThemedText style={[
                  styles.buttonText,
                  button.style === "cancel" && styles.cancelButtonText
                ]}>
                  {button.text}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: 500,
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#666",
  },
});
