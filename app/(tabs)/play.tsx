import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useSentenceList } from "@/hooks/useSentenceList";
import { useState } from "react";
import { IconSymbol } from "@/components/IconSymbol";
import { SentenceCard } from "@/components/SentenceCard";
import { OptionsModal } from "@/components/OptionsModal";

export default function PlayScreen() {
  const { sentences } = useSentenceList();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [language, setLanguage] = useState<"korean" | "english">("korean");
  const [numSentences, setNumSentences] = useState<number>(1);

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setModalVisible(true)}
      >
        <IconSymbol name="gear" size={28} color="#228B22" />
      </TouchableOpacity>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        language={language}
        setLanguage={setLanguage}
        numSentences={numSentences}
        setNumSentences={setNumSentences}
      />

      <FlatList
        data={sentences}
        renderItem={({ item }) => (
          <SentenceCard sentence={item} initialLanguage={language} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingsButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
});
