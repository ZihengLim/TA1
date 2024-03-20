import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProgressBar from '../../screens/PostTask/ProgressBar';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

const LocationScreen = () => {
  const [photos, setPhotos] = useState([]);
  const {
    params: {taskName, description, date, time, day},
  } = useRoute();
  const [selectedOption, setSelectedOption] = useState('');
  const [location, setLocation] = useState('');
  const navigation = useNavigation();

  const addPhoto = useCallback(sourceType => {
    const options = {mediaType: 'photo', quality: 1};
    const callback = async response => {
      if (!response.didCancel && !response.error) {
        // Assuming response.assets[0].uri contains the file path
        const filePath = response.assets[0].uri;
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1); // Extract file name
        const uploadUri =
          Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;

        try {
          const reference = storage().ref(`photos/${fileName}`);
          // Upload the file to Firebase Storage
          await reference.putFile(uploadUri);
          // After uploading, get the download URL
          const url = await reference.getDownloadURL();
          // Use this URL to update your state or do something else with it
          setPhotos(prevPhotos => [...prevPhotos, {uri: url}]);
        } catch (e) {
          console.error(e);
        }
      }
    };

    sourceType === 'camera'
      ? launchCamera(options, callback)
      : launchImageLibrary(options, callback);
  }, []);

  const handleSubmit = useCallback(() => {
    navigation.navigate('Budget', {
      taskName,
      day,
      description,
      date,
      time,
      photos,
      isPhysical: selectedOption === 'Physical',
      ...(selectedOption === 'Physical' && {
        location,
        selectedOption: 'Physical',
      }),
      ...(selectedOption !== 'Physical' && {
        selectedOption: 'Online',
        location: null,
      }),
    });
  }, [
    taskName,
    description,
    date,
    time,
    day,
    photos,
    location,
    selectedOption,
    navigation,
  ]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <ProgressBarContainer />
      <TitleAndDetails title="Say Where" details="Where do you need it done?" />
      <OptionsContainer
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
      {selectedOption === 'Physical' && (
        <LocationInput location={location} onLocationChange={setLocation} />
      )}
      <PhotoContainer
        photos={photos}
        setPhotos={setPhotos}
        addPhoto={addPhoto}
      />
      <SubmitButton
        isEnabled={
          selectedOption && (selectedOption !== 'Physical' || location.trim())
        }
        onSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

const ProgressBarContainer = () => (
  <View style={styles.progressBarContainer}>
    <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={2} />
  </View>
);

const TitleAndDetails = ({title, details}) => (
  <>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.details}>{details}</Text>
  </>
);

const OptionsContainer = ({selectedOption, onSelect}) => {
  const options = ['Physical', 'Online'];
  return (
    <View style={styles.optionsContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.getOptionStyle(selectedOption === option)}
          onPress={() => onSelect(option)}>
          <Text style={styles.getOptionTextStyle(selectedOption === option)}>
            {option}
          </Text>
          <Text style={styles.optionDescription}>
            {option === 'Physical'
              ? 'They need to show up at a place'
              : 'They can do it from their home'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const LocationInput = ({location, onLocationChange}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Suburb</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter Your Location"
      onChangeText={onLocationChange}
      value={location}
    />
  </View>
);

const PhotoContainer = ({photos, setPhotos, addPhoto}) => (
  <View style={styles.photoContainer}>
    <Text style={styles.photoLabel}>Snap a photo</Text>
    <Text style={styles.photoSubtitle}>
      Help taskers understand what needs doing. Add up to 5 photos
    </Text>
    <View style={styles.photosList}>
      {photos.map((photo, index) => (
        <Photo
          key={index}
          photo={photo}
          onDelete={() => setPhotos(photos.filter((_, i) => i !== index))}
        />
      ))}
      {photos.length < 6 && (
        <TouchableOpacity
          onPress={() => addPhoto('library')}
          style={styles.addPhotoButton}>
          <Text style={styles.addPhotoText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const Photo = ({photo, onDelete}) => (
  <View style={styles.photoWrapper}>
    <Image source={{uri: photo.uri}} style={styles.photo} />
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteButtonText}>X</Text>
    </TouchableOpacity>
  </View>
);

const SubmitButton = ({isEnabled, onSubmit}) => (
  <TouchableOpacity
    style={[
      styles.button,
      {backgroundColor: isEnabled ? '#FDAB2F' : '#D9D9D9'},
    ]}
    onPress={onSubmit}
    disabled={!isEnabled}>
    <Text style={styles.buttonText}>CONTINUE</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(30),
    backgroundColor: '#fff',
  },
  progressBarContainer: {
    width: scale(65),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
  },
  details: {
    color: '#5C5B5B',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  getOptionStyle: isSelected => ({
    padding: scale(15),
    borderWidth: 2,
    borderColor: isSelected ? '#120D92' : '#D9D9D9',
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  }),
  getOptionTextStyle: isSelected => ({
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: isSelected ? '#120D92' : '#000',
  }),
  optionDescription: {
    color: '#5C5B5B',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  inputLabel: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(5),
  },
  input: {
    borderWidth: 2,
    borderColor: '#120D92',
    borderRadius: 5,
    paddingHorizontal: scale(10),
    fontSize: RFPercentage(2),
  },
  photoContainer: {
    marginBottom: verticalScale(20),
  },
  photoLabel: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(5),
  },
  photoSubtitle: {
    color: '#5C5B5B',
    fontSize: RFPercentage(2),
    marginBottom: verticalScale(15),
  },
  photosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addPhotoButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  addPhotoText: {
    fontSize: RFPercentage(6),
    color: '#D9D9D9',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
    borderRadius: 5,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(80),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
});

export default LocationScreen;
