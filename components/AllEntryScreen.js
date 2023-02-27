import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Button, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import EntryList from "./EntryList";
import AddEntryScreen from "./AddEntryScreen";
import { deleteFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { firestore } from "../Firebase/firebase-setup";
import { Colors } from "../helper/Color";

export default function AllEntryScreen({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [limit, setLimit] = useState(500);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "goals"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let docs = [];
          querySnapshot.docs.forEach((snap) => {
            const { description, calories } = snap.data();
            docs.push({ description, calories, id: snap.id });
          });
          setGoals(docs);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const overLimitGoals = goals.filter((goal) => goal.calories > limit);

  function goalItemPressed(goal) {
    navigation.navigate("Edit", { goalItem: goal });
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar style="auto" />

      <View>
        <FlatList
          data={goals}
          renderItem={({ item }) => {
            return <EntryList goal={item} onGoalPress={goalItemPressed} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
});
