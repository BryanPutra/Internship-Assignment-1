import React, { Component, useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

const Inputs = ({ value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 8
    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        width: '100%',
        padding: 10
    },
  })
 
export default Inputs;