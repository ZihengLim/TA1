import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export const LongButton = ({title, onPress}) => (
  <TouchableOpacity style={styles.longButton} onPress={onPress}>
    <Text style={styles.longButtonText}>{title}</Text>
  </TouchableOpacity>
);

LongButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  longButton: {
    borderRadius: 5,
    backgroundColor: '#FDAB2F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
  },
  longButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
});
