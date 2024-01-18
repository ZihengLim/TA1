import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginRegisterButtons} from '../Components/LoginRegisterButtons';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreenImage = require('../Assets/Images/WelcomeScreen.png');
const WelcomeMessage = 'Welcome To TaskAway';
const Colors = {
  MainActionContainer: '#FDAB2F',
  WelcomeMessage: '#000000',
};

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => (
    navigation.navigate('Login'), console.log('Login Button Pressed')
  );

  const handleRegisterPress = () => (
    navigation.navigate('SignUp'), console.log('Register Button Pressed')
  );
  return (
    <SafeAreaView style={styles.WelcomeScreenContainer}>
      <View style={styles.welcomeScreenImageContainer}>
        <Image style={styles.welcomeScreenImage} source={WelcomeScreenImage} />
      </View>
      <View style={styles.mainActionContainer}>
        <Text style={styles.welcomeMessage}>{WelcomeMessage}</Text>
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
  WelcomeScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcomeScreenImageContainer: {
    flex: 0.75,
  },
  welcomeScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  mainActionContainer: {
    flex: 0.25,
    backgroundColor: Colors.MainActionContainer,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.WelcomeMessage,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
});

