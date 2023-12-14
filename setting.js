import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import TabBar from './TabBar';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Security</Text>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Account Deletion</Text>
      </TouchableOpacity>
      <TabBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'blue',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    marginLeft: 10,
    fontSize: 20,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
});

export default SettingsScreen;
