import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../helper/Color";
import { FontAwesome } from "@expo/vector-icons";

const EntryList = ({ goal, onGoalPress }) => {
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    if (goal.calories > 500) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  }, [goal.calories]);

  return (
    <View>
      <Pressable
        key={goal.id}
        style={({ pressed }) => {
          return [
            styles.container,
            pressed ? styles.pressedStyle : null,
            // isOverLimit ? styles.overLimitStyle : null,
          ];
        }}
        onPress={() => onGoalPress(goal)}
      >
        <View style={styles.entryContainer}>
          <Text style={styles.entryDescription}>{goal.description}</Text>
          {isOverLimit && !goal.isReviewed ? (
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
    </View>
  );
};

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

export default EntryList;
