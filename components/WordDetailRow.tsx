import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface WordDetailRowProps {
  index: number;
  word: string | { value: string; english?: string };
}

export const WordDetailRow = ({ index, word }: WordDetailRowProps) => {
  return (
    <View style={styles.tableRow}>
      <ThemedText style={styles.tableCell}>{index + 1}</ThemedText>
      <ThemedText style={styles.tableCell}>{typeof word === "string" ? word : word.value}</ThemedText>
      {typeof word === "object" && word.english !== undefined && (
        <ThemedText style={styles.tableCell}>{word.english}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
})