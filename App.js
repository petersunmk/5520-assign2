import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HomeScreen from "./components/HomeScreen";
// import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "./components/EditScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddEntryScreen from "./components/AddEntryScreen";

const Stack = createNativeStackNavigator();

// export default function App() {
//   // const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="All Entries">
//         <Stack.Screen
//           name="Edit"
//           component={EditScreen}
//           options={{
//             headerBackTitle: "Back",
//           }}
//         />
//         <Stack.Screen
//           name="All Entries"
//           component={HomeScreen}
//           options={({ navigation }) => ({
//             headerRight: () => (
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate("Add An Entry");
//                 }}
//               >
//                 <Ionicons name="add" size={24} color="black" />
//               </TouchableOpacity>
//             ),
//           })}
//         />
//         {/* {(props) => (
//             <Home
//               {...props}
//               modalVisible={modalVisible}
//               setModalVisible={setModalVisible}
//             />
//           )} */}
//         {/* </Stack.Screen> */}
//         <Stack.Screen
//           name="Add An Entry"
//           component={AddEntryScreen}
//           options={{
//             headerBackTitle: "Back",
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="All Entries">
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="All Entries"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Add An Entry");
                }}
              >
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Add An Entry"
          component={AddEntryScreen}
          options={{
            headerBackTitle: "Back",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
