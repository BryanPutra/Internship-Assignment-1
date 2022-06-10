import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";
import { theme } from "../styles/main.styles";

const CustomButtons = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    elevation: 4,
  },

  container_PRIMARY: {
    backgroundColor: theme.pink,
  },

  container_SECONDARY: {
      
  },

  container_TERTIARY: {
    elevation: 0
  },

  text: {
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: theme.whiteGrey,
  },

  text_SECONDARY: {
    color: theme.red,
  },

  text_TERTIARY: {
    color: theme.pink,
  },
});

export default CustomButtons;
