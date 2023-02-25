// import { View, Text, StyleSheet, Button, Pressable } from "react-native";
// import React from "react";
// import PressableButton from "./PressableButton";
// import { FontAwesome } from "@expo/vector-icons";

// export default function EntryList({ goal, onDelete, onGoalPress }) {
//   function deleteHandler() {
//     onDelete(goal.id, goal.name);
//     console.log(goal.id + " " + goal.name);
//   }

//   return (
//     <View>
//       <Pressable
//         style={({ pressed }) => {
//           // console.log("data from style ", data);
//           return [styles.textContainer, pressed ? styles.pressedStyle : null];
//         }}
//         // android_ripple={{ color: "red" }}
//         onPress={() => onGoalPress(goal)}
//       >
//         <View style={styles.details}>
//           <Text style={styles.name}>{goal.name}</Text>
//           <Text style={styles.calories}>{goal.calories} calories</Text>
//         </View>
//         {/* <Button
//           color="black"
//           title="Help"
//           onPress={() => {
//             testNavigation();
//           }}
//         /> */}
//         <PressableButton
//           style={{ backgroundColor: "yellow" }}
//           title="X"
//           pressHandler={deleteHandler}
//         >
//           <FontAwesome name="trash-o" size={24} color="black" />
//         </PressableButton>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textContainer: {
//     borderRadius: 5,
//     backgroundColor: "#888",
//     marginVertical: 15,
//     padding: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   text: {
//     color: "#4510ff",
//     fontSize: 30,
//     marginRight: 8,
//   },
//   details: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   name: {
//     color: "#4510ff",
//     fontSize: 30,
//     marginRight: 8,
//   },
//   calories: {
//     color: "#fff",
//     fontSize: 20,
//   },
//   pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },
// });
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import React, { useEffect, useState } from "react";
// import { FontAwesome } from "@expo/vector-icons";
// import { collection, onSnapshot, deleteDoc } from "firebase/firestore";
// import { firestore } from "../Firebase/firebase-setup";

// const EntryList = ({ goal, onDelete, onGoalPress }) => {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(firestore, `goals/${goal.id}/entries`),
//       (snapshot) => {
//         const updatedEntries = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setEntries(updatedEntries);
//       }
//     );
//     return () => unsubscribe();
//   }, [goal]);

//   function deleteHandler(entryId, entryName) {
//     deleteDoc(doc(firestore, `goals/${goal.id}/entries`, entryId));
//     console.log(entryId + " " + entryName);
//   }

//   return (
//     <>
//       {entries.map((entry) => (
//         <View key={entry.id}>
//           <Pressable
//             style={({ pressed }) => [
//               styles.textContainer,
//               pressed ? styles.pressedStyle : null,
//             ]}
//             onPress={() => onGoalPress(entry)}
//           >
//             <View style={styles.details}>
//               <Text style={styles.name}>{entry.description}</Text>
//               <Text style={styles.calories}>{entry.calories} calories</Text>
//             </View>
//             <Pressable
//               style={styles.deleteButton}
//               onPress={() => deleteHandler(entry.id, entry.description)}
//             >
//               <FontAwesome name="trash-o" size={24} color="black" />
//             </Pressable>
//           </Pressable>
//         </View>
//       ))}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   textContainer: {
//     borderRadius: 5,
//     backgroundColor: "#888",
//     marginVertical: 15,
//     padding: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   details: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   name: {
//     color: "#4510ff",
//     fontSize: 30,
//     marginRight: 8,
//   },
//   calories: {
//     color: "#fff",
//     fontSize: 20,
//   },
//   deleteButton: {
//     padding: 5,
//   },
//   pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },
// });
// export default EntryList;
import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase-setup";

const EntryList = ({ goal, onDelete, onGoalPress }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, `goals/${goal.id}/entries`),
      (snapshot) => {
        const updatedEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(updatedEntries);
      }
    );
    return () => unsubscribe();
  }, [goal]);

  function deleteHandler(entryId, entryName) {
    deleteDoc(doc(firestore, `goals/${goal.id}/entries/${entryId}`));
    console.log(entryId + " " + entryName);
  }

  return (
    <>
      {entries.map((entry) => (
        <View key={entry.id}>
          <Pressable
            style={({ pressed }) => [
              styles.textContainer,
              pressed ? styles.pressedStyle : null,
            ]}
            onPress={() => onGoalPress(entry)}
          >
            <View style={styles.details}>
              <Text style={styles.name}>{entry.description}</Text>
              <Text style={styles.calories}>{entry.calories} calories</Text>
            </View>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteHandler(entry.id, entry.description)}
            >
              <FontAwesome name="trash-o" size={24} color="black" />
            </Pressable>
          </Pressable>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 5,
    backgroundColor: "#888",
    marginVertical: 15,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  name: {
    color: "#4510ff",
    fontSize: 30,
    marginRight: 8,
  },
  calories: {
    color: "#fff",
    fontSize: 20,
  },
  deleteButton: {
    padding: 5,
  },
  pressedStyle: { backgroundColor: "#e9e", opacity: 0.5 },
});

export default EntryList;
