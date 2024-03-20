import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FAQComponent from './FAQ';
import ContactUsComponent from './ContactUs';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';

const HelpCentreScreen = () => {
  const [active, setActive] = useState('FAQ');

  const handlePress = option => {
    setActive(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleSwitchContainer}>
        <TouchableOpacity
          style={[styles.toggleSwitch, active === 'FAQ' && styles.active]}
          onPress={() => handlePress('FAQ')}>
          <Text
            style={[
              styles.toggleSwitchText,
              active === 'FAQ' && styles.activeText,
            ]}>
            FAQs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleSwitch,
            active === 'Contact Us' && styles.active,
          ]}
          onPress={() => handlePress('Contact Us')}>
          <Text
            style={[
              styles.toggleSwitchText,
              active === 'Contact Us' && styles.activeText,
            ]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {active === 'FAQ' ? <FAQComponent /> : <ContactUsComponent />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    backgroundColor: '#ffffff',
  },
  toggleSwitchContainer: {
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(30),
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
  },
  toggleSwitch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 25,
  },
  active: {
    backgroundColor: '#FDAB2F',
  },
  toggleSwitchText: {
    color: '#000000',
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ffffff',
  },
  content: {
    marginTop: verticalScale(20),
  },
});

export default HelpCentreScreen;
