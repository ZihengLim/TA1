import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginRegisterButtons} from '../Assets/Components/LoginRegisterButtons';
import {useNavigation} from '@react-navigation/native';

const Colors = {
  MainActionContainer: '#FDAB2F',
  WelcomeText: '#000000',
};

const WelcomeScreenImage = require('../Assets/Images/WelcomeScreen.png');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
    console.log('Login Button Pressed');
  };

  const handleRegisterPress = () => {
    navigation.navigate('SignUp');
    console.log('Register Button Pressed');
  };

  return (
    <SafeAreaView style={styles.welcomeScreenContainer}>
      <View style={styles.welcomeScreenImageContainer}>
        <Image style={styles.welcomeScreenImage} source={WelcomeScreenImage} />
      </View>
      <View style={styles.mainActionContainer}>
        <Text style={styles.welcomeText}>Welcome To TaskAway</Text>
        <View style={styles.buttonContainer}>
          <LoginRegisterButtons
            buttonLabel={'LOGIN'}
            onPress={handleLoginPress}
          />
          <LoginRegisterButtons
            buttonLabel={'REGISTER'}
            onPress={handleRegisterPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcomeScreenImageContainer: {
    flex: 0.75,
  },
  welcomeScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  mainActionContainer: {
    flex: 0.25,
    backgroundColor: Colors.MainActionContainer,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.WelcomeText,
    marginVertical: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

