import * as React from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';


export default function MyTasksScreen({ navigation }) {
    const [activeStep, setActiveStep] = useState(1);
    const [price, setPrice] = useState(0);

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
            <Text style={styles.stepText}>TASK DETAILS</Text>
            <Text style={styles.stepText1}>LOCATION</Text>
            <Text style={styles.stepText2}>COMPLETED</Text>
            </View>
            <View style={styles.boxContainer}>
                <View style={styles.box1}>
                    <Text style={styles.title}>
                       Enter Task Name
                    </Text>
                </View>
            </View>
            <TextInput
            style = {styles.input}
            placeholder = "Type here..."/>
             <View style={styles.box1}>
                <Text style={styles.title}>
                    Task Description
                </Text>
             </View>
             <TextInput
             style = {styles.input1}
            placeholder = "Task Description.."
            textAlignVertical='top'/>

            <View style={styles.box2}>
                <Text style={styles.title}>
            Price offer
                </Text>
                </View>
             <View style={styles.currencyInputContainer}>
        <CurrencyInput
          value={price}
          onChangeValue={(formattedValue, floatValue) => setPrice(formattedValue)}
          delimiter=","
          prefix="RM "
          separator="."
          precision={2}
          keyboardType="numeric"
        />
                </View>
                <View style={styles.box3}>
                <Text style={styles.title}>
            Upload Image
                </Text>
                </View>
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
        borderColor:'#525DC0',
        borderWidth: 2,
        backgroundColor: 'white',
        marginHorizontal: 60,

    },
    stepLine: {
        height: 2,
        backgroundColor: '#525DC0',
        position: 'absolute',
        zIndex:-1
    },
    textContainer:{
        flexDirection:"row",
        marginTop:2,
        position: 'relative', // Make it relative to the parent
        right:170, // Adjust the left position to align with the first button
    },
    stepText: {
        marginTop: 3,
        color: 'black',
        position: 'absolute',
        left:-5,
        fontSize: 11,
    },
    stepText1: {
        marginTop: 3,
        color: 'black',
        position: 'absolute',
        fontSize: 11,
        left: 147, // Adjust the left position to place it beside the stepText
    },
    stepText2: {
        marginTop: 3,
        color: 'black',
        position: 'absolute',
        fontSize: 11,
        left: 279, // Adjust the left position to place it beside the stepText
    },
    activeStep: {
        borderColor:'#525DC0',
        borderWidth: 2,
        backgroundColor: 'orange',
        
    },
    activeStepLine: {
        height: 2,
        backgroundColor: 'orange',
        position: 'absolute',
        top: 9,
    },
    
   
    boxContainer: {
        flexDirection: 'row',
        marginTop: 22,
    },
    box1: {
        flexDirection: 'row',
        right:130,
        height: 32,
        marginTop:2,
    },
    box2: {
        flexDirection: 'row',
        right:148,
        height: 32,
        marginTop:2,
    },
    box3: {
        flexDirection: 'row',
        right:137,
        height: 32,
        marginTop:2,
    },
 
    title: {
        fontSize: 20,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
    input:{
        height:40,
        borderColor: '#525DC0',
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    width: 370,
    borderRadius:10,
    },
    input1:{
        height:150,
        borderColor: '#525DC0',
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    width: 370,
    borderRadius:10,
    },
    currencyInputContainer: {
        marginTop: 0.5,
        borderWidth: 2,
        borderColor: '#525DC0',
        borderRadius: 10,
        width: 370,
        paddingHorizontal: 10,
        height:40,
      },
})
