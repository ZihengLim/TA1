import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import MyTaskScreen from '../screens/MyTaskScreen/MyTaskScreen';
import PostTaskScreen from '../screens/PostTask/PostTaskScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import MessageScreen from '../screens/MessageScreen/MessageScreen';

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home-outline',
    focusedIcon: 'home',
  },
  {
    name: 'MyTasks',
    component: MyTaskScreen,
    icon: 'folder-outline',
    focusedIcon: 'folder',
  },
  {
    name: 'PostTask',
    component: PostTaskScreen,
    icon: 'add-circle-outline',
    focusedIcon: 'add-circle',
  },
  {
    name: 'Messages',
    component: MessageScreen,
    icon: 'mail-outline',
    focusedIcon: 'mail',
  },
  {
    name: 'Setting',
    component: SettingScreen,
    icon: 'settings-outline',
    focusedIcon: 'settings',
  },
];

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#120D92',
        tabBarInactiveTintColor: 'grey',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {height: verticalScale(60)},
        tabBarIcon: ({focused, color, size}) => {
          const screen = screens.find(screen => screen.name === route.name);
          const iconName = focused ? screen.focusedIcon : screen.icon;
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarLabel: ({focused, color}) => {
          const screen = screens.find(screen => screen.name === route.name);
          return (
            <Text
              style={{
                paddingBottom: scale(10),
                fontSize: RFPercentage(1.6),
                fontWeight: focused ? 'bold' : 'normal',
                color: color,
              }}>
              {screen.name}
            </Text>
          );
        },
      })}>
      {screens.map(({name, component}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: name === 'PostTask',
            headerTitle: 'Post a Task',
            headerTitleStyle: {color: 'white'},
            headerTitleAlign: 'left',
            headerStyle: {backgroundColor: '#120D92'},
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabStack;
