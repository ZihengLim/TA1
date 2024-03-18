import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';

const TaskConfirmationScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {params} = useRoute();
  const {
    taskName,
    description,
    date,
    time,
    photos,
    location,
    selectedOption,
    budget,
    checkBox,
    day,
  } = params;

  const uploadImage = async photos => {
    // Check if photos is a string
    if (typeof photos !== 'string') {
      console.error('Invalid argument: photos should be a string.');
      return null;
    }

    const filename = photos.split('/').pop();
    try {
      await storage().ref(`photos/${filename}`).putFile(photos);
      const downloadURL = await storage()
        .ref(`photos/${filename}`)
        .getDownloadURL();
      setUserData(prev => ({...prev, userPhoto: downloadURL}));
      return downloadURL;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handlePostTask = async () => {
    setLoading(true);
    try {
      const photoURL = await uploadImage(photos); // Assuming only one photo is uploaded per task
      const taskData = {
        ...params,
        photoURL,
        userId: auth().currentUser.uid,
        // Include any other task-specific fields you need
      };

      // Save the task data into Firestore, using a new document ID
      await firestore().collection('PostTask').add(taskData);

      navigation.navigate('PostTaskComplete');
    } catch (e) {
      Alert.alert('Error', 'There was an error posting your task.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={4} />
      </View>
      <Text style={styles.header}>Alright, ready to post your task?</Text>
      {[
        {label: taskName, icon: 'task'},
        {label: description, icon: 'subtitles'},
        {label: `${date} ${time} ${day}`, icon: 'calendar-month'},
        {
          label:
            selectedOption === 'Online'
              ? 'Online'
              : `${selectedOption} - ${location}`,
          icon: 'location-on',
        },
        {
          label: `MYR ${budget} - ${
            checkBox ? 'Material(s) is provided' : 'Material(s) not provided'
          }`,
          icon: 'attach-money',
        },
      ].map((item, index) => (
        <View key={index} style={styles.box}>
          <MaterialIcons
            name={item.icon}
            size={RFPercentage(4)}
            color="#120D92"
          />
          <Text style={styles.text}>{item.label}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlePostTask();
          Keyboard.dismiss();
        }}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>POST</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(30),
    backgroundColor: '#fff',
  },
  progressBarContainer: {
    width: scale(65),
    marginBottom: verticalScale(30),
  },
  header: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(30),
  },
  box: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingRight: scale(22),
    paddingBottom: verticalScale(10),
    borderColor: '#120d92',
  },
  text: {
    marginLeft: scale(15),
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'justify',
    lineHeight: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: verticalScale(30),
    backgroundColor: '#FDAB2F',
    marginTop: verticalScale(50),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
});

export default TaskConfirmationScreen;
