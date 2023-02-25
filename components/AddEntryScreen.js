// import { View, Text, StyleSheet } from "react-native";
// import React from "react";

// export default function AddEntryScreen() {
//   //console.log(appName);
//   return (
//     <View>
//       <Text>Add an entity;</Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { writeToDB } from "../Firebase/firestoreHelper";

const AddEntryScreen = ({ navigation }) => {
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!calories || !description || isNaN(calories) || calories < 0) {
      Alert.alert("Invalid input", "Please enter valid input.");
      return;
    }

    const entry = {
      calories: parseInt(calories),
      description: description,
    };

    writeToDB(entry)
      .then((docRef) => {
        navigation.navigate("All Entries");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter calories"
        onChangeText={(text) => setCalories(text)}
        value={calories}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddEntryScreen;

// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Modal,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { useState } from "react";
// import PressableButton from "./PressableButton";

// export default function Input() {
// // {
// //   // textUpdateFunction,
// //   // modalIsVisible,
// //   // onCancel,
// // }
//   // const [text, setText] = useState("");
//   // function updateText() {
//   //   textUpdateFunction(text);
//   // }

//   return (
//     <View>
//       <Text>
//         Add an entity
//         {/* You are viewing details of {route.params.goalItem.text} with id:{" "}
//         {route.params.goalItem.id}{" "} */}
//       </Text>
//     </View>
//   );
// }
//   return (
//     <Modal visible={modalIsVisible} animationType="slide">
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={text}
//           onChangeText={(changedText) => {
//             setText(changedText);
//           }}
//         />
//         <View style={styles.buttonContainer}>
//           <View style={styles.button}>
//             <Button
//               disabled={text.length === 0 ? true : false}
//               title="Confirm"
//               onPress={() => {
//                 textUpdateFunction(text);
//                 setText("");
//               }}
//             />
//           </View>
//           {/* <View style={styles.button}>
//             <Button title="Cancel" onPress={onCancel} />
//           </View> */}
//           <PressableButton
//             pressHandler={onCancel}
//             style={{ backgroundColor: "lightgreen" }}
//           >
//             <Text>Cancel</Text>
//           </PressableButton>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#aaa",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   input: {
//     borderBottomColor: "rebeccapurple",
//     borderBottomWidth: 2,
//     width: "50%",
//     marginVertical: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//   },
//   button: { width: "30%", marginHorizontal: 5, color: "red" },
// });
