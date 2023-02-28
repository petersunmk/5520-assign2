import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllEntryScreen from "./components/AllEntryScreen";
import OverLimitScreen from "./components/OverLimitScreen";
import AddEntryScreen from "./components/AddEntryScreen";
import EditScreen from "./components/EditScreen";
import TabNavigator from "./components/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="All Entries" component={AllEntryScreen} />
        <Stack.Screen name="Over-Limit Entries" component={OverLimitScreen} />

        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: "#424497" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Add An Entry"
          component={AddEntryScreen}
          options={{
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: "#424497" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
