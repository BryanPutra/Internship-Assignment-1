import {Component} from 'react';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/authContext';
import {AxiosProvider} from './src/context/axiosContext';

const App: () => Node = () => {
  return (
    <AxiosProvider>
      <AuthProvider>
        <View style={styles.container}>
          <Navigation />
        </View>
      </AuthProvider>
    </AxiosProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
