import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Handle the search functionality
    console.log('Search for:', searchText);
  };

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
        <View>
          <Text style={styles.welcome}>Hello, user1</Text>
        </View>
        
         {/* Notification Icon */}
        <View style={styles.icon}>
          <Icon  name='notifications' size={20} color='white'/>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name='search' size={20} color='black'/>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>
              <Icon name='menu' size={20} color='black'/>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Background */}
      <View style={styles.whiteBackground}>
        {/* Your home page content goes here */}
        <Text style={styles.homeText}>No Post Yet....</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueBackground: {
    backgroundColor: '#525DC0',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: '25%', // Adjust the height as needed
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 25,
    marginTop: 20,
    justifyContent: 'space-between', // Align items and button at the ends
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Use flex property to allow the search input to take available space
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#3498db',
  },
  searchButton: {
    backgroundColor: '#fdcb6e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#1E232C',
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 18,
    color: '#525DC0',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default App;
