import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CustomButtons = ({ onPress, text, type="PRIMARY", bgColor, fgColor }) => {
    return ( 
        <View>
            <TouchableOpacity onPress={onPress}
                style={[
                styles.container, 
                styles['container_${type}'],
                bgColor ? {backgroundColor: bgColor} : {}
                ]}
            >
                <Text style={[styles.text, styles['text_${type}']]}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 6,
        elevation: 4,
    },

    container_PRIMARY: {
        backgroundColor: '#f40000',
        
    },

    container_SECONDARY: {

    },

    text: {
        fontWeight: 'bold',
        letterSpacing: 0.3,
        color: 'white'
    },

    text_SECONDARY: {
        color: '#f40000'
    },
})

export default CustomButtons;