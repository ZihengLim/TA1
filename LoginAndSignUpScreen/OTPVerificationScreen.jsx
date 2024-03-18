import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  Platform,
  StyleSheet,
  Dimensions,
  Alert,
  LogBox,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

LogBox.ignoreAllLogs();

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const animationSource = require('../../../assets/animations/OTP.json');

const OTPVerificationScreen = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const route = useRoute();
  const {phoneNumber, countryCode, confirmation} = route.params;
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    text
      ? inputRefs.current[index + 1]?.focus()
      : inputRefs.current[index - 1]?.focus();
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await confirmation.confirm(otp.join(''));
      navigation.navigate('CreateProfile');
    } catch {
      setError('Invalid Verification Code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <LottieView
              style={styles.animation}
              source={animationSource}
              autoPlay
              loop
            />
            <View style={styles.instructions}>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.details}>
                Enter the verification code we just sent to{' '}
                <Text style={styles.hyperText}>
                  {countryCode}
                  {phoneNumber}
                </Text>
              </Text>
            </View>
            <View style={styles.otpInput}>
              {otp.map((_, index) => (
                <TextInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={text => handleOtpChange(text, index)}
                  value={otp[index]}
                  onFocus={() => setError('')}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => {
                verifyOtp();
                Keyboard.dismiss();
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.verifyButtonText}>VERIFY</Text>
              )}
            </TouchableOpacity>
            <View style={styles.resendCodeContainer}>
              <Text style={styles.sendCodeText}>Didn't receive the code? </Text>
              {timer === 0 ? (
                <TouchableOpacity onPress={sendVerificationCode}>
                  <Text style={styles.hyperText}>Send code again</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.hyperText}>{timer}</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  animation: {
    alignSelf: 'center',
    width: screenWidth * 0.75,
    height: screenHeight * 0.25,
    marginBottom: verticalScale(30),
  },
  instructions: {
    alignItems: 'center',
    marginBottom: verticalScale(35),
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000000',
  },
  details: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    color: '#555555',
  },
  otpInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  otpBox: {
    width: scale(40),
    height: verticalScale(40),
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(30),
    shadowColor: '#000000',
    elevation: 10,
  },
  verifyButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resendCodeContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(50),
  },
  sendCodeText: {
    fontSize: RFPercentage(2),
    color: '#000000',
  },
  hyperText: {
    fontWeight: 'bold',
    color: '#3192ED',
    fontSize: RFPercentage(2),
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: RFPercentage(1.6),
    marginTop: verticalScale(5),
  },
});

export default OTPVerificationScreen;
