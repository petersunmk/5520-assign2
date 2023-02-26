import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Button, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import EntryList from "./EntryList";
import AddEntryScreen from "./AddEntryScreen";
import { deleteFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { firestore } from "../Firebase/firebase-setup";

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.bottomContainer}>
        <FlatList
          contentContainerStyle={styles.scrollViewContentContainer}
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
