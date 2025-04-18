import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Sentence } from "@/types";

interface SentenceCardProps {
  sentence: Sentence;
  initialLanguage: "korean" | "english";
}

const SentenceCard = ({ sentence, initialLanguage }: SentenceCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [shownLanguage, setShownLanguage] = useState<"korean" | "english">(
    initialLanguage
  );

  useEffect(() => {
    setShownLanguage(initialLanguage);
    setFlipped(false);
  }, [initialLanguage]);

  useEffect(() => {
    if (flipped) {
      shownLanguage === "korean"
        ? setShownLanguage("english")
        : setShownLanguage("korean");
    }
  }, [flipped]);

  const flipAnimation = new Animated.Value(0, {
    useNativeDriver: Platform.OS !== "web",
  });
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const handleFlip = () => {
    setFlipped(!flipped);
    Animated.spring(flipAnimation, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  };

  return (
    <TouchableOpacity onPress={handleFlip}>
      <View style={styles.card}>
        <Animated.View
          style={[
            styles.face,
            styles.faceFront,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          <ThemedText style={styles.text}>
            {shownLanguage === "korean" ? sentence.korean : sentence.english}
          </ThemedText>
        </Animated.View>
        <Animated.View
          style={[
            styles.face,
            styles.faceBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          <ThemedText style={styles.text}>
            {shownLanguage === "korean" ? sentence.english : sentence.korean}
          </ThemedText>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    margin: 10,
  },
  face: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  faceFront: {
    backgroundColor: "#f0f0f0",
  },
  faceBack: {
    backgroundColor: "#ddd",
    position: "absolute",
    top: 0,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
});

export default SentenceCard;
