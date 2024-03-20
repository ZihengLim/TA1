import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {verticalScale, scale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
            setEmail(user.email);
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

  const logout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await auth().signOut();
              navigation.replace('Auth');
            } catch (error) {
              if (error.code === 'auth/no-current-user') {
                navigation.replace('Auth');
              } else {
                alert(error.message);
              }
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const ProfileImage = () => {
    if (profileImageUrl) {
      return (
        <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
      );
    } else {
      return (
        <Ionicons
          style={{marginBottom: verticalScale(5), marginRight: scale(10)}}
          name="person-circle"
          size={RFPercentage(13)}
          color="#ffffff"
        />
      );
    }
  };

  const MenuItem = ({icon, title, onPress}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={27} color="#120D92" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <MaterialIcons name="navigate-next" size={RFPercentage(4)} color="grey" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileImage />
        <View style={styles.textSection}>
          <Text style={styles.greeting}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <Text style={styles.title}>Profile</Text>
      <MenuItem
        icon="person"
        title="Account"
        onPress={() => navigation.navigate('Account')}
      />
      <MenuItem icon="chatbubbles-sharp" title="My Review" />
      <MenuItem icon="star" title="Starred List" />
      <Text style={styles.title}>General</Text>
      <MenuItem icon="settings" title="Settings" />
      <MenuItem
        icon="help-circle"
        title="Help Centre"
        onPress={() => navigation.navigate('HelpCentre')}
      />
      <MenuItem
        icon="document"
        title="Privacy Policy"
        onPress={() => navigation.navigate('PrivacyPolicy')}
      />
      <MenuItem icon="exit" title="Sign Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#120D92',
    height: verticalScale(110),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  greeting: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: '#120D92',
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    marginLeft: 20,
    fontWeight: '500',
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(15),
    marginLeft: scale(10),
  },
  profileImage: {
    height: verticalScale(70),
    width: scale(70),
    borderRadius: 60,
    marginVertical: verticalScale(10),
    marginRight: scale(20),
  },
  email: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
  },
});

export default SettingScreen;
