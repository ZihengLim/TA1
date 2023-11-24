import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = ()=>{
        navigation.navigate('Home');
        setItem('onboarded', '1');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
        
    }
  return (
    <View style={styles.container}>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            // bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie style={{ width: '100%', height: '100%' }} source={require('../assets/animations/findtask.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Errands pilling up?',
                    subtitle: 'Finding short term job opportunities.',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie style={{ width: '100%', height: '100%' }} source={require('../assets/animations/findhelp.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Falling behind on tasks?',
                    subtitle: 'Asking for help for your job.',
                },
                {
                    backgroundColor: '#525DC0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie style={{ width: '100%', height: '100%' }} source={require('../assets/animations/tasker.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'To-do-list growing tremendously?',
                    subtitle: 'Real time messaging the service providers or job seekers.',
                },
            ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})
