import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Main Page</Text>
      </View>
      <View style={styles.content}>
        {/* put the content here */}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home-outline" size={25} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="list-outline" size={25} />
          <Text>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="add-circle-outline" size={25} />
          <Text>Post Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="chatbubble-outline" size={25} />
          <Text>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="settings-outline" size={25} />
          <Text>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color for the entire container
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    // Add content styles here
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9', 
  },
  tabItem: {
    alignItems: 'center',
    padding: 10,
  },
});

export default MainPage;
