import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Button, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import EntryList from "./EntryList";
import { firestore } from "../Firebase/firebase-setup";

export default function OverLimitScreen() {
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

      <View style={styles.bottomContainer}>
        <FlatList
          contentContainerStyle={styles.scrollViewContentContainer}
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
    alignItems: "stretch",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: "#888",
    marginVertical: 15,
    padding: 15,
  },
  text: {
    color: "#4510ff",
    fontSize: 30,
  },
});
