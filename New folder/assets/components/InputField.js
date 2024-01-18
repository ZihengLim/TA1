import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Colors = {
  PlaceholderText: '#A19393',
  InputFieldBorder: '#120D92',
  InputLabel: '#000000',
  SelectionColor: '#000000',
};

const Texts = {
  EmailInputField: {
    Label: 'E-MAIL:',
    Placeholder: 'example@gmail.com',
  },
  PasswordInputField: {
    Label: 'PASSWORD:',
    Placeholder: '********',
  },
};

const InputField = ({inputFieldLabel, placeholder, isSecure}) => {
  const [secureEntry, setSecureEntry] = useState(isSecure);

  const handleSecureEntry = () => {
    setSecureEntry(!secureEntry);
    console.log('Change Visibility');
  };

  return (
    <>
      <Text style={styles.inputLabel}>{inputFieldLabel}</Text>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor={Colors.PlaceholderText}
          selectionColor={Colors.SelectionColor}
          secureTextEntry={secureEntry}
          autoCapitalize="none"
          keyboardType={isSecure ? 'default' : 'email-address'}
        />
        {isSecure && (
          <TouchableOpacity
            onPress={handleSecureEntry}
            style={styles.eyeIconContainer}>
            <Icon
              name={secureEntry ? 'eye-slash' : 'eye'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

InputField.propTypes = {
  inputFieldLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSecure: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
    color: Colors.InputLabel,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    borderColor: Colors.InputFieldBorder,
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  inputField: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
  },
  eyeIconContainer: {
    paddingRight: 10,
  },
});

const EmailInputField = () => (
  <InputField
    inputFieldLabel={Texts.EmailInputField.Label}
    placeholder={Texts.EmailInputField.Placeholder}
    isSecure={false}
  />
);

const PasswordInputField = () => (
  <InputField
    inputFieldLabel={Texts.PasswordInputField.Label}
    placeholder={Texts.PasswordInputField.Placeholder}
    isSecure={true}
  />
);

export {EmailInputField, PasswordInputField};
