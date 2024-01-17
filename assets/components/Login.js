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

export const LoginRegisterButtons = ({buttonType, onPress}) => {
  const buttonStyles = getButtonStyles(buttonType);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.generalButtonStyles, buttonStyles.specificButtonStyles]}
      accessibilityLabel={buttonType}
      accessibilityRole="button">
      <Text style={[styles.generalTextStyles, buttonStyles.specificTextStyles]}>
        {buttonType}
      </Text>
    </TouchableOpacity>
  );
};

const getButtonStyles = buttonType => {
  switch (buttonType) {
    case 'LOGIN':
      return {
        specificButtonStyles: styles.loginButton,
        specificTextStyles: styles.loginText,
      };
    case 'REGISTER':
      return {
        specificButtonStyles: styles.registerButton,
        specificTextStyles: styles.registerText,
      };
  }
};

const styles = StyleSheet.create({
  generalButtonStyles: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 5,
    width: 160,
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

