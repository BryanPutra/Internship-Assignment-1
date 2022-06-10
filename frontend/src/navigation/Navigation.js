import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import { theme } from '../styles/main.styles'

//pages
import Login from "../pages/Login";
import MainMenu from "../pages/MainMenu";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [test, setTest] = useState(true);

  if (currentUser !== undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={theme.activityIndicatorColor}/>
      </View>
    );
  }

  // const checkUser = async () => {
  //   try {
  //     // check if a user is still logged in or their session has expired
  //   } catch (e) {
  //     setCurrentUser(null);
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!test ? (
          <Stack.Screen name="MainMenu" component={MainMenu} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
