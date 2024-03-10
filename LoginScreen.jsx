import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Dimensions.get('window').width;
const taskAwayLogo = require('../../assets/images/logo.png');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    let errors = false;
    if (email.match(/^\s*$/) || password.match(/^\s*$/)) {
      errors = true;
      setLoginError('Please fill in your email and password');
      setLoading(false);
    }

    if (!errors) {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('MainScreen');
      } catch (error) {
        setLoginError('Invalid Email or Password');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Image style={styles.logo} source={taskAwayLogo} />

            <Text style={styles.welcome}>Login to your account</Text>

            <TextInput
              style={[styles.input, loginError ? styles.errorInput : null]}
              value={email}
              placeholder="Email"
              placeholderTextColor={'#000000'}
              selectionColor={'#CACACA'}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              onFocus={() => setLoginError('')}
            />

            <View
              style={[styles.password, loginError ? styles.errorInput : null]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                placeholder="Password"
                placeholderTextColor={'#000000'}
                selectionColor={'#CACACA'}
                keyboardType="default"
                onChangeText={text => setPassword(text)}
                onFocus={() => setLoginError('')}
                secureTextEntry={hiddenPassword}
              />
              <TouchableOpacity
                onPress={() => setHiddenPassword(!hiddenPassword)}>
                <Entypo
                  name={hiddenPassword ? 'eye-with-line' : 'eye'}
                  size={20}
                  color={'#000000'}
                />
              </TouchableOpacity>
            </View>

            {loginError ? (
              <View style={styles.errorBox}>
                <Entypo name={'warning'} size={25} color={'red'} />
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                handleLogin();
                Keyboard.dismiss();
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'#ffffff'} />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            <View style={styles.hypertextContainer}>
              <Text style={styles.hypertext}>Forgot Password?</Text>

              <View style={styles.signupActionContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <Text
                  style={styles.hypertext}
                  onPress={() => navigation.navigate('SignUp')}>
                  Sign Up
                </Text>
              </View>
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
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: screenWidth,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 40,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#120D92',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#120D92',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#FDAB2F',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hypertextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupActionContainer: {
    flexDirection: 'row',
  },
  hypertext: {
    color: '#3193ED',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  signupText: {
    color: '#000000',
    fontSize: 16,
  },
  errorBox: {
    backgroundColor: '#FFCCBA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default LoginScreen;
