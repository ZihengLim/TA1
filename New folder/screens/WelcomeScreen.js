import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LoginRegisterButtons} from '../assets/components/LoginRegisterButtons';

const colors = {
  white: '#ffffff',
  orange: '#FDAB2F',
  black: '#000000',
};

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
    console.log('Login Button Pressed');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
    console.log('Register Button Pressed');
  };

  return (
    <View style={styles.welcomeScreenContainer}>
      <View style={styles.welcomeScreenImageContainer}>
        <Image
          style={styles.welcomeScreenImage}
          source={require('../assets/images/WelcomeScreen.png')}
        />
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.welcomeText}>Welcome To TaskAway</Text>
        <View style={styles.buttonContainer}>
          <LoginRegisterButtons
            buttonType={'LOGIN'}
            onPress={handleLoginPress}
          />
          <LoginRegisterButtons
            buttonType={'REGISTER'}
            onPress={handleLoginPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  welcomeScreenImageContainer: {
    flex: 0.8,
  },
  welcomeScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  loginRegisterContainer: {
    flex: 0.2,
    backgroundColor: colors.orange,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 30,
  },
});
