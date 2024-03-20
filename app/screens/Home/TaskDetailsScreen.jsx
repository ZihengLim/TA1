import React, {useState, useEffect} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const UserInfo = ({photoURL, username}) => (
  <View style={styles.userInfo}>
    {photoURL ? (
      <Image style={styles.profileImage} source={{uri: photoURL}} />
    ) : (
      <Ionicons
        name="person-circle-outline"
        size={RFPercentage(3.5)}
        color="#000"
      />
    )}
    <View>
      <Text style={styles.userText}>Posted by</Text>
      <Text style={styles.userName}>{username}</Text>
    </View>
  </View>
);

const OfferModal = ({visible, onRequestClose, onSubmitOffer}) => {
  const [offer, setOffer] = useState('');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please enter your desired amount</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            placeholder="RM"
            onChangeText={setOffer}
            value={offer}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onRequestClose}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onSubmitOffer(offer)}>
              <Text style={styles.applyButtonText}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const EnlargedImageModal = ({visible, onRequestClose, source}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}>
    <TouchableOpacity style={styles.modalBackground} onPress={onRequestClose}>
      <Image source={source} style={styles.enlargedImage} />
    </TouchableOpacity>
  </Modal>
);

const InfoItem = ({icon, color, title, content}) => (
  <View style={styles.detailRow}>
    <Entypo name={icon} size={RFPercentage(4)} color={color} />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailContent}>{content}</Text>
    </View>
  </View>
);

const TaskInfo = ({task}) => (
  <View>
    <Text style={styles.taskName}>{task.taskName}</Text>
    <InfoItem
      icon="location-pin"
      color="red"
      title="Location"
      content={task.location}
    />
    <InfoItem
      icon="calendar"
      color="#120D92"
      title="Date"
      content={`${task.day}, ${task.date}`}
    />
    <InfoItem icon="clock" color="#FDAB2F" title="Time" content={task.time} />
  </View>
);

const BudgetDetails = ({task, isPostOwner}) => {
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const handleOfferSubmit = async offerAmount => {
    setOfferModalVisible(false);
    const currentUser = auth().currentUser;

    if (!currentUser) {
      console.error('No user logged in!');
      return;
    }

    try {
      await firestore()
        .collection('PostTask')
        .doc(task.id)
        .collection('Offers')
        .add({
          uid: currentUser.uid,
          offer: parseFloat(offerAmount),
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      console.log('Offer added successfully!');
    } catch (error) {
      console.error('Error adding offer: ', error);
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.taskBudgetTitle}>Task Budget</Text>
      <Text style={styles.budgetText}>RM {task.budget}</Text>
      {!isPostOwner && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.offerButton}
            onPress={() => setOfferModalVisible(true)}>
            <Text style={styles.offerButtonText}>OFFER</Text>
          </TouchableOpacity>
        </View>
      )}
      <OfferModal
        visible={offerModalVisible}
        onRequestClose={() => setOfferModalVisible(false)}
        onSubmitOffer={handleOfferSubmit}
      />
    </View>
  );
};

const TaskDetails = ({task}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const openModal = uri => {
    setSelectedImageUri({uri});
    setModalVisible(true);
  };

  return (
    <View>
      <Text style={styles.taskName}>Details</Text>
      <Text style={styles.details}>{task.description}</Text>
      <Text style={styles.material}>
        {task.checkBox
          ? '\u2022 I will provide material(s) required'
          : '\u2022 I will not provide material(s) required'}
      </Text>
      <View style={styles.imagesContainer}>
        {task.photos &&
          task.photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openModal(photo.uri)}
              style={styles.imageWrapper}>
              <Image style={styles.taskImage} source={{uri: photo.uri}} />
            </TouchableOpacity>
          ))}
      </View>
      <EnlargedImageModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        source={selectedImageUri}
      />
    </View>
  );
};

