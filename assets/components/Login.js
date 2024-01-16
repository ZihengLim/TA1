import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const LoginRegisterButtons = ({buttonType, onPress}) => {
  const buttonStyles = getButtonStyles(buttonType);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.generalButtonStyles, buttonStyles.specificButtonStyles]}>
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
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#120D92',
    marginHorizontal: 20,
  },
  registerButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
  },
  generalTextStyles: {
    fontSize: 17,
    fontWeight: '500',
  },
  loginText: {
    color: '#ffffff',
  },
  registerText: {
    color: '#120D92',
  },
});
