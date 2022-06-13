// imports from react
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

// imports from dependencies
import { useNavigation } from "@react-navigation/native";
import { theme, container } from "../styles/main.styles";
import { useForm, Controller } from "react-hook-form";

// imports from local files
import Inputs from "../components/Inputs";
import Buttons from "../components/CustomButtons";
import LoginImage from "../assets/images/login.png";
import AccountCreationTitle from "../components/AccountCreationTitle";

const Login = () => {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onLoginPressed = () => {
    // switch to main menu, request auth
    navigation.navigate("MainMenu");
  };
  const onForgotPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onLoginGoogle = () => {
    // login with google api
  };

  const onRegisterPressed = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[container.padding, styles.mainContainer]}>
        <Image
          source={LoginImage}
          style={[styles.loginImage, { height: height * 0.3, width: width * 0.8 }]}
          resizeMode="contain"
        />
        <AccountCreationTitle text="Login" />
        <Inputs
          name="email"
          placeholder="Email ID"
          control={control}
          rules={{ required: "Email is required" }}
          iconName="alternate-email"
        />
        <Inputs
          style={styles.passInput}
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
            },
          }}
          iconName="lock"
        />
        <Buttons
          style={styles.forgotPass}
          text="Forgot Password?"
          onPress={onForgotPressed}
          type="TERTIARY2"
        />
        <View style={container.centerFlex}>
          <Buttons text="Login" onPress={onLoginPressed} />
          <Text style={styles.orDividier}>OR</Text>
          <Buttons
            text="Login with Google"
            onPress={onLoginGoogle}
            bgColor={theme.paleGrey}
            fgColor={theme.whiteGrey}
            type="SECONDARY"
          />
          <Buttons
            text="Dont have an account? Register here"
            onPress={onRegisterPressed}
            type="TERTIARY"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    padding: 30,
    backgroundColor: theme.white
  },

  loginImage: {
    flex: 1,
  },

  forgotPass: {
    
  },

  passInput: {

  },

  orDividier: {
    margin: theme.margin16,
  },
});

export default Login;
