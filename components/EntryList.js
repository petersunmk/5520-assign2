import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";

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
      <PressableButton
        goal={goal}
        onGoalPress={onGoalPress}
        pressStatus={isOverLimit}
      />
    </View>
  );
};

export default EntryList;
