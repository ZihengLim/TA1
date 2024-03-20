import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {scale, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';

const UserDetailsScreen = () => {
  const {
    params: {userId},
  } = useRoute();

  const [userData, setUserData] = useState([]);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = {id: doc.id, ...doc.data()};
          // Set HomeAddress to undefined if not set
          userData.HomeAddress = userData.HomeAddress || undefined;
          setUserData(userData);
          setPhotoURL(userData.photoURL);
        }
      });
    return unsubscribe;
  }, [userId]);

  // Helper function to render user information or a placeholder if empty
  const renderInformationOrPlaceholder = (information, placeholder) => {
    if (!information || information.trim().length === 0) {
      return <Text style={styles.userInformation}>{placeholder}</Text>;
    }
    return <Text style={styles.userInformation}>{information}</Text>;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.userInfoBox}>
          <View>
            {photoURL ? (
              <Image style={styles.profileImage} source={{uri: photoURL}} />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={RFPercentage(3.5)}
                color="#000"
              />
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={styles.gender}>{userData.gender}</Text>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="location-pin"
                size={RFPercentage(2.5)}
                color="red"
              />
              <Text style={styles.locationText}>
                {userData.HomeAddress || 'Location not set'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.userInformationContainer}>
          <Text style={styles.detailsText}>User Information</Text>
          <View style={styles.userInformationBox}>
            {renderInformationOrPlaceholder(
              userData.userInfo,
              'No user information provided...',
            )}
          </View>
          <Text style={styles.detailsText}>Skills</Text>
          <View style={styles.userInformationBox}>
            {renderInformationOrPlaceholder(
              userData.skills,
              'No skills added...',
            )}
          </View>
          <Text style={styles.detailsText}>Languages</Text>
          <View style={styles.languagesBox}>
            {renderInformationOrPlaceholder(
              userData.languages,
              'No languages added...',
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#rgba(211,211,211,.1)',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(50),
    paddingHorizontal: scale(20),
  },
  profileImage: {
    height: verticalScale(60),
    width: scale(60),
    borderRadius: 60,
    marginRight: scale(10),
  },
  userInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(20),
    marginVertical: verticalScale(5),
    borderColor: '#898989',
    borderWidth: 1,
  },
  userInformationContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: scale(20),
    marginVertical: verticalScale(5),
    borderColor: '#898989',
    borderWidth: 1,
  },
  detailsText: {
    color: '#000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  userInformationBox: {
    borderColor: '#898989',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: verticalScale(10),
    height: verticalScale(100),
    padding: scale(10),
  },
  userInformation: {
    fontSize: RFPercentage(1.7),
    color: '#000',
  },
  languagesBox: {
    borderColor: '#898989',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: verticalScale(10),
    padding: scale(10),
    height: scale(50),
  },
  username: {
    color: '#000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginLeft: scale(5),
  },
  gender: {
    color: '#000',
    fontSize: RFPercentage(2),
    marginLeft: scale(5),
  },
  locationText: {
    color: '#000',
  },
});

export default UserDetailsScreen;