const timeSince = timestamp => {
  if (!timestamp) return '';

  // Firestore timestamps should be converted to Date objects
  const offerDate = timestamp.toDate();
  const now = new Date();
  const secondsPast = (now.getTime() - offerDate.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)}s ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)}m ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)}h ago`;
  }
  if (secondsPast > 86400) {
    const daysPast = Math.round(secondsPast / 86400);
    return `${daysPast} day${daysPast > 1 ? 's' : ''} ago`;
  }
};

const OffersList = ({taskId}) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      let fetchedOffers = [];
      const offersSnapshot = await firestore()
        .collection('PostTask')
        .doc(taskId)
        .collection('Offers')
        .get();

      for (const offerDoc of offersSnapshot.docs) {
        const offerData = offerDoc.data();
        const userDoc = await firestore()
          .collection('users')
          .doc(offerData.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();

          fetchedOffers.push({
            ...offerData,
            userName: `${userData.firstName} ${userData.lastName}`,
            photoURL: userData.photoURL || 'default_photo_url_here',
            userId: offerData.uid,
          });
        }
      }

      setOffers(fetchedOffers);
    };

    fetchOffers();
  }, [taskId]);

  if (!offers.length) {
    return (
      <View>
        <Text style={[styles.userName, {marginBottom: verticalScale(10)}]}>
          Offers
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(2),
            color: '#000',
          }}>
          No offers yet.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={[styles.userName, {marginBottom: verticalScale(10)}]}>
        Offers
      </Text>
      {offers.map((offer, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: verticalScale(20),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                marginRight: scale(15),
                width: scale(50),
                height: verticalScale(50),
                borderRadius: 60,
              }}
              source={{uri: offer.photoURL}}
            />
            <View>
              <Text style={styles.userName}>{offer.userName}</Text>
              <Text style={{fontSize: RFPercentage(1.8)}}>Make an offer</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: RFPercentage(2),
              color: '#000',
              fontWeight: 'bold',
            }}>
            {timeSince(offer.timestamp)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const {
    params: {taskId},
  } = useRoute();
  const [task, setTask] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const [username, setUsername] = useState('');
  const [currentUserID, setCurrentUserID] = useState('');

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(user => {
      setCurrentUserID(user ? user.uid : '');
    });

    const unsubscribe = firestore()
      .collection('PostTask')
      .doc(taskId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const taskData = {id: doc.id, ...doc.data()};
          setTask(taskData);
          if (taskData.userId) {
            firestore()
              .collection('users')
              .doc(taskData.userId)
              .onSnapshot(userDoc => {
                if (userDoc.exists) {
                  const {photoURL, firstName, lastName} = userDoc.data();
                  setUserPhotoURL(photoURL);
                  setUsername(`${firstName} ${lastName}`);
                }
              });
          }
        }
      });

    const offersUnsubscribe = firestore()
      .collection('PostTask')
      .doc(taskId)
      .onSnapshot(doc => {
        if (doc.exists && doc.data().offers) {
          setOffers(doc.data().offers);
        }
      });

    return () => {
      unsubscribe();
      authSubscriber();
      offersUnsubscribe();
    };
  }, [taskId]);

  if (!task) return <Text>Loading task details...</Text>;

  const isPostOwner = task.userId === currentUserID;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
        <View style={styles.userBox}>
          <UserInfo photoURL={userPhotoURL} username={username} />
          <AntDesign
            name="arrowright"
            size={RFPercentage(4)}
            onPress={() =>
              navigation.navigate('UserDetails', {userId: task.userId})
            }
          />
        </View>
        <View style={styles.taskInfoBox}>
          <TaskInfo task={task} />
        </View>
        <View style={styles.taskDetailsBox}>
          <TaskDetails task={task} />
        </View>
        <View style={styles.taskDetailsBox}>
          <BudgetDetails task={task} isPostOwner={isPostOwner} />
        </View>
        <View style={styles.taskDetailsBox}>
          <OffersList taskId={task.id} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(50),
    paddingHorizontal: scale(20),
  },
  userBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
    marginVertical: verticalScale(5),
    borderColor: '#898989',
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  userName: {
    color: '#000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  userText: {
    color: '#898989',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  taskInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: scale(15),
    marginVertical: verticalScale(5),
    borderColor: '#898989',
    borderWidth: 1,
  },
  taskName: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#123',
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  detailTextContainer: {
    marginLeft: 10,
  },
  detailTitle: {
    color: '#898989',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  detailContent: {
    fontSize: RFPercentage(2),
    color: '#000',
  },
  taskDetailsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: scale(17),
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(6),
    borderColor: '#898989',
    borderWidth: 1,
  },
  details: {
    fontSize: RFPercentage(2),
    color: '#000000',
    marginVertical: verticalScale(10),
  },
  material: {
    fontSize: RFPercentage(2),
    color: '#5C5B5B',
    fontWeight: 'bold',
  },
  taskImage: {
    width: '100%',
    height: verticalScale(150),
    resizeMode: 'contain',
    marginVertical: verticalScale(5),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  enlargedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: verticalScale(10),
    marginLeft: scale(4),
  },
  imageWrapper: {
    width: scale(90),
    height: verticalScale(80),
    marginBottom: scale(10),
  },
  taskImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  taskBudgetTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#898989',
  },
  budgetText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000000',
    marginTop: verticalScale(5),
  },
  offerButton: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    width: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(10),
    shadowColor: '#000000',
    elevation: 5,
    marginLeft: scale(10),
  },
  offerButtonText: {
    color: '#ffffff',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#120D92',
    textAlign: 'center',
    fontSize: 18,
    width: scale(100),
    marginBottom: verticalScale(20),
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderColor: '#FDAB2F',
    borderWidth: 1,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#FDAB2F',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#FDAB2F',
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskDetailsScreen;
