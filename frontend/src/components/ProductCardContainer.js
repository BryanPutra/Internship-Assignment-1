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

const ProductCardContainer = ({children}) => {
    return (
        <ScrollView>
            {children}
        </ScrollView>
    );
}
 
export default ProductCardContainer;