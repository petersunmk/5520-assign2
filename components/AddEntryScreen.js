import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { writeToDB } from "../Firebase/firestoreHelper";

const AddEntryScreen = ({ navigation }) => {
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const descriptionInputRef = useRef(null);

  const handleSubmit = () => {
    if (!calories || !description || isNaN(calories) || calories <= 0) {
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

  const handleReset = () => {
    setCalories("");
    setDescription("");
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
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
        ref={descriptionInputRef}
        style={styles.input}
        placeholder="Enter description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={handleReset} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default AddEntryScreen;
