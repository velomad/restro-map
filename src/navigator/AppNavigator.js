import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import { Onboarding, Home, Booking } from "../screens";

// Stack Screens
import AuthNavigator from "./AuthNavigator";

const AppStack = createStackNavigator();

const AppNavigator = (props) => {
  if (props.isFirstLaunch === null) {
    return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name="Booking"
            component={Booking}
            options={{
              headerTitleAlign: "center",
            }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  } else if (props.isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigator;
