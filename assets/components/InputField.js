import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const EmailInputField = () => (
  <>
    <Text style={styles.inputName}>E-MAIL:</Text>
    <TextInput
      style={styles.inputField}
      placeholder="example@gmail.com"
      placeholderTextColor="#A19393"
      selectionColor="#000000"
    />
  </>
);

const PasswordInputField = () => (
  <>
    <Text style={styles.inputName}>PASSWORD:</Text>
    <TextInput
      style={styles.inputField}
      placeholder="********"
      placeholderTextColor="#A19393"
      selectionColor="#000000"
    />
  </>
);

const styles = StyleSheet.create({
  inputName: {
    fontSize: 15,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  inputField: {
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#120D92',
    borderWidth: 1.5,
    borderRadius: 5,
  },
});

export {EmailInputField, PasswordInputField};
