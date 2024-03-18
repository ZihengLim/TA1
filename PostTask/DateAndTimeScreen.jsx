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
import ProgressBar from '../../screens/PostTask/ProgressBar';

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

const formatDateAndTime = date => ({
  dayString: days[date.getDay()],
  dateString: date.toLocaleDateString(),
  timeString: `${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`,
});

const DateAndTimeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {taskName, description},
  } = route;
  const [date, setDate] = useState(null); // Initialize date as null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (date) {
      const {dayString, dateString, timeString} = formatDateAndTime(date);
      navigation.navigate('Location', {
        taskName,
        description,
        date: dateString,
        time: timeString,
        day: dayString,
      });
    }
  };

  const handlePickDate = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  const handlePickTime = () => {
    setShowDatePicker(false);
    setShowTimePicker(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <View style={styles.progressBarContainer}>
          <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={2} />
        </View>
        <Text style={styles.title}>Choose a Date and Time</Text>
        <Text style={styles.details}>When do you need this done?</Text>

        {date && (
          <View style={styles.dateContainer}>
            <Text style={styles.previewText}>
              <Text style={{fontWeight: 'bold'}}>Selected Date: </Text>
              {date.toLocaleDateString()}
            </Text>
            <Text style={styles.previewText}>
              <Text style={{fontWeight: 'bold'}}>Selected Day: </Text>{' '}
              {days[date.getDay()]}
            </Text>
            <Text style={styles.previewText}>
              <Text style={{fontWeight: 'bold'}}>Selected Date: </Text>
              {`${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
              }${date.getMinutes()}`}
            </Text>
          </View>
        )}

        <CustomButton title="Pick Date" onPress={handlePickDate} />
        <CustomButton title="Pick Time" onPress={handlePickTime} />

        {showDatePicker && (
          <DatePicker
            mode="date"
            date={date || new Date()}
            onDateChange={newDate => {
              setDate(newDate);
              setShowDatePicker(false);
            }}
            is24Hour={true}
          />
        )}

        {showTimePicker && (
          <DatePicker
            mode="time"
            date={date || new Date()}
            onDateChange={newDate => {
              setDate(newDate);
              setShowTimePicker(false);
            }}
            is24Hour={true}
          />
        )}

        <Button title="CONTINUE" onPress={handleSubmit} disabled={!date} />
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
  previewBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
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
    marginTop: verticalScale(20),
    marginBottom: verticalScale(80),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
});

export default DateAndTimeScreen;
