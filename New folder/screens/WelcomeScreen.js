import React from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {LoginRegisterButtons} from './Assets/Components/LoginRegisterButtons';

const Colors = {
  Background: '#ffffff',
  LoginRegisterContainer: '#FDAB2F',
  WelcomeText: '#000000',
};

const WelcomeScreenImage = require('./Assets/Images/WelcomeScreen.png');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.welcomeScreenContainer}>
      <View style={styles.welcomeScreenImageContainer}>
        <Image style={styles.welcomeScreenImage} source={WelcomeScreenImage} />
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.welcomeText}>Welcome To TaskAway</Text>
        <View style={styles.buttonContainer}>
          <LoginRegisterButtons buttonType={'LOGIN'} />
          <LoginRegisterButtons buttonType={'REGISTER'} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  welcomeScreenImageContainer: {
    flex: 0.75,
    marginBottom: 30,
  },
  welcomeScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  loginRegisterContainer: {
    flex: 0.25,
    backgroundColor: Colors.LoginRegisterContainer,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    alignItems: 'center',
  },
  welcomeText: {
    marginVertical: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.WelcomeText,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

});
