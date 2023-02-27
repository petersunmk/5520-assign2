import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Button, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import EntryList from "./EntryList";
import { firestore } from "../Firebase/firebase-setup";
import { Colors } from "../helper/Color";

export default function OverLimitScreen({ navigation }) {
  const [overLimitGoals, setOverLimitGoals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "goals"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setOverLimitGoals([]);
        } else {
          let docs = [];
          querySnapshot.docs.forEach((snap) => {
            const { description, calories } = snap.data();
            if (calories > 500) {
              docs.push({ description, calories, id: snap.id });
            }
          });
          setOverLimitGoals(docs);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  function goalItemPressed(goal) {
    navigation.navigate("Edit", { goalItem: goal });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <FlatList
          data={overLimitGoals}
          renderItem={({ item }) => {
            return <EntryList goal={item} onGoalPress={goalItemPressed} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
});
