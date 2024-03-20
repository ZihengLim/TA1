import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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

const ReviewOfferScreen = ({route}) => {
  const {taskId} = route.params;
  const [offers, setOffers] = useState([]);
  const [task, setTask] = useState(null); // Added state for task
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const acceptOffer = async offer => {
    if (!offer) {
      console.error('Offer is undefined or null.');
      return;
    }

    try {
      await firestore().collection('PostTask').doc(taskId).update({
        acceptedOfferId: offer.id,
        taskerUid: offer.uid,
      });

      await firestore()
        .collection('PostTask')
        .doc(taskId)
        .collection('Offers')
        .doc(offer.id)
        .update({
          status: 'accepted',
        });

      console.log('Offer accepted successfully');
      setModalVisible(false);
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  useEffect(() => {
    const taskUnsubscribe = firestore()
      .collection('PostTask')
      .doc(taskId)
      .onSnapshot(
        docSnapshot => {
          setTask({id: docSnapshot.id, ...docSnapshot.data()});
        },
        error => {
          console.log('Error fetching task:', error);
        },
      );

    const offersUnsubscribe = firestore()
      .collection('PostTask')
      .doc(taskId)
      .collection('Offers')
      .onSnapshot(
        querySnapshot => {
          const offersWithUserDetails = [];
          let promises = [];
          querySnapshot.forEach(doc => {
            const offer = doc.data();
            const userPromise = firestore()
              .collection('users')
              .doc(offer.uid)
              .get()
              .then(userDoc => {
                if (userDoc.exists) {
                  const {firstName, lastName, photoURL} = userDoc.data();
                  offersWithUserDetails.push({
                    id: doc.id,
                    offer: offer.offer,
                    timestamp: offer.timestamp,
                    uid: offer.uid,
                    userFirstName: firstName,
                    userLastName: lastName,
                    userPhotoURL: photoURL,
                  });
                }
              });
            promises.push(userPromise);
          });

          Promise.all(promises).then(() => {
            setOffers(offersWithUserDetails);
          });
        },
        error => {
          console.error('Error fetching offers:', error);
        },
      );

    console.log(task);

    return () => {
      taskUnsubscribe();
      offersUnsubscribe();
    };
  }, [taskId]);

  if (!task) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        backgroundColor="rgba(0, 0, 0, .9)"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalButtons}>
            <Text style={styles.modalText}>
              Are you sure you want to accept {'\n'}the offer from{' '}
              {selectedOffer?.userFirstName} {selectedOffer?.userLastName}?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonYes]}
                onPress={() => {
                  console.log('Offer Accepted');
                  setModalVisible(!modalVisible);
                  acceptOffer(selectedOffer);
                  navigation.navigate('PosterScreen');
                }}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonNo]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <TaskDetails task={task} />
        {offers.length > 0 ? (
          <FlatList
            data={offers}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.content}>
                <View style={{marginRight: scale(10)}}>
                  {item.userPhotoURL ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserDetails', {userId: item.uid})
                      }>
                      <Image
                        source={{uri: item.userPhotoURL}}
                        style={styles.userPhoto}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserDetails', {userId: item.uid})
                      }>
                      <Ionicons
                        style={{
                          marginVertical: verticalScale(8),
                          marginRight: scale(10),
                        }}
                        name="person-circle"
                        size={RFPercentage(12)}
                        color="#000"
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={{width: scale(120)}}>
                  <Text style={styles.userName}>
                    {item.userFirstName} {item.userLastName}
                  </Text>
                  <Text style={styles.offerAmount}>Offer: RM{item.offer}</Text>
                </View>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => {
                    setSelectedOffer(item);
                    setModalVisible(true);
                  }}>
                  <Text style={styles.acceptButtonText}>ACCEPT</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.noOffersContainer}>
            <FontAwesome6
              name="face-sad-tear"
              size={RFPercentage(5)}
              color="#120D92"
            />
            <Text style={styles.noOffersText}>No one has offered yet</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(100),
    paddingHorizontal: scale(20),
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    padding: scale(20),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#120D92',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
    color: '#000',
  },
  userPhoto: {
    width: scale(70),
    height: verticalScale(70),
    borderRadius: 60,
  },
  offerAmount: {
    fontSize: RFPercentage(2),
    color: '#3193ED',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#52C35E',
    width: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
    borderRadius: 5,
  },
  acceptButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#120D92',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#fff',
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
    padding: scale(13),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
    marginBottom: verticalScale(30),
    height: verticalScale(70),
  },
  budgetContainer: {
    alignSelf: 'center',
  },
  noOffersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(100),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#120d92',
    alignItems: 'center',
  },
  noOffersText: {
    fontSize: RFPercentage(2),
    color: '#000',
    fontWeight: 'bold',
    marginTop: verticalScale(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .9)',
  },
  modalButtons: {
    margin: scale(20),
    backgroundColor: 'white',
    borderRadius: 5,
    padding: scale(30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // for Android shadow
  },
  buttonYes: {
    backgroundColor: '#4CAF50', // Green color
    width: 100, // Example width
    height: 40, // Example height
  },
  buttonNo: {
    backgroundColor: '#f44336', // Red color
    width: 100, // Example width
    height: 40, // Example height
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  modalText: {
    color: '#000',
    fontSize: RFPercentage(2),
    textAlign: 'center',
    marginBottom: verticalScale(10),
    lineHeight: 25,
  },
});

export default ReviewOfferScreen;
