import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput} from 'react-native';

const InputField = ({label, placeholder, isSecure}) => {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor="#A19393"
        selectionColor="#000000"
        secureTextEntry={isSecure}
        keyboardType={isSecure ? 'default' : 'email-address'}
        autoCapitalize="none"
      />
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSecure: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputField: {
    borderColor: '#120D92',
    marginBottom: 15,
    borderWidth: 1.5,
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 10,
  },
});

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

