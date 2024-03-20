import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {scale, verticalScale} from 'react-native-size-matters';
import {RFPercentage} from 'react-native-responsive-fontsize';

const PrivacyPolicyScreen = () => {
  const [privacyPolicies, setPrivacyPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('privacyPolicy')
      .onSnapshot(
        querySnapshot => {
          const policies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (!policies.length) {
            policies.push({
              title: 'Privacy Policy',
              details: 'No privacy policy found.',
            });
          }

          setPrivacyPolicies(policies);
          setLoading(false);
        },
        err => {
          console.error('Firestore fetch error: ', err);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {privacyPolicies.map(policy => (
          <View key={policy.id} style={styles.policyContainer}>
            <Text style={styles.title}>{policy.Title}</Text>
            <Text style={styles.details}>{policy.Details}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  content: {
    flex: 1,
  },
  policyContainer: {},
  title: {
    color: '#120D92',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },
  details: {
    color: '#000000',
    fontSize: RFPercentage(2),
    textAlign: 'justify',
    lineHeight: 23,
    marginBottom: verticalScale(10),
  },
});

export default PrivacyPolicyScreen;
