import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";
import { theme } from "../styles/main.styles";

const CustomButtons = ({
  onPress,
  text,
  type = "PRIMARY",
  textType = "DIFF",
  containerType = "DIFF",
  bgColor,
  fgColor,
}) => {
  return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container${type}`],
          styles[`container${containerType}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`text${type}`],
            styles[`text${textType}`],
          ]}
        >
          {text}
        </Text>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    elevation: 4,
    borderRadius: 8,
  },

  containerDIFF: {

  },

  containerPRIMARY: {
    backgroundColor: theme.pink,
  },

  containerSECONDARY: {},

  containerTERTIARY: {
    elevation: 0,
    padding: 0,
    marginVertical: theme.margin16,
  },

  containerAccountSwitchScreen: {
    elevation: 0,
    padding: 0,
    width: 'auto'
  },

  text: {
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: theme.whiteGrey,
  },

  textDIFF: {

  },

  textSECONDARY: {
    color: theme.textDarkGrey,
  },

  textTERTIARY: {
    color: theme.pink
  },

  textTERTIARY2: {
    alignSelf: "flex-end",
    color: theme.pink,
    marginTop: -16,
  },

});

export default CustomButtons;
