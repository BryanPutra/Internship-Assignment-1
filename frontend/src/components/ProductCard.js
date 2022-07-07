import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

// imports from dependencies
import {useNavigation} from '@react-navigation/native';
import {theme, container} from '../styles/main.styles';

const AccountCard = () => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={([styles.cardContainer], {width: width * 0.35})}>
        
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: container.padding,
  },
  text: {
    color: theme.black,
    fontWeight: theme.fontWeightMedium,
    letterSpacing: 0.2,
    fontSize: theme.fontSizeExtraXL,
  },
});

export default AccountCard;
