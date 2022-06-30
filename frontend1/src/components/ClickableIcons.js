import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ClickableIcons = ({ iconName, onPress, color, fontSize }) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name={iconName} size={fontSize} color={color} />
    </Pressable>
  );
};

export default ClickableIcons;
