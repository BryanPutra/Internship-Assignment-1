import React from "react";
import { theme } from "../styles/main.styles";
import { StyleSheet, View, useWindowDimensions, ScrollView } from "react-native";

const MainContainer = (childComponents) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={[styles.mainContainer]}>
      {childComponents.children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    padding: theme.marginContainer,
    backgroundColor: theme.white,
  },
  elementsFit: {

  },

});

export default MainContainer;
