import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import OfferPendingScreen from '../MyTaskScreen/OfferPendingScreen';

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

  const OfferPending = ({label}) => {
    let content;
    if (active === 'awaiting') {
      content = <OfferPendingScreen />;
    } else if (active === 'completed') {
      content = <View />;
    }
    return <View>{content}</View>;
  };

  return (
    <ScrollView style={{marginBottom: verticalScale(70)}}>
      <View style={styles.container}>{buttons.map(renderButton)}</View>
      <View style={styles.task}>
        <OfferPending label={'OFFER PENDING'} />
      </View>
    </ScrollView>
  );
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
