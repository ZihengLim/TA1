import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const dummyDB = {
  'user@example.com': 'password123', // Replace with your dummy credentials
};

const logo = require('TaskAway/images/logo.jpg'); // Make sure the path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (dummyDB[email] && dummyDB[email] === password) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Invalid credentials', 'The email and password you entered did not match our records. Please double-check and try again.');
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.successMessage}>
          Login Successful!
          <Text style={styles.taskText}>Task</Text>
          <Text style={styles.awayText}>Away</Text>
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcome}>
          Welcome to 
          <Text style={styles.taskText}> Task</Text>
          <Text style={styles.awayText}>Away</Text>
          </Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Redirect', 'Navigate to Sign Up')}>
          <Text style={styles.signupText}>
            DID NOT HAVE AN ACCOUNT YET? <Text style={styles.boldText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#1E232C'
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FDAB2F',
    width: '100%',
    padding: 15,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#1c313a',
    marginTop: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
  },
  taskText: {
    color: '#120D92',
  },
  awayText: {
    color: '#FDAB2F'
  }

});

export default Login;