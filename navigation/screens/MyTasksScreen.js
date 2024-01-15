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
                        poster
                      </Text>
                    </View>
                    <View style = { styles.box2 }>
                      <Text style = { styles.title }>
                        tasker
                      </Text>
                    </View>
                  </View>
                </View>
              )
            }
            const styles = StyleSheet.create({
                container: {
                  flex: 1,
                  alignItems: 'center'
                },
                headerText: {
                  marginTop: 20,
                  fontSize: 30,
                  fontWeight: '100'
                },
                boxContainer: {
                  flexDirection: 'row'
                },
                box1: {
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  backgroundColor: "#FFA500",
                  width: 200
                },
                box2: {
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  backgroundColor: "#ffffff",
                  width: 200
                },
                title: {
                  fontSize: 20
                }
              })
