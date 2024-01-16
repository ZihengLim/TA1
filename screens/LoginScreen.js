import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  EmailInputField,
  PasswordInputField,
} from './assets/components/InputField';
import {LongButton} from './assets/components/LongButtons';

export default function LoginScreen() {
  return (
    <View style={styles.loginScreenContainer}>
      <ScrollView
        style={styles.loginScreenContent}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('./assets/images/TaskAwayLogo.png')}
        />
        <Text style={styles.welcomeText}>
          Welcome to{'\t\t'}
          <Text style={styles.taskText}>
            Task<Text style={styles.awayText}>Away</Text>
          </Text>
        </Text>
        <View style={styles.inputFieldContainer}>
          <EmailInputField />
          <PasswordInputField />
        </View>
        <View style={styles.buttonContainer}>
          <LongButton name={'LOGIN'} />
        </View>
        <View style={styles.bottomTextcontainer}>
          <TouchableOpacity
            onPress={() => console.log('Forgot Password Pressed')}>
            <Text style={styles.forgotPassword}>FORGOT PASSWORD ?</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>
              DID NOT HAVE AN ACCOUNT YET?{' '}
            </Text>
            <TouchableOpacity onPress={() => console.log('Sign Up Pressed')}>
              <Text style={styles.signupHyperlink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loginScreenContent: {
    flex: 1,
    marginTop: 20,
  },
  logo: {
    height: 180,
    width: 190,
    alignSelf: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
    marginVertical: 10,
  },
  taskText: {
    color: '#120D92',
  },
  awayText: {
    color: '#FDAB2F',
  },
  inputFieldContainer: {
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  bottomTextcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#3193ED',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
  },
  signupContainer: {
    flexDirection: 'row',
  },
  noAccountText: {
    color: '#000000',
    fontSize: 15,
  },
  signupHyperlink: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 15,
  },
});

