import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { theme, container } from "../styles/main.styles";

import Buttons from "../components/CustomButtons";

const ButtonInText = ({onPress, text, actionText, type}) => {
  return (
    <View style={[styles.accountBottomContainer, styles[`accountBottomContainer${type}`]]}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>{text}</Text>
      </View>
      <Buttons
        style={styles.accountButton}
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
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },

  accountBottomContainerSECONDARY: {
    justifyContent: 'flex-start',
    marginBottom: theme.margin16,
    marginTop: theme.marginMinus4
  },

  accountContainer: {

  },
  accountText: {

  },

  accountButton: {

  }

});

export default ButtonInText;
