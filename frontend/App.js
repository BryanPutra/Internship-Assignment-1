import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

//pages
import MainMenu from "./src/pages/MainMenu";
import Login from "./src/pages/Login";
import Register from "./src/pages/Login";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
const RootAppContainer = createAppContainer(AppNavigator);

export default class App extends Component<Props> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
