import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import BottomTabNavigator from '../BottomTabNavigator';
import SalonProfile from '../../screens/SalonProfile';
import SelectBarber from '../../screens/SelectBarber';
import CheckAvailability from '../../screens/CheckAvailability';
import ConfirmAppointment from '../../screens/ConfirmAppointment';
import MyAccount from '../../screens/MyAccount';
import Settings from '../../screens/Settings';
import ContactUs from '../../screens/ContactUs';
import ForgotPassword from '../../screens/ForgotPassword';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import Faq from '../../screens/Faq';
import TermsConditions from '../../screens/TermsConditions';
import ConfirmAppointmentPrice from '../../screens/ConfirmAppointmentPrice';
import Review from '../../screens/Review';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="SalonProfile" component={SalonProfile} />
        <Stack.Screen name="SelectBarber" component={SelectBarber} />
        <Stack.Screen name="CheckAvailability" component={CheckAvailability} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="ReviewScreen" component={Review} />
        <Stack.Screen
          name="ConfirmAppointment"
          component={ConfirmAppointment}
        />
        <Stack.Screen
          name="ConfirmAppointmentWithPrice"
          component={ConfirmAppointmentPrice}
        />

        <Stack.Screen name="MyAccountEdit">
          {props => <MyAccount {...props} isEditable={true} />}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword">
          {props => (
            <ChangePasswordScreen {...props} showOldPasswordField={true} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
