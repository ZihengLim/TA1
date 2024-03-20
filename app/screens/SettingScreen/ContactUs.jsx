import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const contacts = [
  {
    title: 'Customer Service',
    details: 'Phone: +60 87223464\n\nE-mail: Taskaway@gmail.com',
  },
  {
    title: 'Website',
    details: 'https://www.instagram.com/',
  },
];

const ContactUsComponent = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Error to open: ' + url);
      }
    });
  };

  return (
    <>
      {contacts.map((contact, index) => (
        <View key={index} style={styles.box}>
          <TouchableWithoutFeedback onPress={() => toggleExpand(index)}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name={contact.title === 'Website' ? 'globe' : 'mail-open'}
                  size={20}
                  color={'#120D92'}
                />
                <Text style={styles.headerText}>{contact.title}</Text>
              </View>
              <Ionicons
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={RFPercentage(3)}
                color="#000000"
              />
            </View>
          </TouchableWithoutFeedback>
          {expandedIndex === index && (
            <View style={styles.content}>
              {contact.details.startsWith('http') ? (
                <TouchableOpacity onPress={() => openURL(contact.details)}>
                  <Text style={[styles.contentText, {color: '#1B95E0'}]}>
                    {contact.details}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.contentText}>{contact.details}</Text>
              )}
            </View>
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    borderColor: '#4953ac',
    borderWidth: 1.5,
    marginBottom: verticalScale(20),
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    borderRadius: 10,
  },
  content: {
    borderColor: '#4953ac',
    borderTopWidth: 1.5,
    backgroundColor: '#ffffff',
    padding: verticalScale(10),
    borderRadius: 10,
  },
  headerText: {
    color: '#000000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    lineHeight: 25,
    marginLeft: scale(10),
  },
  contentText: {
    textAlign: 'justify',
    color: '#000000',
    fontSize: RFPercentage(2),
    lineHeight: 25,
  },
});

export default ContactUsComponent;
