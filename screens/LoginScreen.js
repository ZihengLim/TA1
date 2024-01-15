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
} from '../assets/components/InputField';
import {LongButton} from '../assets/components/Buttons';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.loginScreenContainer}>
      <ScrollView
        style={styles.loginScreenContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.loginScreenLogoContainer}>
          <Image
            style={styles.loginScreenLogo}
            source={require('../assets/images/TaskAwayLogo.png')}
          />
        </View>
        <Text style={styles.welcomeText}>
          Welcome to{'\t'}
          <Text style={styles.taskText}>
            Task
            <Text style={styles.awayText}>Away</Text>
          </Text>
        </Text>
        <View style={styles.inputContainer}>
          <EmailInputField />
          <PasswordInputField />
        </View>
        <LongButton name={'LOGIN'} />
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={styles.forgotPasswordHyperlink}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
        <View style={styles.signuptextContainer}>
          <Text style={styles.signupText}>DID NOT HAVE AN ACCOUNT YET?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupHyperlink}>{'\t'}Sign Up</Text>
          </TouchableOpacity>
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
    marginBottom: 30,
  },
  loginScreenLogoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 10,
  },
  welcomeText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '700',
    fontSize: 28,
  },
  taskText: {
    color: '#120D92',
  },
  awayText: {
    color: '#FDAB2F',
  },
  inputContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  forgotPasswordHyperlink: {
    textAlign: 'center',
    marginTop: 30,
    color: '#3193ED',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  signuptextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#000000',
    fontWeight: '400',
  },
  signupHyperlink: {
    fontWeight: '900',
    color: '#000000',
  },
});
