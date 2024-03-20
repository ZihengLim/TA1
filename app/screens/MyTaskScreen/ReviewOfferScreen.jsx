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

const TaskBox = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentUserUID = auth().currentUser?.uid;
    if (!currentUserUID) return;

    const unsubscribe = firestore()
      .collection('PostTask')
      .where('userId', '==', currentUserUID)
      .onSnapshot(querySnapshot => {
        const tasksPromises = querySnapshot.docs.map(async doc => {
          const taskData = doc.data();
          const taskId = doc.id;

          // Fetch offers for this task
          const offersSnapshot = await firestore()
            .collection('offers')
            .where('taskId', '==', taskId)
            .get();

          const offers = await Promise.all(
            offersSnapshot.docs.map(async offerDoc => {
              const offerData = offerDoc.data();
              const userSnapshot = await firestore()
                .collection('users')
                .doc(offerData.userId) // Assuming offerData contains userId
                .get();

              return {
                ...offerData,
                user: userSnapshot.data(), // Including user details directly in offer
              };
            }),
          );

          return {
            ...taskData,
            id: taskId,
            offers, // Embedding offers with user details in task
          };
        });

        Promise.all(tasksPromises).then(setTasks);
      });

    return unsubscribe;
  }, []);

  return tasks.map((task, index) => (
    <View key={index} style={styles.cardContainer}>
      <TaskDetails task={task} />
      {task.offers.map((offer, offerIndex) => (
        <View key={offerIndex} style={styles.offerContainer}>
          <Image
            source={{uri: offer.user.photoURL || 'your_placeholder_image_url'}}
            style={styles.userImage}
          />
          <Text>{`${offer.user.firstName} ${offer.user.lastName}`}</Text>
          {/* Example: Displaying the offer amount (assuming it's named 'amount' in your data structure) */}
          <Text>Offer Amount: RM{offer.amount}</Text>
        </View>
      ))}
    </View>
  ));
};

const ReviewOfferScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TaskBox />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingVertical: scale(60),
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
    justifyContent: 'space-between',
    padding: verticalScale(10),
    backgroundColor: '#fff',
  },
  budgetContainer: {
    alignSelf: 'center',
  },
  applyListContainer: {
    borderColor: '#898989',
    borderWidth: 1,
    padding: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoURL: {},
});

export default ReviewOfferScreen;
