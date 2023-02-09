import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import {colors} from './src/enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ActivityIndicator, Dimensions} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './src/navigation/MainNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {udpateIsUserLoggedIn} from './src/redux/user/user.action';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

import {Settings} from 'react-native-fbsdk-next';
import {changeLanguage, setInterfaceLanguage} from './src/utils/localeLanguage';

Settings.initializeSDK();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

EStyleSheet.build({
  $rem: width > 340 ? 18 : 16,
});

const App = () => {
  const [loading, setLoading] = useState(false);
  const isUserLoggedIn = useSelector(
    (state: any) => state.userState.isLoggedIn,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true);

    const getAsyncStorage = async () => {
      setLoading(true);
      const tokenValue = await AsyncStorage.getItem('token');
      const languageValue = await AsyncStorage.getItem('language');
      languageValue ? changeLanguage(languageValue) : setInterfaceLanguage();
      dispatch(udpateIsUserLoggedIn(tokenValue ? true : false));
      
      setLoading(false);
    };
    getAsyncStorage();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 50}}
          size={'large'}
          color={colors.primary}

        />
      ) : isUserLoggedIn ? (
        <MainNavigation />
      ) : (
        <AuthStackNavigator />
      )}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
