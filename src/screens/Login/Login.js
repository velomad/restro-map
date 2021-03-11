import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { InputField, Button } from "../../components";
import { COLORS, FONTS } from "../../constants";

const Login = ({ navigation }) => {
  const [inputValue, setInputValue] = useState({ username: "" });
  const { username, password } = inputValue;

  const handleChange = (e) => {
    const { name, type, text } = e;
    setInputValue((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              ...FONTS.h1,
              fontWeight: "700",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{ ...FONTS.body2, color: COLORS.gray, fontWeight: "600" }}
          >
            Sign in to continue!
          </Text>
        </View>

        <Text
          onPress={() => navigation.navigate("Home")}
          style={{
            color: COLORS.gray,
            padding: 10,
            borderRadius: 10,
            textDecorationLine: "underline",
          }}
        >
          Skip
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <InputField
          fieldFocus={true}
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />

        <InputField
          secure={true}
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />

        <Button title="Login" onPress={() => navigation.navigate("Home")} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>
          I am new user,
          <Text
            style={{ color: COLORS.blue }}
            onPress={() => navigation.navigate("Signup")}
          >
            {" "}
            Sign Up{" "}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
