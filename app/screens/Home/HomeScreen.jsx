import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import TaskCard from './TaskCard';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        doc => {
          if (doc.exists) {
            const userData = doc.data();
            setUsername(`${userData.firstName} ${userData.lastName}`);
            const photoURL = userData.photoURL;
            if (photoURL) {
              if (photoURL.startsWith('gs://')) {
                const ref = storage().refFromURL(photoURL);
                ref
                  .getDownloadURL()
                  .then(setProfileImageUrl)
                  .catch(console.error);
              } else {
                setProfileImageUrl(photoURL);
              }
            }
          }
        },
        error => {
          console.error('Error fetching user data: ', error);
        },
      );

    return () => unsubscribe();
  }, []);

  const ProfileImage = () =>
    profileImageUrl ? (
      <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
    ) : (
      <Ionicons
        style={{marginVertical: verticalScale(8), marginRight: scale(10)}}
        name="person-circle"
        size={RFPercentage(8)}
        color="#ffffff"
      />
    );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <ProfileImage />
          <Text style={styles.greeting}>Welcome, {username}</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <Ionicons name={'search'} size={20} color={'#000000'} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search task here"
            selectionColor="#CACACA"
          />
        </View>
      </View>
      <ScrollView style={{flex: 1, padding: scale(15)}}>
        <TaskCard />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#120D92',
    height: verticalScale(140),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: verticalScale(50),
    width: scale(50),
    borderRadius: 60,
    marginVertical: verticalScale(10),
    marginRight: scale(20),
  },
  greeting: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(10),
    borderRadius: 5,
    marginVertical: verticalScale(5),
  },
  searchBar: {
    flex: 1,
  },
});

export default HomeScreen;
