import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';

const TaskerScreen = () => {
  const [active, setActive] = useState('awaiting');

  const buttons = [
    {key: 'awaiting', label: 'Awaiting offers'},
    {key: 'upcoming', label: 'Upcoming Task'},
    {key: 'completed', label: 'Completed Task'},
  ];

  const renderButton = ({key, label}) => (
    <TouchableOpacity
      key={key}
      style={[styles.button, active === key && styles.activeButton]}
      onPress={() => setActive(key)}>
      <Text style={[styles.buttonText, active === key && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return <View style={styles.container}>{buttons.map(renderButton)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  button: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: scale(100),
  },
  activeButton: {
    backgroundColor: '#FDAB3F',
    flex: 1,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default TaskerScreen;
