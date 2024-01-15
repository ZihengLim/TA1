import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const GeneralButton = ({buttonType, style, onPress}) => {
  const buttonStyles = getButtonStyles(buttonType);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, styles.generalButton, buttonStyles.button]}>
      <Text style={[styles.buttonText, buttonStyles.text]}>{buttonType}</Text>
    </TouchableOpacity>
  );
};

const getButtonStyles = buttonType => {
  switch (buttonType) {
    case 'LOGIN':
      return {
        button: styles.loginButton,
        text: styles.loginButtonText,
      };
    case 'REGISTER':
      return {
        button: styles.registerButton,
        text: styles.registerButtonText,
      };
  }
};

const LongButton = ({name}) => (
  <TouchableOpacity style={styles.longButton}>
    <Text style={styles.longButtonText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  generalButton: {
    width: 150,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#120D92',
  },
  registerButton: {
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  loginButtonText: {
    color: '#ffffff',
  },
  registerButtonText: {
    color: '#120D92',
  },
  longButton: {
    marginHorizontal: 30,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDAB2F',
    shadowColor: '#000000',
    elevation: 10,
  },
  longButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export {GeneralButton, LongButton};
