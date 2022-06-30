import {Component} from 'react';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';

const App: () => Node = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
