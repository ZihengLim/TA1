import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';

const height = Dimensions.get('window').height;

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

const TaskDetails = ({task, offer}) => (
  <View style={styles.details}>
    <View style={{flexDirection: 'row'}}>
      <DateDisplay date={task.date} day={task.day} />
      <TaskNameAndLocation name={task.taskName} location={task.location} />
    </View>
    <View style={styles.budgetContainer}>
      <Text style={styles.budgetText}>RM{offer}</Text>
    </View>
  </View>
);

const TaskBox = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasksAndOffers = async () => {
      const currentUserUID = auth().currentUser.uid;
      try {
        const tasksSnapshot = await firestore().collection('PostTask').get();
        const tasksData = await Promise.all(
          tasksSnapshot.docs.map(async taskDoc => {
            const offersSnapshot = await taskDoc.ref
              .collection('Offers')
              .where('uid', '==', currentUserUID)
              .get();

            if (!offersSnapshot.empty) {
              const offers = offersSnapshot.docs.map(offerDoc =>
                offerDoc.data(),
              );
              return {
                ...taskDoc.data(),
                id: taskDoc.id,
                offers,
              };
            }
            return null;
          }),
        );

        setTasks(tasksData.filter(task => task !== null));
      } catch (error) {
        console.log('Error fetching tasks and offers:', error);
      }
    };
    {
      console.log(tasks.offer);
    }
    fetchTasksAndOffers();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {tasks.map((task, index) => (
        <View key={index} style={styles.cardContainer}>
          <TaskDetails task={task} offer={task.offer} />
        </View>
      ))}
    </ScrollView>
  );
};

const OfferPendingScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TaskBox />
    </ScrollView>
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
    borderColor: '#FDAB2F',
    width: scale(60),
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: '#FDAB2F',
    borderRadius: 5,
    marginTop: verticalScale(20),
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

export default OfferPendingScreen;
