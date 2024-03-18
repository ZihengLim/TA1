import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

const FieldWithError = ({
  value,
  placeholder,
  error,
  onChangeText,
  secureTextEntry,
  toggleVisibility,
  onFocus,
}) => (
  <View>
    <View style={[styles.inputField, error ? styles.errorInput : null]}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#000000'}
        selectionColor={'#CACACA'}
        keyboardType={secureTextEntry ? 'default' : 'email-address'}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      {toggleVisibility && (
        <Entypo
          name={secureTextEntry ? 'eye-with-line' : 'eye'}
          size={20}
          color={'#000000'}
          onPress={toggleVisibility}
        />
      )}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const validateField = (value, rules) => {
  for (let rule of rules) {
    if (!rule.test(value)) {
      return rule.message;
    }
  }
  return '';
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    checkBox: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenRepeatPassword, setHiddenRepeatPassword] = useState(true);

  useEffect(() => {
    if (route.params?.accepted) {
      setForm(prev => ({...prev, checkBox: true}));
      setErrors(prev => ({...prev, checkBox: ''}));
    }
  }, [route.params?.accepted]);

  const handleInputChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const handleSignUp = async () => {
    setLoading(true); // Start loading before the async operation
    const fieldValidations = {
      email: [
        {test: v => v !== '', message: 'This field is required'},
        {
          test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
          message: 'Invalid email address',
        },
      ],
      password: [
        {test: v => v !== '', message: 'This field is required'},
        {
          test: v => v.length >= 8,
          message: 'Password must be at least 8 characters long',
        },
        {
          test: v => /[A-Z]/.test(v),
          message: 'Password must include an uppercase letter',
        },
        {
          test: v => /[a-z]/.test(v),
          message: 'Password must include a lowercase letter',
        },
        {test: v => /\d/.test(v), message: 'Password must include a number'},
        {
          test: v => /[!@#$%^&*(),.?":{}|<>]/.test(v),
          message: 'Password must include a special character',
        },
      ],
      repeatPassword: [
        {test: v => v === form.password, message: 'Passwords do not match'},
      ],
      checkBox: [
        {
          test: v => v,
          message: 'Please agree to Terms & Conditions',
        },
      ],
    };

    let isValid = true;
    let newErrors = {};
    Object.keys(fieldValidations).forEach(key => {
      const error = validateField(form[key], fieldValidations[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });

    if (!isValid) {
      setLoading(false);
      setErrors(newErrors);
      return;
    }

  };

  return (
    <View style={styles.signUpScreenContainer}>
      <KeyboardAvoidingView
        style={styles.signUpScreenContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.signUpScreenContent}>
            <Text style={styles.title}>Create Account</Text>

            <FieldWithError
              value={form.email}
              placeholder="Email"
              error={errors.email}
              onChangeText={value => handleInputChange('email', value)}
              onFocus={() =>
                setErrors(prevErrors => ({...prevErrors, email: ''}))
              }
            />

            <FieldWithError
              value={form.password}
              placeholder="Password"
              error={errors.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry={hiddenPassword}
              toggleVisibility={() => setHiddenPassword(!hiddenPassword)}
              onFocus={() =>
                setErrors(prevErrors => ({...prevErrors, password: ''}))
              }
            />

            <FieldWithError
              value={form.repeatPassword}
              placeholder="Repeat Password"
              error={errors.repeatPassword}
              onChangeText={value => handleInputChange('repeatPassword', value)}
              secureTextEntry={hiddenRepeatPassword}
              toggleVisibility={() =>
                setHiddenRepeatPassword(!hiddenRepeatPassword)
              }
              onFocus={() =>
                setErrors(prevErrors => ({...prevErrors, repeatPassword: ''}))
              }
            />

            <View style={styles.checkBoxContainer}>
              <FontAwesome
                name={form.checkBox ? 'check-square' : 'square'}
                size={16}
                color={'#D3D3D3'}
                onPress={() => handleInputChange('checkBox', !form.checkBox)}
              />
              <Text style={styles.termConditionText}>
                I read and agree{' '}
                <Text
                  style={styles.termConditionLink}
                  onPress={() => navigation.navigate('TermsAndConditions')}>
                  Terms & Conditions
                </Text>
              </Text>
            </View>
            {errors.checkBox && (
              <View style={styles.errorBox}>
                <Entypo name="warning" size={20} color="red" />
                <Text style={styles.errorBoxText}>{errors.checkBox}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                handleSignUp();
                Keyboard.dismiss();
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'#ffffff'} />
              ) : (
                <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginActionContainer}>
              <Text style={styles.loginText}>Already Registered? </Text>
              <Text
                style={styles.hyperText}
                onPress={() => navigation.navigate('Login')}>
                Login Now
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  signUpScreenContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000000',
  },
  inputField: {
    borderColor: '#120D92',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  errorInput: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  termConditionText: {
    color: '#000000',
    fontSize: RFPercentage(1.7),
    marginLeft: scale(7),
  },
  termConditionLink: {
    color: '#3193ED',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  checkBoxError: {
    color: 'red',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    shadowColor: '#000000',
    elevation: 5,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  loginActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: RFPercentage(2),
    color: '#000000',
  },
  hyperText: {
    color: '#3193ED',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: '#FFCCBA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(10),
    borderRadius: 5,
  },
  errorBoxText: {
    color: 'red',
    fontSize: RFPercentage(1.8),
    fontWeight: 'bold',
    marginLeft: scale(10),
  },
});

export default SignUpScreen;
