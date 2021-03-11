import React, { useEffect, useState } from "react";
import {
  View,
  Animated,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

// Constants
import { images, theme } from "../../constants";
const { onboarding1, onboarding2, onboarding3 } = images;
// Theme
import { COLORS, FONTS, SIZES } from "../../constants";

// Dummy Data
const onBoardings = [
  {
    title: "this is title 1",
    description:
      "this is the description section for the onboarding screen section 1 ",
    image: onboarding1,
  },
  {
    title: "this is title 2",
    description:
      "this is the description section for the onboarding screen section 2 ",
    image: onboarding2,
  },
  {
    title: "this is title 3",
    description:
      "this is the description section for the onboarding screen section 3 ",
    image: onboarding3,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [completed, setCompleted] = useState(false);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    // to check if user has finished the onboarding pages
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render
  const renderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{ ...FONTS.h1, color: COLORS.gray, textAlign: "center" }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}
              >
                {item.description}
              </Text>
            </View>

            {/* Button */}
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 20, SIZES.base],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            ></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 150,
          height: 60,
          paddingLeft: 20,
          justifyContent: "center",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          backgroundColor: COLORS.blue,
        }}
        onPress={() => navigation.navigate("Auth")}
      >
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>
          {completed ? "Let's Go" : "Skip"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
  dotContainer: {
    flexDirection: "row",
    height: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  dotRootContainer: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "25%" : "20%",
  },
});
