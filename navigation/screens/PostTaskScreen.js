import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

export default function MyTasksScreen({ navigation }) {
    const [activeStep, setActiveStep] = useState(1);
    const handleStepPress = (step) => {
        setActiveStep(step);
    };
    return (
        <View style={styles.container}>
            <View style={styles.postbox}>
                <Text style={styles.headerText}>
                    POST A TASK
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <TouchableOpacity
                    style={[styles.step, activeStep === 1 && styles.activeStep]}
                    onPress={() => handleStepPress(1)}
                />
                <View style={[styles.stepLine, { width: 125, left: 75 }]}/>
                
                <TouchableOpacity
                    style={[styles.step, activeStep === 2 && styles.activeStep]}
                    onPress={() => handleStepPress(2)}
                />
                <View style={[styles.stepLine, { width: 122, left: 220 }]} />  
                <TouchableOpacity
                    style={[styles.step, activeStep === 3 && styles.activeStep]}
                    onPress={() => handleStepPress(3)}
                />
            </View>
            <View style = {styles.textContainer}>
            <Text style={styles.stepText}>Task Details </Text>
            
            </View>
            <View style={styles.boxContainer}>
                <View style={styles.box1}>
                
                    <Text style={styles.title}>
                        Poster
                    </Text>
                </View>
                <View style={styles.box2}>
                    <Text style={styles.title}>Tasker </Text>
                </View>
            </View>
            <View style={styles.bottomBox}></View>
             
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    postbox: {
        backgroundColor: "#525DC0",
        elevation: 5,
        width: 410, // Full width
        height: 55, // Adjust height as needed
    },

    headerText: {
        marginTop: 13,
        marginLeft: 40,
        fontSize: 22,
        fontWeight: 'normal',
        fontFamily: 'roboto',
        color: 'white',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        postion:'relative',
    },
    step: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#525DC0',
        marginHorizontal: 60,

    },
    stepLine: {
        height: 2,
        backgroundColor: '#525DC0',
        position: 'absolute',
        zIndex:-1
    },
    stepText: {
        marginTop: 5,
        color: 'black',
        position: 'absolute',
        alignSelf: 'center', // Center the text under the button
    },
    activeStep: {
        backgroundColor: 'orange',
    },
    activeStepLine: {
        height: 2,
        backgroundColor: 'orange',
        position: 'absolute',
        top: 9,
    },
    
    textContainer:{
        flexDirection:"row",
        marginTop:10,
        position: 'relative', // Make it relative to the parent
        right:170, // Adjust the left position to align with the first button
    },
    boxContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    box1: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFA500",
        width: 224,// Adjusted width to cover the box inside the tasker
        marginRight: -20,// Added negative margin to overlap the next box
        zIndex: 1, // Set zIndex to 1 to bring box1 in front
        height: 48
    },
    box2: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        width: 224
    },
    title: {
        fontSize: 25,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: 'black'
    },
    bottomBox: {
        marginTop: 20,
        width: 410, // Adjust the width as needed
        height: 50, // Adjust the height as needed
        backgroundColor: 'white', // Set the background color
        borderRadius: 10, // Set border radius for rounded corners
        elevation: 5, // Set elevation for inner shadow effect
        shadowColor: 'black', // Set shadow color
        shadowOpacity: 0.5, // Set shadow opacity
        shadowOffset: { width: 0, height: 0 }, // Set shadow offset
        shadowRadius: 10, // Set shadow radius
    }
})
