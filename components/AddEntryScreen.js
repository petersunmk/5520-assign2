import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function AddEntryScreen() {
  //console.log(appName);
  return (
    <View>
      <Text>Add an entity;</Text>
    </View>
  );
}

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
