import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Word } from "@/types";

interface WordDetailRowProps {
  index: number;
  word: Word;
}

export const WordDetailRow = ({ index, word }: WordDetailRowProps) => {
  return (
    <View style={styles.tableRow}>
      <ThemedText style={styles.tableCell}>{word.value}</ThemedText>
      <ThemedText style={styles.tableCell}>{word.english ? word.english : ""}</ThemedText>
      <ThemedText style={styles.tableCell}>{word.type ? word.type : ""}</ThemedText>
      <ThemedText style={styles.tableCell}>{word.past ? word.past : ""}</ThemedText>
      <ThemedText style={styles.tableCell}>{word.present ? word.present : ""}</ThemedText>
      <ThemedText style={styles.tableCell}>{word.future ? word.future : ""}</ThemedText>
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