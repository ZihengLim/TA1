import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  EmailInputField,
  PasswordInputField,
} from '../Assets/Components/InputField';
import {LongButton} from '../Assets/Components/LongButton';
import {useNavigation} from '@react-navigation/native';

const Logo = require('../Assets/Images/TaskAwayLogo.png');

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaView style={styles.loginScreenContainer}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.flexOne} keyboardShouldPersistTaps="always">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Logo} />
            <Text style={styles.welcomeText}>
              Welcome To{'\t\t'}
              <Text style={styles.taskText}>
                Task<Text style={styles.awayText}>Away</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <EmailInputField />
            <PasswordInputField />
            <LongButton buttonLabel="LOGIN" style={styles.loginButton} />
          </View>
          <View style={styles.hyperlinkContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
            <View style={styles.sigupTextContainer}>
              <Text style={styles.signupText}>
                DID NOT HAVE AN ACCOUNT YET?
                {'\t'}
              </Text>
              <TouchableOpacity onPress={handleSignUpPress}>
                <Text style={styles.signupHyperlink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flexOne: {
    flex: 1,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
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
  loginButton: {
    marginVertical: 25,
  },
  hyperlinkContainer: {
    alignItems: 'center',
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

