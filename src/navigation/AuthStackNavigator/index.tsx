import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ForgotPassword from '../../screens/ForgotPassword';
import VerificationCode from '../../screens/VerificationCode';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

const Index = ({navigation}: any) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      <Stack.Screen name="SignInScreen" component={SignIn} />
      <Stack.Screen name="SignUpScreen" component={SignUp} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="VerificationCodeScreen"
        component={VerificationCode}
      />
    </Stack.Navigator>
  );
};

export default Index;
