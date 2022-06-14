import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { theme, container } from "../styles/main.styles";

import Buttons from "../components/CustomButtons";

const ButtonInText = ({onPress, text, actionText}) => {
  return (
    <View style={styles.accountBottomContainer}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>{text}</Text>
      </View>
      <Buttons
        text={actionText}
        onPress={onPress}
        type="DIFF"
        containerType="AccountSwitchScreen"
        textType="TERTIARY"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  accountBottomContainer: {
    flexDirection: "row",
    marginTop: theme.margin16,
  },

  accountContainer: {

  },
  accountText: {

  },

});

export default ButtonInText;
