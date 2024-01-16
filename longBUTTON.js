import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const LongButton = ({name}) => (
  <TouchableOpacity style={styles.longButton}>
    <Text style={styles.longButtonText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  longButton: {
    borderRadius: 5,
    backgroundColor: '#FDAB2F',
    shadowColor: '#000',
    elevation: 5,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  longButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
});
