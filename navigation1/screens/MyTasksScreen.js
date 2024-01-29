import * as React from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';


export default function MyTasksScreen({ navigation }) {
    return (
                <View style = { styles.container }>
                  <Text style = { styles.headerText }>
                     My Tasks
                  </Text>
                  <View style = { styles.boxContainer }>
                    <View style = { styles.box1 }>
                      <Text style = { styles.title }>
                        Poster
                      </Text>
                    </View>
                    <View style = { styles.box2 }>
                      <Text style = { styles.title }>Tasker </Text>
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
                headerText: {
                  marginTop: 20,
                  fontSize: 30,
                  fontWeight: 'bold',
                  fontFamily: 'roboto',
                  color:'black',
                },
                boxContainer: {
                  flexDirection: 'row',
                  marginTop:20,
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
                  height:48
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
                  fontWeight:'bold',
                  color:'black'
                },
                bottomBox:{
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
