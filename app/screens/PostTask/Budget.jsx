import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ProgressBar from './ProgressBar'; // Ensure this component exists or remove this import if not used
import {useNavigation, useRoute} from '@react-navigation/native';

const BudgetScreen = () => {
  const {
    params: {
      taskName,
      description,
      date,
      day,
      time,
      photos,
      location,
      selectedOption,
    },
  } = useRoute();
  const [budget, setBudget] = useState(0);
  const [checkBox, setCheckBox] = useState(false);
  const navigation = useNavigation();

  const handleSliderChange = value => {
    setBudget(Math.round(value));
  };

  const handleInputChange = value => {
    const intValue = parseInt(value, 10);
    setBudget(isNaN(intValue) ? 0 : intValue);
  };

  const navigateNextScreen = () => {
    console.log({
      taskName,
      description,
      date,
      time,
      photos,
      location,
      selectedOption,
      budget,
      checkBox,
      day,
    });
    navigation.navigate('TaskConfirmation', {
      taskName,
      description,
      date,
      time,
      photos,
      location,
      selectedOption,
      budget,
      checkBox,
      day,
    });
  };

  const CustomButton = ({title, onPress, disabled}) => (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: disabled ? '#D9D9D9' : '#FDAB2F'},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const isContinueButtonEnabled = budget > 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <ProgressBar stages={[0, 1, 2, 3, 4]} currentStage={3} />
      </View>
      <Text style={styles.title}>Enter your budget</Text>
      <Text style={styles.subtitle}>
        Don't worry, you can always negotiate the final price later.
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={budget.toString()}
        onChangeText={handleInputChange}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000}
        step={1}
        value={budget}
        onValueChange={handleSliderChange}
      />
      <Text style={styles.currency}>MYR {budget}</Text>

      <View style={styles.checkboxContainer}>
        <FontAwesome
          name={checkBox ? 'check-square' : 'square'}
          size={RFPercentage(2.5)}
          color={'#D3D3D3'}
          onPress={() => setCheckBox(!checkBox)}
        />
        <Text style={styles.checkboxLabel}>
          I will provide material(s) required
        </Text>
      </View>
      <CustomButton
        title="CONTINUE"
        onPress={navigateNextScreen}
        disabled={!isContinueButtonEnabled}
      />
    </View>
  );
};

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
  subtitle: {
    color: '#5C5B5B',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    lineHeight: 23,
  },
  slider: {
    width: '100%',
    height: verticalScale(40),
  },
  input: {
    borderColor: '#190D92',
    borderWidth: 2,
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    borderRadius: 5,
  },
  currency: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    textAlign: 'center',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(30),
  },
  checkboxLabel: {
    color: '#000',
    fontSize: RFPercentage(2),
    marginLeft: scale(10),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: verticalScale(30),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
});

export default BudgetScreen;
