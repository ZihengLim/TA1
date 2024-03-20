import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Picker} from '@react-native-picker/picker';
import storage from '@react-native-firebase/storage';
import {scale, verticalScale} from 'react-native-size-matters';

const useUserData = () => {
  const [userData, setUserData] = useState({
    userPhoto: null,
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    skills: '',
    phone: '',
    language: '',
    userInfo: '',
  });

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(
        async doc => {
          if (doc.exists) {
            const updatedUserData = doc.data();
            const userPhotoURL = await getUserPhotoURL(
              updatedUserData.photoURL,
            );
            setUserData(prev => ({
              ...prev,
              ...updatedUserData,
              email: currentUser.email,
              phone: currentUser.phoneNumber,
              userPhoto: userPhotoURL || prev.userPhoto,
            }));
          }
        },
        err => {
          console.error('Failed to subscribe to user updates', err);
        },
      );

    return () => unsubscribe();
  }, []);

  const getUserPhotoURL = async photoURL => {
    if (photoURL) {
      try {
        return await storage().refFromURL(photoURL).getDownloadURL();
      } catch (error) {
        console.error('Failed to get photo URL', error);
      }
    }
    return null;
  };

  return [userData, setUserData];
};

const FieldInput = ({label, name, value, setUserData, placeholder}) => {
  const handleTextChange = text =>
    setUserData(prev => ({...prev, [name]: text}));

  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      {name === 'gender' ? (
        <View style={[styles.input, {paddingHorizontal: scale(1)}]}>
          <Picker
            mode="dropdown"
            selectedValue={value}
            onValueChange={handleTextChange}>
            {['Rather not say', 'Male', 'Female'].map(gender => (
              <Picker.Item
                style={styles.pickerText}
                key={gender}
                label={gender}
                value={gender.toLowerCase()}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder || label}
          value={value}
          onChangeText={handleTextChange}
        />
      )}
    </View>
  );
};

const AccountScreen = () => {
  const [userData, setUserData] = useUserData();
  const fields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
    },
    {name: 'lastName', label: 'Last Name', placeholder: 'Enter your last name'},
    {name: 'dob', label: 'Date of Birth', placeholder: 'DD/MM/YYYY'},
    {name: 'gender', label: 'Gender'},
    {
      name: 'userInfo',
      label: 'User Information',
      placeholder: 'Enter your user information',
    },
    {
      name: 'HomeAddress',
      label: 'Home Address',
      placeholder: 'Enter your home address',
    },
    {
      name: 'languages',
      label: 'Languages',
      placeholder: 'Enter your preferences language',
    },
    {
      name: 'skills',
      label: 'Skills',
      placeholder: 'Enter your skills details here',
    },
  ];

  const handleImageResponse = response => {
    if (!response.didCancel && !response.errorCode) {
      setUserData(prev => ({...prev, userPhoto: response.assets[0].uri}));
    }
  };

  const pickImage = () =>
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () => launchCamera({}, handleImageResponse),
      },
      {
        text: 'Choose from Gallery',
        onPress: () => launchImageLibrary({}, handleImageResponse),
      },
      {text: 'Cancel', style: 'cancel'},
    ]);

  const uploadImage = async imagePath => {
    const filename = imagePath.split('/').pop();
    try {
      await storage().ref(`photos/${filename}`).putFile(imagePath);
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

  const saveUserData = async () => {
    const {uid} = auth().currentUser ?? {};
    if (!uid) return Alert.alert('Error', 'No user is logged in');

    let {userPhoto, ...userInfo} = userData;
    if (userPhoto?.startsWith('file://')) {
      const uploadedPhoto = await uploadImage(userPhoto);
      if (!uploadedPhoto) return Alert.alert('Error', 'Failed to upload image');
      userPhoto = uploadedPhoto;
    }

    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .set({...userInfo, photoURL: userPhoto}, {merge: true});
      Alert.alert('Success', 'Your profile has been updated successfully');
    } catch (error) {
      console.error('Failed to save user data: ', error);
      Alert.alert('Error', 'Failed to save profile changes');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={styles.profileImageContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.profilePicTouchArea}>
          {userData.userPhoto ? (
            <Image
              source={{uri: userData.userPhoto}}
              style={styles.profileImage}
            />
          ) : (
            <Ionicons
              name="person-circle"
              size={RFPercentage(15)}
              color="grey"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
          <Ionicons name="camera" size={RFPercentage(3)} color="#000000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.email}>{userData.email || userData.phone}</Text>
      {fields.map(field => (
        <FieldInput
          key={field.name}
          {...field}
          value={userData[field.name]}
          setUserData={setUserData}
        />
      ))}
      <TouchableOpacity
        onPress={() => {
          saveUserData();
          Keyboard.dismiss();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(40),
  },
  profileImageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(20),
  },
  profileImage: {
    height: verticalScale(86),
    width: scale(85),
    borderRadius: 60,
    marginBottom: verticalScale(10),
  },
  editIcon: {
    position: 'absolute',
    right: scale(96),
    top: verticalScale(70),
  },
  email: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  input: {
    borderColor: '#120D92',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(15),
  },
  labelText: {
    color: '#000000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  pickerText: {
    fontSize: RFPercentage(1.8),
  },
  button: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: verticalScale(20),
    shadowColor: '#000000',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
});

export default AccountScreen;
