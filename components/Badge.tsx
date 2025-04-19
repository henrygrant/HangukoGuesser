import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface BadgeProps {
  text: string;
  color?: string;
  style?: object;
  textStyle?: object;
  testID?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color = "#228B22", style, textStyle, testID }) => (
  <View style={[styles.badge, { backgroundColor: `${color}22` }, style]} testID={testID}>
    <ThemedText style={[styles.text, { color }, textStyle]}>{text}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Badge;
