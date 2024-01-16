import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LoginRegisterButtons} from './assets/components/LoginRegisterButtons';

export default function WelcomeScreen() {
  return (
    <View style={styles.welcomeScreenContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcomeScreenImage}
          source={require('./assets/images/WelcomeScreen.png')}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.welcomeText}>Welcome to TaskAway</Text>
        <View style={styles.buttonContainer}>
          <LoginRegisterButtons buttonType={'LOGIN'} />
          <LoginRegisterButtons buttonType={'REGISTER'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 0.75,
    marginVertical: 30,
  },
  welcomeScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bottomContainer: {
    flex: 0.25,
    backgroundColor: '#FDAB2F',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
  },
  welcomeText: {
    marginVertical: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

