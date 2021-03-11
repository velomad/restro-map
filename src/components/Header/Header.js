import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { View, StyleSheet, Text } from "react-native";

const Header = ({ navigation, title }) => {
	return (
		<View style={styles.header}>
			<Icon
				name="menu"
				size={23}
				backgroundColor="#fff"
				color="#000"
				style={styles.icon}
				onPress={() => navigation.openDrawer()}
			/>
			<Text style={styles.headerText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	headerText: {
		fontSize: 20,
		color: "#333",
		letterSpacing: 1,
		fontFamily: "nunito-bold",
	},
	icon: {
		marginRight: 20,
	},
});

export default Header;