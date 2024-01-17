import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

const InputField = ({label, placeholder, isSecure}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputName}>{label}</Text>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor="#A19393"
          selectionColor="#000000"
          secureTextEntry={isSecure}
          keyboardType={isSecure ? 'default' : 'email-address'}
          autoCapitalize="none"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputName: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  inputField: {
    borderColor: '#120D92',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
});

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSecure: PropTypes.bool,
};

export const EmailInputField = () => (
  <InputField
    label="E-MAIL:"
    placeholder="example@gmail.com"
    isSecure={false}
  />
);

export const PasswordInputField = () => (
  <InputField label="PASSWORD:" placeholder="********" isSecure={true} />
);

