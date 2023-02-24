import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function EditScreen({ route, navigation }) {
  //console.log(appName);
  return (
    <View>
      <Text>
        You are viewing details of {route.params.goalItem.text} with id:{" "}
        {route.params.goalItem.id}{" "}
      </Text>
    </View>
  );
}
