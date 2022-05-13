import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";

const Buttons = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return (
        <Pressable onPress={onPress} 
        style={[
            styles.container, 
            styles['container_${type}'],
            bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text style={[styles.text, styles['text_${type}']]}>{text}</Text>
        </Pressable>

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

    }

    text: {
        fontWeight: 'bold',
        letterSpacing: 0.3,
        color: 'white'
    },

    text_SECONDARY: {
        color: '#f40000'
    }
}

)
 
export default Buttons;