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
import MainContainer from "../components/MainContainer";
import ClickableIcons from "../components/ClickableIcons";
import { logout } from "../utils/authServices";
import { useNavigation } from "@react-navigation/native";
import { testPostAuth } from "../utils/authServices";
import { theme, container } from "../styles/main.styles";
import Logo from "../assets/images/logoSimobi.png";

const MainMenu = () => {
  const onSettingsPressed = () => {
    console.log(testPostAuth.data)
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainContainer>
        <View style={styles.topContainer}>
          <Image
            source={Logo}
            style={{ height: height * 0.3, width: width * 0.8 }}
            resizeMode="contain"
          />
          <View style={styles.settingsLogoutContainer}>
            <ClickableIcons iconName="settings" onPress={onSettingsPressed} />
            <ClickableIcons iconName="logout" onPress={logout} />
          </View>
        </View>
        <View></View>
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
  },

  settingsLogoutContainer: {
    alignSelf: "flex-end",
  },
});

export default MainMenu;
