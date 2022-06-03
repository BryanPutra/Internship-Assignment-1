import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import Navigation from "./src/navigation/Navigation";
// const instructions = Platform.select({
//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
//   android:
//     "Double tap R on your keyboard to reload,\n" +
//     "Shake or press menu button for dev menu",
// });
const Stack = createStackNavigator();

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
