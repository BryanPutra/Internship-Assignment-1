import {Component} from 'react';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/authContext';
import {AxiosProvider} from './src/context/axiosContext';
import { WebView } from 'react-native-webview';

const App: () => Node = () => {
  return (
    // <AxiosProvider>
    // <AuthProvider>
    // <View style={styles.container}>
      <WebView source={{uri: 'https://7541-45-64-102-9.ap.ngrok.io/'}}/>
      // {/* <Navigation /> */}
    // </View>
    // </AuthProvider>
    // </AxiosProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
