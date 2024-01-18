import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackArrow} from '../Assets/Components/BackArrow';
import LottieView from 'lottie-react-native';
import {
  EmailInputField,
  PasswordInputField,
} from '../Assets/Components/InputField';
import {LongButton} from '../Assets/Components/LongButton';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpAnimation = require('../Assets/Animations/greeting.json');

export default function SignUpScreen() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={styles.signupScreenContainer}>
      <KeyboardAvoidingView
        style={styles.signupScreenContent}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.signupScreenContent}>
          <BackArrow />
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.animation}
              source={SignUpAnimation}
            />
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>Sign Up</Text>
            <Text style={styles.signupBottomText}>Fill in your details.</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <EmailInputField />
            <PasswordInputField />
            <View style={styles.termConditionContainer}>
              <TouchableOpacity
                onPress={toggleCheckBox}
                style={styles.checkBox}>
                <Icon
                  name={isChecked ? 'check-square' : 'square'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.termConditionText}>
                I read and agree to{'\t'}
              </Text>
              <TouchableOpacity>
                <Text style={styles.TermConditionHyperlink}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <LongButton
              buttonLabel="CREATE ACCOUNT"
              style={styles.signupButton}
            />
          </View>
          <View style={styles.hyperlinkContainer}>
            <Text style={styles.loginText}>ALREADY REGISTERED?</Text>
            <TouchableOpacity>
              <Text style={styles.loginHyperlink}>{'\t'}Log in Here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signupScreenContainer: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  signupScreenContent: {
    flex: 1,
    paddingBottom: 20,
  },
  animationContainer: {
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: 200,
  },
  signupTextContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  signupBottomText: {
    color: '#676565',
    fontSize: 15,
  },
  inputFieldContainer: {
    paddingHorizontal: 25,
  },
  termConditionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  checkBox: {
    marginRight: 10,
  },
  termConditionText: {
    color: '#000000',
  },
  TermConditionHyperlink: {
    color: '#120D92',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  signupButton: {
    marginTop: 30,
  },
  hyperlinkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#000000',
    fontSize: 15,
  },
  loginHyperlink: {
    color: '#3193ED',
    fontWeight: '900',
    fontSize: 15,
  },
});

