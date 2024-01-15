import * as React from 'react';
import{View,Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<script src="https://unpkg.com/ionicons@latest/dist/ionicons.js"></script>
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screens
import HomeScreen from './screens/HomeScreen'
import MyTasksScreen from './screens/MyTasksScreen'
import SettingsScreen from './screens/SettingsScreen'
import PostTaskScreen from './screens/PostTaskScreen';
import MessageScreen from './screens/MessageScreen';

//Screen names
const homeName = "Home";
const MyTasksName = "My Tasks";
const settingsName = "Settings";
const PostTaskName = "Post Task";
const MessageName = "Message";

const Tab = createBottomTabNavigator();


const App = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
    
                if (rn === homeName) {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (rn === MyTasksName) {
                  iconName = focused ? 'reader' : 'reader-outline';
                } else if (rn === PostTaskName) {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (rn === MessageName) {
                  iconName = focused ? 'mail' : 'mail-outline';
                } else if (rn === settingsName) {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#525DC0',
              inactiveTintColor: 'black',
            }}
            tabBarStyle={{
              backgroundColor: 'white', // Customize the tab bar background color
              height: 70,
              paddingBottom: 10,
            }}
            tabBarItemStyle={{
              marginBottom: 10,
            }}
            tabBarLabelStyle={{
              fontSize: 10,
            
            }}>
    
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={MyTasksName} component={MyTasksScreen} />
            <Tab.Screen name={PostTaskName} component={PostTaskScreen} />
            <Tab.Screen name={MessageName} component={MessageScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
            

    
          </Tab.Navigator>
        </NavigationContainer>
      );
    }

export default App;
