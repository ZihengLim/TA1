import React from 'react';
import {GeneralButton} from '../assets/components/Buttons';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.welcomeScreenContainer}>
      <View style={styles.welcomeScreenImageContainer}>
        <Image
          style={styles.welcomeScreenImage}
          source={require('../assets/images/WelcomeScreen.png')}
        />
      </View>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Welcome to Taskway</Text>
        <View style={styles.buttonContainer}>
          <GeneralButton
            buttonType="LOGIN"
            onPress={() => navigation.navigate('Login')}
          />
          <GeneralButton
            buttonType="REGISTER"
            onPress={() => navigation.navigate('SignUp')}
          />
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
  welcomeScreenImageContainer: {
    alignItems: 'center',
  },
  welcomeScreenImage: {
    marginBottom: 20,
    height: 665,
    width: 420,
  },
  welcomeTextContainer: {
    flex: 1,
    backgroundColor: '#FDAB2F',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
