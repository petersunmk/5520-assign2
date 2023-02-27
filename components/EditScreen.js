import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

import { firestore } from "../Firebase/firebase-setup";
import { deleteFromDB } from "../Firebase/firestoreHelper";
import { Colors } from "../helper/Color";
import { updateDoc, doc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";

export default function EditListScreen({ route, navigation }) {
  const { id, description, calories, isReviewed } = route.params.goalItem;

  const [isOverLimit, setIsOverLimit] = useState(calories > 500);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete "${description}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteFromDB(id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleReviewed = async () => {
    const goalRef = doc(firestore, "goals", id);
    const updatedFields = {
      isReviewed: true,
    };
    Alert.alert(
      "Confirm Review",
      `Are you sure you want to Review  "${description}" Out of 'Over-Limit'?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Review",
          style: "destructive",
          onPress: async () => {
            await updateDoc(goalRef, updatedFields);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Calories:{calories}</Text>
        <Text style={styles.text}>Description:{description}</Text>
      </View>
      {isOverLimit && !isReviewed ? (
        <>
          <Text style={styles.overLimitText}>Over Limit</Text>

          <TouchableOpacity style={styles.button} onPress={handleReviewed}>
            <Text style={styles.buttonText}>Mark as Reviewed</Text>
            <FontAwesome
              name="check"
              size={20}
              color={Colors.activeBottomTabColor}
            />
          </TouchableOpacity>
        </>
      ) : null}

      <TouchableOpacity style={[styles.button]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
        <FontAwesome
          name="trash"
          size={20}
          color={Colors.activeBottomTabColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.headerColor,
    borderRadius: 25,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  overLimitText: {
    fontSize: 20,
    color: Colors.activeBottomTabColor,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.headerColor,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,

    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
