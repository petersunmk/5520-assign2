import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { writeToDB } from "../Firebase/firestoreHelper";
import { Colors } from "../helper/Color";

const AddEntryScreen = ({ navigation }) => {
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const descriptionInputRef = useRef(null);

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
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
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
          ref={descriptionInputRef}
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Enter description(max 20 characters)"
          maxLength={20}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: Colors.headerColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddEntryScreen;
