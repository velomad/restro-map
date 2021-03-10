import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  return (
    <View>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../assets/h1.jpg")} />,
            title: "Onboarding 1",
            subtitle: "Done with eact Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../assets/h2.jpg")} />,
            title: "Onboarding 2",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../assets/h3.jpg")} />,
            title: "Onboarding 3",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
