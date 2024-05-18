import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CaptureHistory,
  LiveBananaScreen,
  ImageStatsScreen,
  CaptureImageScreen,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FlagProvider } from "./utils/FlagContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AllImagesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Images" component={CaptureHistory} />
      <Stack.Screen name="Image Stats" component={ImageStatsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [flag, setFlag] = useState();
  return (
    <FlagProvider>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="History"
            component={AllImagesStack}
            options={{
              tabBarLabel: "All Images",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="history" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Capture Image"
            component={CaptureImageScreen}
            options={{
              tabBarLabel: "Capture Image",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="camera" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Check Bananas"
            component={LiveBananaScreen}
            options={{
              tabBarLabel: "Check Bananas",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="dashboard" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FlagProvider>
  );
};

export default App;
