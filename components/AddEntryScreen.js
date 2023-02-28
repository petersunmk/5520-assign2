import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { writeToDB } from "../Firebase/firestoreHelper";
import { Colors } from "../helper/Color";
import PressableButton from "./PressableButton";

const AddEntryScreen = ({ navigation }) => {
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  const handleSubmit = () => {
    if (!calories || !description || isNaN(calories) || calories <= 0) {
      Alert.alert("Invalid input", "Please enter valid input.");
      return;
    }

    const entry = {
      calories: parseInt(calories),
      description: description,
      isReviewed: isReviewed,
    };

    writeToDB(entry)
      .then((docRef) => {
        navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleReset = () => {
    setCalories("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calories</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCalories(text)}
          value={calories}
          keyboardType="numeric"
          placeholder="Enter calories"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Enter description(max 20 characters)"
          maxLength={20}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton title="Reset" handlePressed={handleReset} />

        <PressableButton title="Submit" handlePressed={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    flex: 3,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.inputColor,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },

  pressedStyle: { opacity: 0.5 },
});

export default AddEntryScreen;
