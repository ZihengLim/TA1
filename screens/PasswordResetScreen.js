import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {BackArrow} from '../assets/components/Icons';
import LottieView from 'lottie-react-native';
import {EmailInputField} from '../assets/components/InputField';
import {LongButton} from '../assets/components/Buttons';

export default function PasswordResetScreen() {
  return (
    <View style={styles.passwordResetScreenContainer}>
      <ScrollView
        style={styles.passwordResetScreenContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.backArrowContainer}>
          <BackArrow />
        </View>
        <View style={styles.signupHeaderTextContainer}>
          <Text style={styles.signupHeaderText}>Forgot Password?</Text>
          <Text style={styles.signupBottomText}>
            Please enter your email below to reset your password
          </Text>
        </View>
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            loop
            style={{
              width: 400,
              height: 250,
            }}
            source={require('../assets/animations/passwordReset.json')}
          />
        </View>
        <EmailInputField />
        <View style={styles.createAccountButtonContainer}>
          <LongButton name={'CONFRIM'} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordResetScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  passwordResetScreenContent: {
    flex: 1,
  },
  backArrowContainer: {
    paddingLeft: 20,
    marginTop: 30,
  },
  signupHeaderTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupHeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});
