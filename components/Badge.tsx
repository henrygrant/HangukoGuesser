import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, style, textStyle, testID }) => (
  <View style={[styles.badge, style]} testID={testID}>
    <Text style={[styles.badgeText, textStyle]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(34, 139, 34, 0.1)",
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#228B22",
  },
});

export default Badge;
