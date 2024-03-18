import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const InputField = ({
  label,
  value,
  placeholder,
  onChangeText,
  isError,
  error,
  onFocus,
  keyboardType,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.labelText}>{label}</Text>
    <TextInput
      style={[styles.input, isError && styles.errorInput]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onFocus={onFocus}
      keyboardType={keyboardType}
    />
    {isError && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const Agreement = ({text, isChecked, toggleCheck}) => (
  <TouchableOpacity style={styles.agreement} onPress={toggleCheck}>
    <FontAwesome
      style={{marginTop: verticalScale(4)}}
      name={isChecked ? 'check-square' : 'square'}
      size={18}
      color={isChecked ? '#120D92' : '#D3D3D3'}
    />
    <Text style={styles.agreementText}>{text}</Text>
  </TouchableOpacity>
);

const GoalOption = ({label, selected, onPress}) => (
  <TouchableOpacity
    style={[styles.button, selected && styles.activeButton]}
    onPress={onPress}>
    <FontAwesome
      name={label === 'Give away tasks' ? 'check-circle' : 'dollar'}
      size={25}
      color={selected ? '#ffffff' : '#898989'}
      style={{marginBottom: verticalScale(5)}}
    />
    <Text style={selected ? styles.activeButtonText : styles.buttonText}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CreateProfileScreen = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    postcode: '',
    goals: {giveAwayTasks: false, earnMoney: false},
    isActive: true,
    isCheck: false,
    isCheckTwo: false,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    postcode: '',
    checkBox: '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (name, value) =>
    setForm(prev => ({...prev, [name]: value}));
  const toggleCheck = name => setForm(prev => ({...prev, [name]: !prev[name]}));
  const toggleGoal = goalName => {
    setForm(prev => ({
      ...prev,
      goals: {...prev.goals, [goalName]: !prev.goals[goalName]},
    }));
  };

  const resetError = name => setErrors(prev => ({...prev, [name]: ''}));

  const validateInput = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      dob: '',
      postcode: '',
      checkBox: '',
    };
    let isValid = true;

    if (!form.firstName.trim()) newErrors.firstName = 'This field is required';
    if (!form.lastName.trim()) newErrors.lastName = 'This field is required';
    if (!form.dob.trim()) newErrors.dob = 'This field is required';
    if (!form.postcode.trim()) newErrors.postcode = 'This field is required';
    if (!form.isCheck || !form.isCheckTwo)
      newErrors.checkBox = 'You must agree to all terms and conditions';

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    if (form.dob && !dobRegex.test(form.dob))
      newErrors.dob = 'Date of birth must be in DD/MM/YYYY format';

    setErrors(newErrors);

    Object.values(newErrors).forEach(error => {
      if (error) isValid = false;
    });
    return isValid;
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    if (validateInput()) {
      const userId = auth().currentUser.uid;
      const userDocRef = firestore().collection('users').doc(userId);

      const goals = [];
      if (form.goals.giveAwayTasks) {
        goals.push('Give away tasks');
      }
      if (form.goals.earnMoney) {
        goals.push('Earn money');
      }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
          <Text style={styles.title}>Create your profile</Text>
          <InputField
            label="First name"
            value={form.firstName}
            placeholder="First name"
            onChangeText={text => handleInputChange('firstName', text)}
            isError={!!errors.firstName}
            error={errors.firstName}
            onFocus={() => resetError('firstName')}
          />
          <InputField
            label="Last name"
            value={form.lastName}
            placeholder="Last name"
            onChangeText={text => handleInputChange('lastName', text)}
            isError={!!errors.lastName}
            error={errors.lastName}
            onFocus={() => resetError('lastName')}
          />
          <InputField
            label="Date of birth"
            value={form.dob}
            placeholder="DD/MM/YY"
            onChangeText={text => handleInputChange('dob', text)}
            isError={!!errors.dob}
            error={errors.dob}
            onFocus={() => resetError('dob')}
          />
          <InputField
            label="Postcode"
            value={form.postcode}
            placeholder="Postcode"
            onChangeText={text => handleInputChange('postcode', text)}
            isError={!!errors.postcode}
            error={errors.postcode}
            onFocus={() => resetError('postcode')}
            keyboardType={'numeric'}
          />

          <Text style={styles.labelText}>
            What is your goal here on TaskAway?
          </Text>
          <View style={styles.goalSelectionContainer}>
            <GoalOption
              label="Give away tasks"
              selected={form.goals.giveAwayTasks}
              onPress={() => toggleGoal('giveAwayTasks')}
            />
            <GoalOption
              label="Earn money"
              selected={form.goals.earnMoney}
              onPress={() => toggleGoal('earnMoney')}
            />
          </View>

          <View style={styles.agreementContainer}>
            <Agreement
              text="I agree to receive product updates, marketing materials, and special offers via email, SMS, and push notifications"
              isChecked={form.isCheck}
              toggleCheck={() => {
                toggleCheck('isCheck');
                setErrors('checkBox');
              }}
            />
            <Agreement
              text="I hereby agree to the TaskAway Term & Conditions, Community Guidelines and Privacy Policy"
              isChecked={form.isCheckTwo}
              toggleCheck={() => {
                toggleCheck('isCheckTwo');
                setErrors('checkBox');
              }}
            />
            {errors.checkBox && (
              <Text style={styles.errorText}>{errors.checkBox}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCreateAccount}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.completeButtonText}>CREATE ACCOUNT</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: scale(30),
    marginTop: verticalScale(30),
  },
  title: {
    color: '#000000',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  labelText: {
    color: '#000000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  inputContainer: {
    marginBottom: verticalScale(10),
  },
  input: {
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
    paddingHorizontal: scale(15),
  },
  errorText: {
    color: 'red',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
  },
  goalSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#120D92',
    borderRadius: 5,
    width: scale(135),
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#120D92',
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#898989',
  },
  activeButtonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  agreementContainer: {
    marginVertical: verticalScale(20),
  },
  agreement: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
  },
  agreementText: {
    marginLeft: scale(7),
    fontSize: RFPercentage(1.8),
    fontWeight: '500',
    textAlign: 'justify',
    marginLeft: scale(10),
    color: '#000000',
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: verticalScale(30),
    shadowColor: '#000000',
    elevation: 5,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
});

export default CreateProfileScreen;
