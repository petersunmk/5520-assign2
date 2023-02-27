import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../helper/Color";
export default function PressableButton({ goal, onGoalPress, pressStatus }) {
  // console.log(props);
  return (
    <Pressable
      key={goal.id}
      style={({ pressed }) => {
        return [styles.container, pressed ? styles.pressedStyle : null];
      }}
      onPress={() => onGoalPress(goal)}
    >
      <View style={styles.entryContainer}>
        <Text style={styles.entryDescription}>{goal.description}</Text>
        {pressStatus && !goal.isReviewed ? (
          <FontAwesome
            name="exclamation-triangle"
            size={20}
            color={Colors.activeBottomTabColor}
            style={styles.icon}
          />
        ) : null}
        <View style={styles.button}>
          <Text>{goal.calories.toString()} </Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.headerColor,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
  },

  entryDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: "50%",
  },

  button: {
    backgroundColor: "#fff",
    width: 70,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },

  icon: {
    marginRight: 2,
  },
});
