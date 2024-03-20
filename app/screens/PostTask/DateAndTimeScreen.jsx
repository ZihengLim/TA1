import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ProgressBar from './ProgressBar';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const CustomButton = ({title, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Button = ({title, onPress, disabled}) => (
  <TouchableOpacity
    style={[
      styles.continueButton,
      {backgroundColor: disabled ? '#D9D9D9' : '#FDAB2F'},
    ]}
    onPress={onPress}
    disabled={disabled}>
    <Text style={styles.continueButtonText}>{title}</Text>
  </TouchableOpacity>
);

const initialState = {
  dayString: 'Not Set',
  dateString: 'Not Set',
  timeString: 'Not Set',
};

const formatDateAndTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = `${hours}:${minutes} ${ampm}`;

  return {
    dayString: days[date.getDay()],
    dateString: date.toLocaleDateString(),
    timeString,
  };
};

const DateAndTimeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {taskName, description},
  } = route;

  const [date, setDate] = useState(new Date());
  const [selections, setSelections] = useState(initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (
      selections.dayString === 'Not Set' ||
      selections.dateString === 'Not Set' ||
      selections.timeString === 'Not Set'
    ) {
      return;
    }

    navigation.navigate('Location', {
      taskName,
      description,
      date: selections.dateString,
      time: selections.timeString,
      day: selections.dayString,
    });
  };

  const handleDateChange = newDate => {
    setDate(newDate);
    setSelections(formatDateAndTime(newDate));
  };

  const handlePickDate = () => {
    setShowDatePicker(!showDatePicker);
    setShowTimePicker(false);
  };

  const handlePickTime = () => {
    setShowTimePicker(!showTimePicker);
    setShowDatePicker(false);
  };

  const ProgressBarContainer = () => (
    <View style={styles.progressBarContainer}>
      <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={1} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <ProgressBarContainer />
        <Text style={styles.title}>Choose a Date and Time</Text>
        <Text style={styles.details}>When do you need this done?</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.previewText}>
            <Text style={{fontWeight: 'bold'}}>Selected Date: </Text>
            {selections.dateString}
          </Text>
          <Text style={styles.previewText}>
            <Text style={{fontWeight: 'bold'}}>Selected Day: </Text>
            {selections.dayString}
          </Text>
          <Text style={styles.previewText}>
            <Text style={{fontWeight: 'bold'}}>Selected Time: </Text>
            {selections.timeString}
          </Text>
        </View>

        <CustomButton
          title={showDatePicker ? 'Hide Date Picker' : 'Pick Date'}
          onPress={handlePickDate}
        />
        <CustomButton
          title={showTimePicker ? 'Hide Time Picker' : 'Pick Time'}
          onPress={handlePickTime}
        />

        {showDatePicker && (
          <View style={styles.centeredContainer}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={handleDateChange}
              is24Hour={true}
            />
          </View>
        )}

        {showTimePicker && (
          <View style={styles.centeredContainer}>
            <DatePicker
              mode="time"
              date={date}
              onDateChange={handleDateChange}
              is24Hour={true}
            />
          </View>
        )}

        <Button
          title="CONTINUE"
          onPress={handleSubmit}
          disabled={
            selections.dayString === 'Not Set' ||
            selections.dateString === 'Not Set' ||
            selections.timeString === 'Not Set'
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(30),
  },
  scrollView: {
    flex: 1,
  },
  progressBarContainer: {
    width: scale(65),
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginTop: verticalScale(30),
  },
  details: {
    color: '#5C5B5B',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  button: {
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: verticalScale(20),
    backgroundColor: '#120D92',
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  dateContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#120D92',
    marginBottom: verticalScale(20),
    padding: scale(10),
  },
  previewText: {
    fontSize: RFPercentage(2),
    color: '#000',
    lineHeight: 40,
  },
  continueButton: {
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: verticalScale(80),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
});

export default DateAndTimeScreen;
