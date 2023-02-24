import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { FontAwesome } from "@expo/vector-icons";

export default function EntryList({ goal, onDelete, onGoalPress }) {
  function deleteHandler() {
    onDelete(goal.id);
    console.log(goal.id);
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => {
          // console.log("data from style ", data);
          return [styles.textContainer, pressed ? styles.pressedStyle : null];
        }}
        // android_ripple={{ color: "red" }}
        onPress={() => onGoalPress(goal)}
      >
        <Text style={styles.text}>{goal.text}</Text>
        {/* <Button
          color="black"
          title="Help"
          onPress={() => {
            testNavigation();
          }}
        /> */}
        <PressableButton
          style={{ backgroundColor: "yellow" }}
          title="X"
          pressHandler={deleteHandler}
        >
          <FontAwesome name="trash-o" size={24} color="black" />
        </PressableButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 5,
    backgroundColor: "#888",
    marginVertical: 15,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#4510ff",
    fontSize: 30,
    marginRight: 8,
  },
  pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },
});
