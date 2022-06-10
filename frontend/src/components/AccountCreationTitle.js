import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import { theme, container } from "../styles/main.styles";

const AccountCreationTitle = ({text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 15,
        width: '100%',
    },
    text: {
        color: theme.black,
        fontWeight: 'bold',
        letterSpacing: 0.2,
        fontSize: theme.fontSize30,
    }
  })
 
export default AccountCreationTitle;