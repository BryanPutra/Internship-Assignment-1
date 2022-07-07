import React from "react";
import { theme } from "../styles/main.styles";
import { StyleSheet, View, useWindowDimensions, ScrollView } from "react-native";

const MainContainer = (childComponents, type) => {

  return (
    <View style={[styles.mainContainer, styles[`mainContainer${type}`]]}>
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
  mainContainerSECONDARY: {
    backgroundColor: theme.paleGrey,
  },

});

export default MainContainer;
