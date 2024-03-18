import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';

const forgotPasswordImage = require('../../../assets/images/ForgotPassword.jpeg');
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendResetPasswordEmail = async () => {
    if (!email.trim()) {
      setError('This field is required');
      return;
    }
    setLoading(true);
    setError('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Image style={styles.image} source={forgotPasswordImage} />
            <View>
              <TextInput
                style={[styles.input, error ? styles.errorInput : null]}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={text => {
                  setEmail(text);
                  setError('');
                }}
                onFocus={() => setError('')}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Text style={styles.instruction}>
              We'll send you an email to reset your password. If you have any
              issues, contact{' '}
              <Text style={styles.companyName}>admin@taskawayasia.com</Text>
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={sendResetPasswordEmail}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text style={styles.buttonText}>CONFIRM</Text>
              )}
            </TouchableOpacity>
            <Text
              style={styles.hyperText}
              onPress={() => navigation.navigate('Login')}>
              Back To Login
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(30),
    justifyContent: 'center',
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.35,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
    paddingHorizontal: scale(15),
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
    fontSize: RFPercentage(1.8),
    marginTop: verticalScale(10),
    lineHeight: 20,
  },
  companyName: {
    color: '#3193ED',
    fontWeight: 'bold',
    fontSize: RFPercentage(1.8),
  },
  button: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(10),
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  hyperText: {
    color: '#3193ED',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(50),
  },
  errorText: {
    color: 'red',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  errorInput: {
    borderColor: 'red'
    borderwidth: 2,
  },
});

export default ForgotPasswordScreen;
