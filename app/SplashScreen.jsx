import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const SplashScreenImage = require('../assets/images/ignite.jpeg');

const SplashScreen = () => {
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimating(false);
      navigation.replace(auth().currentUser ? 'Tab' : 'Auth');
    }, 50);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={SplashScreenImage} />
        <ActivityIndicator animating={animating} color="#ffffff" size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: screenWidth,
    height: screenHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
