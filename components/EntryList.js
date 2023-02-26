// import { View, Button, Text, StyleSheet, Pressable } from "react-native";
// import React, { useEffect, useState } from "react";
// import PressableButton from "./PressableButton";
// import { FontAwesome } from "@expo/vector-icons";
// import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
// import { firestore } from "../Firebase/firebase-setup";

// const EntryList = ({ goal, onGoalPress }) => {
//   return (
//     <View style={styles.entry}>
//       {/* console.log("entries: " + entries); */}
//       <Pressable
//         key={goal.id}
//         onPress={() => onGoalPress(goal)}
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? "#F0F0F0" : "#800080",
//           },
//         ]}
//       >
//         <View style={styles.entryContent}>
//           {/* console.log(entry.id + " " + entry.title); */}
//           <Text style={styles.entryDescription}>{goal.description}</Text>
//           <Text style={styles.entryTitle}>{goal.calories}</Text>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 16,
//   },
//   entry: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#DDD",
//     borderWidth: 10,
//   },
//   entryContent: {
//     flex: 1,
//   },
//   entryTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   entryDescription: {
//     fontSize: 16,
//     marginTop: 8,
//     color: "#666",
//   },
// });

// export default EntryList;
// const EntryList = ({ goal, onGoalPress }) => {
//   return (
//     <View>
//       <Pressable
//         key={goal.id}
//         style={({ pressed }) => {
//           // console.log("data from style ", data);
//           return [styles.container, pressed ? styles.pressedStyle : null];
//         }}
//         onPress={() => onGoalPress(goal)}
//       >
//         <View style={styles.entryContainer}>
//           <Text style={styles.entryDescription}>{goal.description}</Text>
//           <Button style={styles.button} title={goal.calories.toString()} />
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   entryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginVertical: 10,
//   },

//   entryDescription: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#444",
//     width: "50%",
//   },

//   button: {
//     backgroundColor: "#800080",
//     borderRadius: 5,
//     padding: 10,
//     margin: 5,
//     borderColor: "black",
//   },

//   pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },
// });

// export default EntryList;
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
const EntryList = ({ goal, onGoalPress }) => {
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    if (goal.calories > 500) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  }, [goal.calories]);

  return (
    <View>
      <Pressable
        key={goal.id}
        style={({ pressed }) => {
          return [
            styles.container,
            pressed ? styles.pressedStyle : null,
            isOverLimit ? styles.overLimitStyle : null,
          ];
        }}
        onPress={() => onGoalPress(goal)}
      >
        <View style={styles.entryContainer}>
          <Text style={styles.entryDescription}>{goal.description}</Text>
          <Button style={styles.button} title={goal.calories.toString()} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
  },

  entryDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    width: "50%",
  },

  button: {
    backgroundColor: "#800080",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    borderColor: "black",
  },

  pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },

  overLimitStyle: { backgroundColor: "#f00" },
});

export default EntryList;
