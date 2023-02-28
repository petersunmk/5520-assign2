import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

import { Colors } from "../helper/Color";

// Button component that can be pressed

export default function PressableButton({ title, handlePressed }) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [styles.button, pressed ? styles.pressedStyle : null];
      }}
      onPress={handlePressed}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.headerColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pressedStyle: { opacity: 0.5 },
});
