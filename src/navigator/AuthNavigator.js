import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import { Login, Signup } from "../screens";

const AppStack = createStackNavigator();

const AuthNavigator = (props) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerTitleAlign: "center" }}
      />
    </AppStack.Navigator>
  );
};

export default AuthNavigator;
