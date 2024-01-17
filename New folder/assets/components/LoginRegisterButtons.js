import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export const LoginRegisterButtons = ({buttonType, onPress}) => {
  const buttonStyles = getButtonStyles(buttonType);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.generalButtonStyles, buttonStyles.specificButtonStyles]}>
      <Text style={[styles.generalButtonText, buttonStyles.specificButtonText]}>
        {buttonType}
      </Text>
    </TouchableOpacity>
  );
};

LoginRegisterButtons.propTypes = {
  buttonType: PropTypes.oneOf(['LOGIN', 'REGISTER']).isRequired,
  onPress: PropTypes.func.isRequired,
};

const getButtonStyles = buttonType => {
  switch (buttonType) {
    case 'LOGIN':
      return {
        specificButtonStyles: styles.loginButton,
        specificButtonText: styles.loginText,
      };
    case 'REGISTER':
      return {
        specificButtonStyles: styles.registerButton,
        specificButtonText: styles.registerText,
      };
    default:
      return {
        specificButtonStyles: {},
        specificButtonText: {},
      };
  }
};

const styles = StyleSheet.create({
  generalButtonStyles: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#120D92',
  },
  registerButton: {
    backgroundColor: '#ffffff',
  },
  generalButtonText: {
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
