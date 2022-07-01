import {Component} from 'react';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/authContext';

const App: () => Node = () => {
return (
    <AuthProvider>
      <View style={styles.container}>
        <Navigation />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
