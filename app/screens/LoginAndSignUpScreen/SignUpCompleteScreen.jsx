import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpCompleteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name={'checkmark-circle'}
          size={RFPercentage(25)}
          color={'#FDAB2F'}
          style={styles.icon}
        />
        <Text style={styles.completeText}>
          You have successfully{'\n'} signed up!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tab')}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  },
  button: {
    backgroundColor: '#FDAB2F',
    height: verticalScale(30),
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    elevation: 5,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default SignUpCompleteScreen;
