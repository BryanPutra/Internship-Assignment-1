import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";

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
        width: '100%'
    },
    text: {
        fontWeight: 'bold',
        letterSpacing: 0.2,
        fontSize: 20,
    }
  })
 
export default AccountCreationTitle;