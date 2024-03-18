import React, {version} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';

const instructions = [
  'Taskers will make offer',
  'Accept an offer',
  'Chat and get it done',
];

const Instruction = ({number, text}) => (
  <View style={styles.instruction}>
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{number}</Text>
    </View>
    <Text style={styles.instructionText}>{text}</Text>
  </View>
);

const PostTaskCompleteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          style={styles.icon}
          name="checkmark-circle"
          size={RFPercentage(25)}
          color="#FDAB2F"
        />
        <Text style={styles.completeText}>Your task is posted!</Text>
        <Text style={styles.bottomText}>Here's what next:</Text>
        {instructions.map((text, index) => (
          <Instruction key={index} number={index + 1} text={text} />
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  icon: {
    alignSelf: 'center',
  },
  completeText: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: verticalScale(30),
  },
  bottomText: {
    fontSize: RFPercentage(2.1),
    color: '#120D92',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: '#FDAB2F',
    borderRadius: 5,
    paddingVertical: RFPercentage(1),
    marginTop: verticalScale(30),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  numberContainer: {
    backgroundColor: '#120D92',
    borderRadius: 50,
    width: RFPercentage(3),
    height: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1),
  },
  number: {
    color: '#fff',
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: RFPercentage(2),
    color: '#120D92',
    fontWeight: 'bold',
  },
});

export default PostTaskCompleteScreen;
