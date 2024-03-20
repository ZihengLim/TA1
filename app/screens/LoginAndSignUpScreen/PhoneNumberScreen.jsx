import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const phoneNumberImage = require('../../../assets/images/PhoneNumber.jpeg');

const PhoneNumberScreen = () => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef(null);
  const navigation = useNavigation();

  const handlePhoneNumber = async () => {
    if (!value.trim()) {
      setErrorMessage('This field is required');
      setValid(false);
      return;
    }

    const checkValid = phoneInputRef.current?.isValidNumber(value);
    setValid(!!checkValid);

    if (checkValid) {
      setLoading(true);
      try {
        const confirmation = await auth().signInWithPhoneNumber(value);
        navigation.navigate('OTPVerification', {
          phoneNumber: value,
          countryCode: countryCode,
          confirmation: confirmation,
        });
        LogBox.ignoreLogs([
          'Non-serializable values were found in teh navigation state',
        ]);
      } catch (error) {
        setErrorMessage('Failed to send verification code. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Invalid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Image style={styles.image} source={phoneNumberImage} />
            <View style={styles.instructions}>
              <Text style={styles.title}>Phone Number Verification</Text>
              <Text style={styles.details}>
                We will send you a verification code
              </Text>
            </View>
            <PhoneInput
              ref={phoneInputRef}
              defaultValue={value}
              defaultCode="MY"
              onChangeText={text => {
                setValue(text);
                setErrorMessage('');
              }}
              onChangeFormattedText={text => {
                setCountryCode(phoneInputRef.current?.getCountryCode() || '');
                setValue(text);
              }}
              countryPickerProps={{withAlphaFilter: true}}
              containerStyle={styles.phoneInput}
              withShadow
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handlePhoneNumber();
                Keyboard.dismiss();
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>SUBMIT</Text>
              )}
            </TouchableOpacity>
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
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  instructions: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000000',
  },
  details: {
    fontSize: RFPercentage(2),
    color: '#555555',
  },
  phoneInput: {
    marginVertical: verticalScale(10),
  },
  button: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(60),
    shadowColor: '#000000',
    elevation: 5,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: RFPercentage(1.6),
  },
});

export default PhoneNumberScreen;
