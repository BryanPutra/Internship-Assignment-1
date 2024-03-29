import React, { Component, useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { theme, container } from "../styles/main.styles";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Inputs = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
  iconName
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={[styles.container, container.centerFlex]}>
              <View style={[styles.inputContainer, {borderColor: error ? theme.red : theme.darkGrey}]}>
                  <Icon name= {iconName} size = {theme.fontSizeXL} color={theme.grey}/>
                <TextInput
                value={value}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                />
              </View>
          </View>
          <Text></Text>
          {error && (
            <Text style={{ color: theme.red, alignSelf: "stretch", marginTop: -16}}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.margin4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: theme.marginContainer
  },

  input: {
    borderBottomWidth: 2,
    borderColor: theme.darkGrey,
    width: "100%",
    padding: 4,
    marginHorizontal: theme.margin8
  },
});

export default Inputs;
