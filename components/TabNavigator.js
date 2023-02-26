import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllEntryScreen from "./AllEntryScreen";
import OverLimitScreen from "./OverLimitScreen";
import { Ionicons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = (navigation) => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#f4511e" },
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
    >
      <Tab.Screen
        name="All Entries"
        component={AllEntryScreen}
        options={{
          title: "All Entries",
          tabBarLabel: "All Entries",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dollar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Over-Limit Entries"
        component={OverLimitScreen}
        options={{
          title: "Over-Limit Entries",
          tabBarLabel: "Over-Limit Entries",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
