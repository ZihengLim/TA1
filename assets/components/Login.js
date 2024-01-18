import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Colors = {
  ButtonLabel: {
    Register: '#120D92',
    Login: '#ffffff',
  },
  ButtonBackground: {
    Register: '#ffffff',
    Login: '#120D92',
  },
};

export const LoginRegisterButtons = ({buttonLabel, onPress}) => {
  const buttonStyles = getButtonStyles(buttonLabel);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.generalStyles, buttonStyles.specificStyles]}>
      <Text
        style={[styles.generalLabelStyles, buttonStyles.specificLabelStyles]}>
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

LoginRegisterButtons.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const getButtonStyles = buttonLabel => {
  switch (buttonLabel) {
    case 'LOGIN':
      return {
        specificStyles: styles.loginButton,
        specificLabelStyles: styles.loginLabel,
      };
    case 'REGISTER':
      return {
        specificStyles: styles.registerButton,
        specificLabelStyles: styles.registerLabel,
      };
  }
};

const styles = StyleSheet.create({
  generalStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    elevation: 5,
    borderRadius: 5,
    marginHorizontal: 20,
    width: 150,
    height: 50,
  },
  loginButton: {
    backgroundColor: Colors.ButtonBackground.Login,
  },
  registerButton: {
    backgroundColor: Colors.ButtonBackground.Register,
  },
  generalLabelStyles: {
    fontSize: 17,
    fontWeight: '500',
  },
  loginLabel: {
    color: Colors.ButtonLabel.Login,
  },
  registerLabel: {
    color: Colors.ButtonLabel.Register,
  },
});

