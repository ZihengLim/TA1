import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {scale, verticalScale} from 'react-native-size-matters';

// Enable layout animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQComponent = () => {
  const [faqs, setFAQs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let subscriber;
    if (auth().currentUser) {
      subscriber = firestore()
        .collection('faqs')
        .onSnapshot(querySnapshot => {
          const faqsArray = querySnapshot.docs.map(documentSnapshot => ({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          }));

          setFAQs(faqsArray);
        });
    } else {
      console.log('User not signed in');
    }

    return () => subscriber?.();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchText.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredFAQs(filtered);
    } else {
      setFilteredFAQs(faqs);
    }
  }, [searchText, faqs]);

  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        <Ionicons name={'search'} size={20} color={'#000000'} />
        <TextInput
          style={styles.searchBar}
          onChangeText={handleSearch}
          value={searchText}
          placeholder="Search FAQs"
          placeholderTextColor="#000000"
        />
      </View>
      {filteredFAQs.map((faq, index) => (
        <View key={faq.key} style={styles.box}>
          <TouchableWithoutFeedback onPress={() => toggleExpand(index)}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name={'chatbubbles'} size={20} color={'#120d92'} />
                <Text style={styles.headerText}>{faq.question}</Text>
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
              <Text style={styles.contentText}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#190D92',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(20),
  },
  searchBar: {
    flex: 1,
  },
  box: {
    borderColor: '#4953ac',
    borderWidth: 2,
    marginBottom: verticalScale(20),
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  content: {
    borderColor: '#120D92',
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
    width: scale(200),
  },
  contentText: {
    textAlign: 'justify',
    color: '#000000',
    fontSize: RFPercentage(2),
    lineHeight: 25,
  },
});

export default FAQComponent;
