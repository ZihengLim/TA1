import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export const LongButton = ({buttonLabel, onPress, style}) => (
  <TouchableOpacity style={[styles.longButton, style]} onPress={onPress}>
    <Text style={styles.longButtonText}>{buttonLabel}</Text>
  </TouchableOpacity>
);

LongButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  longButton: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDAB2F',
    shadowColor: '#000000',
    elevation: 10,
    width: '100%',
  },
  longButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
});
