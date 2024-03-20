import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale} from 'react-native-size-matters';

const height = Dimensions.get('window').height;

const NoPostsIcon = () => (
  <View style={styles.noPostsContainer}>
    <View style={styles.iconContainer}>
      <Entypo name="folder" size={RFPercentage(5)} color="#120D92" />
    </View>
    <Text style={styles.noPostsText}>No Offers Available...</Text>
  </View>
);

const DateDisplay = ({date, day}) => (
  <View style={styles.dateContainer}>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.date}>{day}</Text>
  </View>
);

const TaskNameAndLocation = ({name, location}) => (
  <View style={styles.nameLocation}>
    <Text style={styles.taskName}>{name}</Text>
    <View style={styles.locationContainer}>
      <Entypo name="location-pin" size={RFPercentage(2.5)} color="red" />
      <Text style={styles.location}>{location || 'Online'}</Text>
    </View>
  </View>
);

const TaskDetails = ({task}) => (
  <View style={styles.details}>
    <View style={{flexDirection: 'row'}}>
      <DateDisplay date={task.date} day={task.day} />
      <TaskNameAndLocation name={task.taskName} location={task.location} />
    </View>
    <View style={styles.budgetContainer}>
      <Text style={styles.budgetText}>RM{task.budget}</Text>
    </View>
  </View>
);

const TaskLowerSection = ({task}) => {
  const navigation = useNavigation();
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!task.userId) return;

    const unsubscribeUser = firestore()
      .collection('users')
      .doc(task.userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const {photoURL, firstName, lastName} = doc.data();
          setUserPhotoUrl(photoURL);
          setUsername(`${firstName} ${lastName}`);
        }
      });

    return unsubscribeUser;
  }, [task.userId]);

  return (
    <View style={styles.lower}>
      <View style={styles.user}>
        {userPhotoUrl ? (
          <Image style={styles.profileImage} source={{uri: userPhotoUrl}} />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={RFPercentage(5)}
            color="#000000"
            style={{marginRight: scale(10)}}
          />
        )}
        <Text style={styles.poster}>Post by {username}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('ReviewOffer', {taskId: task.id})}>
        <Text style={styles.buttonText}>REVIEW OFFERS</Text>
      </TouchableOpacity>
    </View>
  );
};

const PosterAwaitingScreen = () => {
  const [tasks, setTasks] = useState([]);
  const currentUserUID = auth().currentUser?.uid;

  useEffect(() => {
    if (!currentUserUID) return;

    const unsubscribe = firestore()
      .collection('PostTask')
      .where('userId', '==', currentUserUID)
      .onSnapshot(async querySnapshot => {
        const tasksData = [];
        for (const doc of querySnapshot.docs) {
          const offersSnapshot = await firestore()
            .collection('PostTask')
            .doc(doc.id)
            .collection('Offers')
            .where('status', '==', 'accepted')
            .get();

          if (offersSnapshot.empty) {
            // No accepted offers for this task
            tasksData.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        }
        setTasks(tasksData);
      });

    return unsubscribe;
  }, [currentUserUID]);

  if (tasks.length === 0) {
    return <NoPostsIcon />;
  }

  return (
    <View>
      {tasks.map((task, index) => (
        <View key={index} style={styles.cardContainer}>
          <TaskDetails task={task} />
          <TaskLowerSection task={task} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,
  },
  noPostsText: {
    color: '#120D92',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#120D92',
    width: scale(60),
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
    marginVertical: verticalScale(10),
  },
  dateContainer: {
    borderRightWidth: 2,
    borderColor: '#c3c3c3',
  },
  date: {
    color: '#120d92',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    paddingHorizontal: scale(10),
  },
  taskName: {
    color: '#000000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameLocation: {
    marginLeft: scale(10),
    width: scale(135),
  },
  location: {
    color: '#000000',
    fontSize: RFPercentage(1.8),
  },
  budgetText: {
    color: '#3193ed',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.8),
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: verticalScale(10),
    backgroundColor: '#fff',
  },
  budgetContainer: {
    alignSelf: 'center',
  },
  lower: {
    borderTopWidth: 2,
    borderColor: '#c3c3c3',
    padding: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: scale(30),
    height: verticalScale(30),
    borderRadius: 60,
    marginRight: scale(10),
  },
  viewButton: {
    backgroundColor: '#120D92',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(100),
    height: verticalScale(30),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold',
  },
  poster: {
    color: '#5C5B5B',
    fontSize: RFPercentage(1.8),
    fontWeight: 'bold',
  },
});

export default PosterAwaitingScreen;
