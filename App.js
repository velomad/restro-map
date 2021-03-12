import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Button,
} from "react-native";
import AppNavigator from "./src/navigator/AppNavigator";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import Store from "./src/store";

const getFonts = () =>
  Font.loadAsync({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const checkForFirstLaunch = async () => {
    AsyncStorage.getItem("alreadyLaunched")
      .then((val) => {
        if (val === null) {
          AsyncStorage.setItem("alreadyLaunched", true);
          setIsFirstLaunch(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkForFirstLaunch();
  }, []);

  if (fontsLoaded) {
    return (
      <Provider store={Store}>
        <AppNavigator isFirstLaunch={isFirstLaunch} />
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
