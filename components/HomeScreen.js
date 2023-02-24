import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import EntryList from "./EntryList";

import AddEntryScreen from "./AddEntryScreen";
import { deleteFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { firestore } from "../Firebase/firebase-setup";

export default HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "goals"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setGoals([]);
        } else {
          let docs = [];
          // we want to update goals array with the data THAT we get in this array
          querySnapshot.docs.forEach((snap) => {
            console.log(snap.id);
            return docs.push({ ...snap.data(), id: snap.id });
          });
          console.log(docs);
          setGoals(docs);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  // const name = "CS 5520"; //js variable
  // writeToDB({ text: "test" });
  // const [enteredText, setEnteredText] = useState("Your goals appear here");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // this function is called on Confirm
  // call writeToDB in this function
  function onTextEnter(changedText) {
    let newGoal = { text: changedText }; //, id: Math.random() };
    console.log(newGoal);
    // update this function to save the text in our goals array
    // as an object {text: changeText, id:...}
    writeToDB(newGoal);
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });

    // setEnteredText(changedText);
    setModalVisible(false);
  }
  function onCancel() {
    setModalVisible(false);
  }
  function onDeletePressed(deletedId) {
    // console.log("delete pressed ", deletedId);
    // let newGoals = goals.filter((goal) => {
    //   goal.id !== deletedId;
    // });
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goal) => {
    //     return goal.id !== deletedId;
    //   });
    // });
    deleteFromDB(deletedId);
  }
  function goalItemPressed(goal) {
    console.log("goal item pressed ", goal);
    // navigate to GoalDetails here and pass goal object
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
            // console.log({ item });
            return (
              <EntryList
                goal={item}
                onGo
                onDelete={onDeletePressed}
                onGoalPress={goalItemPressed}
              />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContentContainer}> */}
        {/* {goals.map((goal) => {
          return (
            <View key={goal.id} style={styles.textContainer}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          );
        })} */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    backgroundColor: "#fff",
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
