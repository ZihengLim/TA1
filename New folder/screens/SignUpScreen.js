import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackArrow} from '../assets/components/Icons';
import LottieView from 'lottie-react-native';
import {
  EmailInputField,
  PasswordInputField,
} from '../assets/components/InputField';
import {LongButton} from '../assets/components/LoginRegisterButtons';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.signupScreenContainer}>
      <ScrollView
        style={styles.signupScreenContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.backArrowContainer}>
          <BackArrow />
        </View>
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            loop
            style={{
              width: 500,
              height: 300,
            }}
            source={require('../assets/animations/greeting.json')}
          />
        </View>
        <View style={styles.signupHeaderTextContainer}>
          <Text style={styles.signupHeaderText}>Sign Up</Text>
          <Text style={styles.signupBottomText}>Fill in your details.</Text>
        </View>
        <EmailInputField />
        <PasswordInputField />
        <View style={styles.createAccountButtonContainer}>
          <LongButton name={'CREATE ACCOUNT'} />
        </View>
        <View style={styles.logintextContainer}>
          <Text style={styles.loginText}>ALREADY REGISTERED?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginHyperlink}>{'\t'}Login Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signupScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  signupScreenContent: {
    flex: 1,
  },
  backArrowContainer: {
    paddingLeft: 20,
    marginTop: 30,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupHeaderTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupHeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  signupBottomText: {
    color: '#676565',
    fontSize: 15,
  },
  createAccountButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logintextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#000000',
    fontWeight: '400',
  },
  loginHyperlink: {
    fontWeight: '900',
    color: '#3193ED',
  },
});
