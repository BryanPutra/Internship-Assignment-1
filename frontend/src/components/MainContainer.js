import React from "react";
import { theme } from "../styles/main.styles";
import { StyleSheet, View, useWindowDimensions } from "react-native";

const MainContainer = (childComponents) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={[styles.mainContainer, {height: height}]}>
      {childComponents.children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    padding: theme.margin32,
    backgroundColor: theme.white,
  },
});

export default MainContainer;
