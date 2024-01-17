import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Colors = {
  text: {
    register: '#120D92',
    login: '#ffffff',
  },
  button: {
    register: '#ffffff',
    login: '#120D92',
  },
};

export const LoginRegisterButtons = ({buttonLabel, onPress}) => {
  const buttonStyles = getButtonStyles(buttonLabel);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.generalButtonStyles, buttonStyles.specificButtonStyles]}>
      <Text style={[styles.generalTextStyles, buttonStyles.specificTextStyels]}>
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

const getButtonStyles = buttonLabel => {
  switch (buttonLabel) {
    case 'LOGIN':
      return {
        specificButtonStyles: styles.loginButton,
        specificTextStyels: styles.loginText,
      };
    case 'REGISTER':
      return {
        specificButtonStyles: styles.registerButton,
        specificTextStyels: styles.registerText,
      };
  }
};

const styles = StyleSheet.create({
  generalButtonStyles: {
    borderRadius: 5,
    shadowColor: '#000000',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: Colors.button.login,
  },
  registerButton: {
    backgroundColor: Colors.button.register,
  },
  generalTextStyles: {
    fontSize: 17,
    fontWeight: '500',
  },
  loginText: {
    color: Colors.text.login,
  },
  registerText: {
    color: Colors.text.register,
  },
});

