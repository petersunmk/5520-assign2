// import { View, Text, StyleSheet } from "react-native";
// import React from "react";

// export default function EditScreen({ route, navigation }) {
//   //console.log(appName);
//   return (
//     <View>
//       <Text>
//         You are viewing details of {route.params.goalItem.text} with id:{" "}
//         {route.params.goalItem.id}{" "}
//       </Text>
//     </View>
//   );
// }
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
// import firestore from "@react-native-firebase/firestore";
import { firestore } from "../Firebase/firebase-setup";
export default function EditScreen({ route, navigation }) {
  const { id, text, isReviewed } = route.params.goalItem;
  const [reviewed, setReviewed] = useState(isReviewed);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete "${text}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            firestore()
              .collection("goals")
              .doc(id)
              .delete()
              .then(() => {
                navigation.navigate("EntryList");
              });
          },
        },
      ]
    );
  };

  const handleReview = () => {
    const newReviewedStatus = !reviewed;
    firestore()
      .collection("goals")
      .doc(id)
      .update({ isReviewed: newReviewedStatus })
      .then(() => {
        setReviewed(newReviewedStatus);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry Detail:</Text>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReview}>
        <Text style={styles.buttonText}>
          {reviewed ? "Mark as Unreviewed" : "Mark as Reviewed"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
