import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyTabBar from '../../components/MyTabBar';
import HomeNavigation from '../HomeNavigation';
import Home from '../../screens/Home';
import MyAccount from '../../screens/MyAccount';
import CheckAvailability from '../../screens/CheckAvailability';
import MyAppointments from '../../screens/MyAppointments';
import SalonProfile from '../../screens/SalonProfile';
import {View} from 'react-native';
import NewAppointment from '../../screens/NewAppointment';
import FavouriteSalon from '../../screens/FavouriteSalon';
import {useDispatch} from 'react-redux';
import {updateSelectedTab} from '../../redux/ui/ui.action';

const Tab = createBottomTabNavigator();

const Index = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      sceneContainerStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => <View style={{backgroundColor: '#fff'}}></View>,
      }}
      backBehavior="history"
      tabBar={props => <MyTabBar {...props} />}
      screenListeners={({navigation}) => ({
        tabPress: e => {
          dispatch(updateSelectedTab(e.target as string));
        },
      })}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Appointments" component={MyAppointments} />
      <Tab.Screen name="NewAppointments" component={NewAppointment} />
      <Tab.Screen name="Favourite" component={FavouriteSalon} />
      <Tab.Screen name="Profile" component={MyAccount} />
    </Tab.Navigator>
  );
};

export default Index;

const styles = EStyleSheet.create({});
