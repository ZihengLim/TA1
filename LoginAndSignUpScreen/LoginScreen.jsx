import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

const taskAwayLogo = require('../../../assets/images/logo.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginInputField = ({
  value,
  placeholder,
  secureTextEntry,
  onChangeText,
  toggleVisibility,
  keyboardType,
  onFocus,
  isPassword,
}) => (
  <View style={[styles.input, value.error ? styles.errorInput : null]}>
    <TextInput
      style={styles.passwordInput}
      value={value.text}
      placeholder={placeholder}
      placeholderTextColor={'#000000'}
      selectionColor={'#CACACA'}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onFocus={onFocus}
      isPassword={isPassword}
    />
    {isPassword && (
      <Entypo
        name={value.hidden ? 'eye-with-line' : 'eye'}
        size={20}
        color={'#000000'}
        onPress={toggleVisibility}
      />
    )}
  </View>
);

const LoginScreen = () => {
  const [email, setEmail] = useState({text: '', error: false});
  const [password, setPassword] = useState({
    text: '',
    hidden: true,
    error: false,
  });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const clearErrors = () => {
    setEmail({...email, error: false});
    setPassword({...password, error: false});
    setLoginError('');
  };

  const handleLogin = async () => {
    if (!email.text.trim() || !password.text.trim()) {
      setLoginError('Please fill in your email and password');
      setEmail({...email, error: true});
      setPassword({...password, error: true});
      return;
    }

   
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image source={taskAwayLogo} style={styles.logo} />
            </View>
            <Text style={styles.title}>Login to your account</Text>
            {loginError && (
              <View style={styles.errorBox}>
                <Entypo name="warning" size={20} color="red" />
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            )}
            <LoginInputField
              value={email}
              placeholder="Email"
              onChangeText={text => setEmail({text, error: false})}
              onFocus={clearErrors}
              keyboardType={'email-address'}
            />
            <LoginInputField
              value={password}
              placeholder="Password"
              secureTextEntry={password.hidden}
              keyboardType={'default'}
              onChangeText={text =>
                setPassword({...password, text, error: false})
              }
              toggleVisibility={() =>
                setPassword(prevState => ({
                  ...prevState,
                  hidden: !prevState.hidden,
                }))
              }
              onFocus={clearErrors}
              isPassword={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleLogin();
                Keyboard.dismiss();
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <View style={styles.hyperTextContainer}>
              <Text
                style={styles.hyperText}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password?
              </Text>
              <View style={styles.signUpActionContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <Text
                  style={styles.hyperText}
                  onPress={() => navigation.navigate('SignUp')}>
                  Sign Up
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Text
        style={[
          styles.hyperText,
          {textAlign: 'center', marginBottom: verticalScale(23)},
        ]}
        onPress={() => navigation.navigate('PhoneNumber')}>
        Login via Phone
      </Text>
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
  logoContainer: {
    alignItems: 'center',
    width: screenWidth * 0.8,
    height: screenHeight * 0.2,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    borderColor: '#120D92',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  passwordInput: {
    flex: 1,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorBox: {
    backgroundColor: '#FFCCBA',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(50),
    marginVertical: verticalScale(10),
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginLeft: scale(10),
    fontSize: RFPercentage(1.8),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(35),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  hyperTextContainer: {
    alignItems: 'center',
  },
  hyperText: {
    color: '#3193ED',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  signUpActionContainer: {
    flexDirection: 'row',
  },
  signupText: {
    fontSize: RFPercentage(2),
    color: '#000000',
  },
});

export default LoginScreen;
