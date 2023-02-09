import {ActivityIndicator, Alert, Platform, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {authenticationUrls} from '../../utils/apiagent';
import {get, toLower} from 'lodash';
import FormField from '../../components/FormField';
import {getMessageFromError} from '../../utils/utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from '../../components/CustomButton';
import OutlineButton from '../../components/OutlineButton';
import {colors} from '../../enum/colors.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import Facebook from '../../components/Svgs/Facebook';
import Eye from '../../components/Svgs/Eye';
import EyeClose from '../../components/Svgs/EyeClose';
import Toast from 'react-native-toast-message';
import {strings} from '../../utils/localeLanguage';

const Index = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [facebookLoading, setfacebookLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (AccessToken.getCurrentAccessToken() != null) {
      LoginManager.logOut();
    }
  }, []);

  const onSubmit = (data: any) => {
    setErrorMsg('');
    setFormError({});
    setLoading(true);
    axios
      .post(authenticationUrls.login, {...data, remember_me: true})
      .then(async res => {
        if (get(res, 'status', '') === 200) {
          await AsyncStorage.setItem(
            'token',
            get(res, 'data.access_token', ''),
          );
          // Toast.show({
          //   type: 'success',
          //   text1: strings.loggedInSuccess,
          //   position: 'top',
          // });
          Alert.alert(strings.success, strings.loggedInSuccess);
          dispatch(udpateIsUserLoggedIn(true));
        }
        setLoading(false);
      })
      .catch(error => {
        setFormError(get(error, 'response.data.error', {}));
        setErrorMsg(get(error, 'response.data.message', ''));
        setLoading(false);
      });
  };

  const loginWithFacebook = () => {
    setfacebookLoading(true);
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('==> Login cancelled');
          setfacebookLoading(false);
        } else {
          console.log(
            '==> Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then((data: any) => {
            let accessToken = data.accessToken;

            const responseInfoCallback = async (error: any, result: any) => {
              if (error) {
                Toast.show({
                  type: 'error',
                  text1: error.toString(),
                  position: 'top',
                });
                setfacebookLoading(false);
              } else {
                console.log('==> User Info Response: ', result);
                await AsyncStorage.setItem(
                  'fb_token',
                  get(result, 'token', ''),
                );
                facebookBackend({
                  token: accessToken.toString(),
                  email: get(result, 'email', ''),
                  name: get(result, 'name', ''),
                  first_name: get(result, 'first_name', ''),
                  last_name: get(result, 'last_name', ''),
                  id: get(result, 'id', ''),
                });
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        if (AccessToken.getCurrentAccessToken() != null) {
          LoginManager.logOut();
        }
        Toast.show({
          type: 'error',
          text1: 'Login failed due to previous session. Please try again.',
          position: 'top',
        });
        setfacebookLoading(false);
      },
    );
  };

  const facebookBackend = async (data: any) => {
    // setfacebookLoading(true);
    console.log('==> facebookBackend', data);

    await axios
      .post(authenticationUrls.saveFbDetails, data)
      .then(async res => {
        if (get(res, 'status', '') === 200) {
          await AsyncStorage.setItem(
            'token',
            get(res, 'data.access_token', ''),
          );

          Toast.show({
            type: 'success',
            text1: strings.loggedInSuccess,
            position: 'top',
          });
        }
      })
      .catch(err => {
        console.log('==>Fb Backend Error: ', err);

        Toast.show({
          type: 'error',
          text1: strings.fbEmailNotAttached,
          position: 'top',
        });
      })
      .finally(() => {
        dispatch(udpateIsUserLoggedIn(true));
        setfacebookLoading(false);
      });
  };

  return (
    <AuthenticationLayout
      heading={strings.welcomeBack}
      description={strings.signInToContinue}>
      <View style={{flex: 1}}>
        {facebookLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>{strings.pleaseWait}</Text>
          </View>
        ) : (
          <>
            {/* <TextInput value={test} onChangeText={(value: any) => setTest(value)} /> */}
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <FormField
                  label={strings.emailAddress}
                  placeholder={strings.emailAddress}
                  value={value}
                  onBlur={onBlur}
                  setValue={onChange}
                  error={get(
                    errors,
                    'email.message',
                    getMessageFromError(formError, 'email'),
                  )}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: strings.emailRequired,
                },
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                  message: strings.emailInvalid,
                },
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value, onBlur}}) => (
                <FormField
                  label={strings.password}
                  placeholder={strings.password}
                  value={value}
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  setValue={onChange}
                  icon={showPassword ? <EyeClose /> : <Eye />}
                  onPressIcon={() => setShowPassword(!showPassword)}
                  error={get(
                    errors,
                    'password.message',
                    getMessageFromError(formError, 'password'),
                  )}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: strings.passwordRequired,
                },
              }}
            />
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            <Text
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              style={styles.forgotPassword}>
              Forgot Password?
            </Text>
            <View style={styles.loginButton}>
              <CustomButton
                onPress={handleSubmit(onSubmit)}
                text={strings.signIn}
                loading={loading}
              />
            </View>
            {Platform.OS === 'android' && (
              <>
                <Text style={styles.orText}>{strings.or}</Text>
                <View>
                  <OutlineButton
                    icon={
                      <View style={{marginRight: 10}}>
                        <Facebook />
                      </View>
                    }
                    onPress={loginWithFacebook}
                    text={strings.signInWithFacebook}
                    // loading={facebookLoading}
                  />
                </View>
              </>
            )}
            <View style={styles.signUpOption}>
              <Text style={styles.text}>{strings.dontHaveAccount}</Text>
              <Text
                onPress={() => navigation.navigate('SignUpScreen')}
                style={[styles.text, styles.signUp]}>
                {' '}
                {toLower(strings.signUP)}
              </Text>
            </View>
          </>
        )}
      </View>
    </AuthenticationLayout>
  );
};

export default Index;

const styles = EStyleSheet.create({
  forgotPassword: {
    fontFamily: 'Mulish',
    paddingTop: '1rem',
    textAlign: 'right',
    fontWeight: '500',
    color: '#343434',
  },
  loginButton: {
    marginTop: '5rem',
    marginBottom: '2.5rem',
  },
  orText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontWeight: '500',
    color: '#343434',
    marginBottom: '2.2rem',
  },
  signUpOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1rem',
  },
  text: {
    fontFamily: 'Mulish',
    fontSize: '.8rem',
    color: '#8A8A8A',
  },
  signUp: {
    color: colors.primary,
  },
  error: {
    color: 'red',
    paddingTop: '.5rem',
  },
  fbButton: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
});
