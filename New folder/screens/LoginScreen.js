import React, {useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {LongButton} from '../assets/components/LongButtons';
import {
  EmailInputField,
  PasswordInputField,
} from '../assets/components/InputField';

const texts = {
  login: 'LOGIN',
  forgotPassword: 'FORGOT PASSWORD?',
  doNotHaveAccount: 'DID NOT HAVE AN ACCOUNT YET?',
  signUp: 'Sign Up',
  welcomeTo: 'Welcome To',
  task: 'Task',
  away: 'Away',
};

export default function LoginScreen() {
  const handleForgotPasswordPress = useCallback(() => {
    console.log('Forgot Password Pressed');
  }, []);

  const handleSignUpPress = useCallback(() => {
    console.log('Sign Up Pressed');
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.flexOne} keyboardShouldPersistTaps="handled">
          <View style={styles.loginScreenLogoContainer}>
            <Image
              style={styles.loginScreenLogo}
              source={require('../assets/images/TaskAwayLogo.png')}
            />
            <Text style={styles.welcomeText}>
              {texts.welcomeTo}
              {'\t\t'}
              <Text style={styles.taskText}>{texts.task}</Text>
              <Text style={styles.awayText}>{texts.away}</Text>
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <EmailInputField />
            <PasswordInputField />
            <View style={styles.buttonContainer}>
              <LongButton title={texts.login} />
            </View>
          </View>
          <View style={styles.hyperlinkContainer}>
            <TouchableOpacity onPress={handleForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>
                {texts.forgotPassword}
              </Text>
            </TouchableOpacity>
            <View style={styles.sigupTextContainer}>
              <Text style={styles.signupText}>
                {texts.doNotHaveAccount}
                {'\t'}
              </Text>
              <TouchableOpacity onPress={handleSignUpPress}>
                <Text style={styles.signupHyperlink}>{texts.signUp}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flexOne: {
    flex: 1,
  },
  loginScreenLogoContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  loginScreenLogo: {
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
  },
  taskText: {
    color: '#120D92',
  },
  awayText: {
    color: '#FDAB2F',
  },
  inputFieldContainer: {
    paddingHorizontal: 25,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  hyperlinkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#3193ED',
    fontWeight: '500',
    marginBottom: 5,
  },
  sigupTextContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#000000',
    fontSize: 15,
  },
  signupHyperlink: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '900',
  },
});
