import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NoPostsIcon = () => (
  <View style={styles.noPostsContainer}>
    <View style={styles.iconContainer}>
      <Entypo name="folder" size={RFPercentage(5)} color="#120D92" />
    </View>
    <Text style={styles.noPostsText}>No Upcoming Tasks Available...</Text>
  </View>
);

const TaskDetails = ({task}) => (
  <View style={styles.details}>
    <View style={{flexDirection: 'row'}}>
      <DateDisplay date={task.date} day={task.day} />
      <TaskNameAndLocation name={task.taskName} location={task.location} />
      <Text style={styles.budgetText}>RM{offer.offer}</Text>
    </View>
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

const PosterUpcomingTask = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserUID, setCurrentUserUID] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setCurrentUserUID(user ? user.uid : null);
    });
    return subscriber;
  }, []);

  const fetchUpcomingTasks = useCallback(async () => {
    if (!currentUserUID) {
      console.log('No current user UID found');
      return;
    }

    setLoading(true);
    try {
      const tasksSnapshot = await firestore()
        .collection('PostTask')
        .where('acceptedOfferId', '!=', null)
        .get();

      const tasksData = await Promise.all(
        tasksSnapshot.docs.map(async taskDoc => {
          const offerId = taskDoc.data().acceptedOfferId;
          const offerSnapshot = await taskDoc.ref
            .collection('Offers')
            .doc(offerId)
            .get();

          if (!offerSnapshot.exists) {
            return null;
          }

          const offerData = offerSnapshot.data();
          const userSnapshot = await firestore()
            .collection('users')
            .doc(offerData.uid)
            .get();
          if (!userSnapshot.exists) {
            console.log('User data not found for UID:', offerData.uid);
            return null;
          }

          const userData = userSnapshot.data();
          return {
            id: taskDoc.id,
            taskName: taskDoc.data().taskName,
            location: taskDoc.data().location,
            taskerName: `${userData.firstName} ${userData.lastName}`,
            taskerPhotoUrl: userData.photoURL,
            offerPrice: offerData.price,
            offerDescription: offerData.description, // Assume your offer includes a description field
          };
        }),
      );

      setUpcomingTasks(tasksData.filter(task => task !== null));
    } catch (error) {
      console.error('Error fetching upcoming tasks:', error);
      Alert.alert('Error', 'Failed to fetch upcoming tasks.');
    } finally {
      setLoading(false);
    }
  }, [currentUserUID]);

  useEffect(() => {
    if (currentUserUID) {
      fetchUpcomingTasks();
    }
  }, [currentUserUID, fetchUpcomingTasks]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (upcomingTasks.length === 0) {
    return <NoPostsIcon />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {upcomingTasks.map(task => (
        <View style={styles.content}>
          <View style={styles.header}>
            <TaskDetails task={task} />
          </View>
          <View key={task.id} style={styles.taskContainer}>
            <View style={styles.lower}>
              {task.taskerPhotoUrl ? (
                <Image
                  source={{uri: task.taskerPhotoUrl}}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={RFPercentage(5)}
                  color="#000000"
                  style={{marginRight: scale(10)}}
                />
              )}
              <Text style={styles.name}>
                You accepted {task.taskerName} offer
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: verticalScale(10),
  },
  taskContainer: {
    borderWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#120D92',
  },
  header: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: '#120D92',
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: 60,
  },
  lower: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(70),
    padding: scale(10),
  },
  name: {
    color: '#000',
    marginLeft: scale(10),
    fontSize: RFPercentage(2),
  },
});

export default PosterUpcomingTask;
