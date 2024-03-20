import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import ProgressBar from './ProgressBar';
import {useNavigation} from '@react-navigation/native';

const validateLength = (text, min, max) =>
  text.length >= min && text.length <= max;

const Field = ({
  label,
  detail,
  onChangeText,
  value,
  minLength,
  maxLength,
  multiline,
}) => {
  const hint =
    value.length < minLength
      ? `This field must be at least ${minLength} characters long.`
      : value.length > maxLength
      ? `This field must not exceed ${maxLength} characters.`
      : `Maximum ${maxLength} characters`;

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.details}>{detail}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={label}
        selectionColor={'#CACACA'}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
      />
      <Text style={styles.hintText}>{hint}</Text>
    </View>
  );
};

const Button = ({title, onPress, disabled}) => (
  <TouchableOpacity
    style={[styles.button, {backgroundColor: disabled ? '#D9D9D9' : '#FDAB2F'}]}
    onPress={onPress}
    disabled={disabled}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const PostTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const formValid =
    validateLength(taskName, 10, 50) && validateLength(description, 25, 250);

  const handleSubmit = () => {
    if (formValid) {
      console.log('Form is valid. Values:', {taskName, description});
      navigation.navigate('DateAndTime', {taskName, description});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
        <View style={styles.progressBarContainer}>
          <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={0} />
        </View>
        <Field
          label="Start with a title"
          detail="In a few words, what do you need done?"
          onChangeText={text => setTaskName(text)}
          value={taskName}
          minLength={10}
          maxLength={50}
        />
        <Field
          label="Describe the task"
          detail="Summarize the key details"
          onChangeText={text => setDescription(text)}
          value={description}
          minLength={25}
          maxLength={250}
          multiline
        />
        <Button title="CONTINUE" onPress={handleSubmit} disabled={!formValid} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(30),
  },
  scrollView: {
    flex: 1,
  },
  progressBarContainer: {
    width: scale(65),
    marginTop: verticalScale(30),
  },
  fieldContainer: {
    marginTop: verticalScale(10),
  },
  input: {
    borderColor: '#120D92',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: scale(10),
  },
  multilineInput: {
    height: verticalScale(100),
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginTop: verticalScale(10),
  },
  details: {
    color: '#5C5B5B',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  hintText: {
    color: '#120D92',
    fontWeight: 'bold',
    fontSize: RFPercentage(1.6),
    marginTop: verticalScale(5),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
    borderRadius: 5,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(100),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
});

export default PostTaskScreen;
