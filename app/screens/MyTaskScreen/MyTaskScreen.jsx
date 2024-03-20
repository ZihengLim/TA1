import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';
import PosterScreen from './PosterScreen';
import TaskerScreen from './TaskerScreen';

const MyTaskScreen = () => {
  const [active, setActive] = useState('Poster');

  const OptionButton = ({option, children}) => (
    <TouchableOpacity
      style={[
        styles.toggleSwitch,
        active === option &&
          (option === 'Poster' ? styles.posterActive : styles.active),
      ]}
      onPress={() => setActive(option)}>
      <Text
        style={[
          styles.toggleSwitchText,
          active === option && styles.activeText,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleSwitchContainer}>
        <OptionButton option="Poster">Poster</OptionButton>
        <OptionButton option="Tasker">Tasker</OptionButton>
      </View>
      <View style={styles.content}>
        {active === 'Poster' ? <PosterScreen /> : <TaskerScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: '#ffffff',
  },
  toggleSwitchContainer: {
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(30),
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  toggleSwitch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#FDAB2F',
  },
  toggleSwitchText: {
    color: '#000',
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
  content: {
    marginTop: verticalScale(20),
  },
  posterActive: {
    backgroundColor: '#120D92',
  },
});

export default MyTaskScreen;
