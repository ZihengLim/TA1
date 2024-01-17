import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
const EmailInputField = () => (
  <>
    <Text style={styles.inputFieldTitle}>E-MAIL:</Text>
    <TextInput
      style={styles.inputField}
      placeholder="example@gmail.com"
      placeholderTextColor="#A19393"
      selectionColor="#000000"
    />
  </>
);

const PasswordInputField = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Text style={styles.inputFieldTitle}>PASSWORD:</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.inputField}
          placeholder="********"
          placeholderTextColor="#A19393"
          selectionColor="#000000"
          secureTextEntry={!passwordVisible} // Toggle visibility
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? 'eye-with-line' : 'eye'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputFieldTitle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputField: {
    marginBottom: 10,
  },
  passwordField: {
    flexDirection: 'row',
    borderColor: '#120D92',
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export {EmailInputField, PasswordInputField};
