import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginAndSignUpScreen/LoginScreen';
import SignUpScreen from '../screens/LoginAndSignUpScreen/SignUpScreen';
import TermsAndConditions from '../screens/LoginAndSignUpScreen/TermsAndConditionsScreen';
import PhoneNumberScreen from '../screens/LoginAndSignUpScreen/PhoneNumberScreen';
import OTPVerificationScreen from '../screens/LoginAndSignUpScreen/OTPVerificationScreen';
import ForgotPasswordScreen from '../screens/LoginAndSignUpScreen/ForgotPassword';
import CreateProfileScreen from '../screens/LoginAndSignUpScreen/createProfileScreen';
import SignUpCompleteScreen from '../screens/LoginAndSignUpScreen/SignUpCompleteScreen';
import SplashScreen from '../SplashScreen';
import TabStack from './TabNavigator';
import AccountScreen from '../screens/SettingScreen/AccountScreen';
import PrivacyPolicyScreen from '../screens/SettingScreen/PrivacyPolicyScreen';
import HelpCentreScreen from '../screens/SettingScreen/HelpCentreScreen';
import DateAndTimeScreen from '../screens/PostTask/DateAndTimeScreen';
import LocationScreen from '../screens/PostTask/LocationScreen';
import BudgetScreen from '../screens/PostTask/Budget';
import TaskConfirmationScreen from '../screens/PostTask/TaskConfirmationScreen';
import PostTaskCompleteScreen from '../screens/PostTask/PostTaskComplete';
import TaskDetailsScreen from '../screens/Home/TaskDetailsScreen';
import ReviewOfferScreen from '../screens/MyTaskScreen/ReviewOfferScreen';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerTransparent: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
        options={{headerTransparent: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
        options={{headerTransparent: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerTitle: 'Forgot Password', headerTransparent: true}}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpCompleteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={TabStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerTitle: 'Edit Profile',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#ffffff'},
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            headerTitle: 'Privacy Policy',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="HelpCentre"
          component={HelpCentreScreen}
          options={{
            headerTitle: 'Help Centre',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="DateAndTime"
          component={DateAndTimeScreen}
          options={{
            headerTitle: 'Edit Date and Time',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{
            headerTitle: 'Edit Location',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerTitle: 'Edit Budget',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="TaskConfirmation"
          component={TaskConfirmationScreen}
          options={{
            headerTitle: 'Task Confirmation',
            headerStyle: {backgroundColor: '#190D92'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="PostTaskComplete"
          component={PostTaskCompleteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{
            headerTransparent: true,
            headerTitle: 'Task Details',
          }}
        />
        <Stack.Screen
          name="ReviewOffer"
          component={ReviewOfferScreen}
          options={{
            headerTransparent: true,
            headerTitle: 'Review Offer',
            headerStyle: {backgroundColor: '#fff'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
