import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Button, Image } from "react-native";
import Inputs from "../components/Inputs";
import Buttons from "../components/CustomButtons";
import LoginImage from "../assets/images/login.png";
import AccountCreationTitle from "../components/AccountCreationTitle";


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLoginPressed = () => {
        // switch to main menu, request auth
    }
    const onForgotPressed = () => {
        // switch to forgot password menu
    }

    const onLoginGoogle = () => {
        // login with google api
    }

    const onRegisterPressed = () => {
        // on change to register menu
    }

    return ( 
        <View style={styles.mainContainer}>
            <Image
                source={LoginImage}
                style={styles.loginImage}
                resizeMode="contain"
            />
            <AccountCreationTitle text="Login"/>
            <Inputs placeholder="Email" value={email} setValue={setEmail}/>
            <Inputs placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <Buttons text="Forgot Password?" onPress={onForgotPressed} type="SECONDARY"/>
            <Buttons text="Login" onPress={onLoginPressed}/>
            <Text style={styles.orDividier}>OR</Text>
            <Buttons text="Login with Google" onPress={onLoginGoogle} bgColor="#f4998d" fgColor="#f40000"/>
            <Buttons text="Dont have an account? Register here" onPress={onRegisterPressed} type="SECONDARY"/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },

    loginImage: {

    },

    orDividier: {
    }

  })

export default Login;