import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Inputs from "../components/Inputs";
import Buttons from "../components/CustomButtons";
import LoginImage from "../assets/images/login1.png";
import AccountCreationTitle from "../components/AccountCreationTitle";

const Login = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLoginPressed = () => {
    // switch to main menu, request auth
  };
  const onForgotPressed = () => {
    // switch to forgot password menu
  };

  const onLoginGoogle = () => {
    // login with google api
  };

  const onRegisterPressed = () => {
    // on change to register menu
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        {/* <LoginImage/> */}
        <Image
          source={LoginImage}
          style={[styles.loginImage, { height: windowHeight * 0.3 }]}
          resizeMode="contain"
        />
        <AccountCreationTitle text="Login" />
        <Inputs placeholder="Email" value={email} setValue={setEmail} />
        <Inputs
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <Buttons
          text="Forgot Password?"
          onPress={onForgotPressed}
          type="SECONDARY"
        />
        <Buttons text="Login" onPress={onLoginPressed} />
        <Text style={styles.orDividier}>OR</Text>
        <Buttons
          text="Login with Google"
          onPress={onLoginGoogle}
          bgColor="#f4998d"
          fgColor="#f40000"
        />
        <Buttons
          text="Dont have an account? Register here"
          onPress={onRegisterPressed}
          type="SECONDARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F5FCFF",
    backgroundColor: "white",
    padding: 25,
  },

  loginImage: {
    flex: 1,
  },

  orDividier: {},
});

export default Login;
