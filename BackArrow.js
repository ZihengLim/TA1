import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export const BackArrow = ({style}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.backArrow, style]}>
      <Icon name="arrowleft" size={35} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
