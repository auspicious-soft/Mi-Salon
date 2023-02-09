import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="SearchHomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SearchHomeScreen" component={Home} />
      </Stack.Navigator>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
