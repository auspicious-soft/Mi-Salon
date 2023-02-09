import {
  Alert,
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {title} from '../../enum/title.enum';
import FormField from '../../components/FormField';
import {useForm, Controller} from 'react-hook-form';
import EStyleSheet from 'react-native-extended-stylesheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../../enum/colors.enum';
import AcceptTermsCondition from '../../components/AcceptTermsCondition';
import CustomButton from '../../components/CustomButton';
import {get} from 'lodash';
import axios from 'axios';
import {authenticationUrls} from '../../utils/apiagent';
import {getMessageFromError} from '../../utils/utils';
import Eye from '../../components/Svgs/Eye';
import EyeClose from '../../components/Svgs/EyeClose';
import {strings} from '../../utils/localeLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Index = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setFormError({});
    setLoading(true);
    axios
      .post(authenticationUrls.signup, data)
      .then(res => {
        if (get(res, 'status', '') === 201) {
          Alert.alert(strings.success, strings.signUpSuccess);
          navigation.navigate('SignInScreen');
        }
        setLoading(false);
      })
      .catch(error => {
        setFormError(get(error, 'response.data.error', {}));
        setLoading(false);
      });
  };

  return (
    <AuthenticationLayout
      heading={strings.welcomeToMiSalon}
      description={strings.createYourAccount}>
      <View style={{flex: 1}}>
        <View style={styles.container__username}>
          <Controller
            control={control}
            name="first_name"
            render={({field: {onChange, value, onBlur}}) => (
              <>
                <FormField
                  formFieldStyle={styles.first_name}
                  label={strings.firstName}
                  placeholder={strings.firstName}
                  value={value}
                  onBlur={onBlur}
                  setValue={onChange}
                  error={get(
                    errors,
                    'first_name.message',
                    getMessageFromError(formError, 'first_name'),
                  )}
                />
              </>
            )}
            rules={{
              required: {
                value: true,
                message: strings.firstNameRequired,
              },
            }}
          />
          <Controller
            control={control}
            name="last_name"
            render={({field: {onChange, value, onBlur}}) => (
              <FormField
                formFieldStyle={styles.last_name}
                label={strings.lastName}
                placeholder={strings.lastName}
                value={value}
                onBlur={onBlur}
                setValue={onChange}
                error={get(
                  errors,
                  'last_name.message',
                  getMessageFromError(formError, 'last_name'),
                )}
              />
            )}
            rules={{
              required: {
                value: true,
                message: strings.lastNameRequired,
              },
            }}
          />
        </View>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value, onBlur}}) => (
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
          name="phone_number"
          render={({field: {onChange, value, onBlur}}) => (
            <FormField
              label={strings.phoneNumber}
              placeholder={strings.phoneNumber}
              value={value}
              onBlur={onBlur}
              setValue={onChange}
              keyboardType="numeric"
              error={get(
                errors,
                'phone_number.message',
                getMessageFromError(formError, 'phone_number'),
              )}
            />
          )}
          rules={{
            required: {
              value: true,
              message: strings.phoneNumberRequired,
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
        <Controller
          control={control}
          name="password_confirmation"
          render={({field: {onChange, value, onBlur}}) => (
            <FormField
              label={strings.confirmPassword}
              placeholder={strings.confirmPassword}
              value={value}
              onBlur={onBlur}
              secureTextEntry={!showConfirmPassword}
              setValue={onChange}
              icon={showConfirmPassword ? <EyeClose /> : <Eye />}
              onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
              error={get(
                errors,
                'password_confirmation.message',
                getMessageFromError(formError, 'password_confirmation'),
              )}
            />
          )}
          rules={{
            required: {
              value: true,
              message: strings.confirmPasswordRequired,
            },
            validate: (value: any) =>
              value === getValues('password') || strings.passwordNotMatched,
          }}
        />
        <Controller
          control={control}
          name="checkbox"
          render={({field: {onChange, value, onBlur}}) => (
            <View style={styles.checkbox}>
              <BouncyCheckbox
                // disableText
                textComponent={<AcceptTermsCondition />}
                fillColor={colors.primary}
                onPress={onChange}
                iconStyle={styles.checkboxIconStyle}
              />
              {get(
                errors,
                'checkbox.message',
                getMessageFromError(formError, 'checkbox'),
              ) && (
                <Text style={styles.error}>
                  {get(errors, 'checkbox.message', '') ||
                    getMessageFromError(formError, 'checkbox')}
                </Text>
              )}
            </View>
          )}
          rules={{
            required: {
              value: true,
              message: strings.pleaseAcceptToContinue,
            },
          }}
        />

        <CustomButton
          onPress={handleSubmit(onSubmit)}
          text={strings.signUP}
          loading={loading}
        />
        <View style={styles.signInOption}>
          <Text style={styles.text}>{strings.alreadyHaveAnAccount}</Text>
          <Text
            onPress={() => navigation.navigate('SignInScreen')}
            style={[styles.text, styles.signIn]}>
            {' '}
            {strings.signIn}
          </Text>
        </View>
      </View>
    </AuthenticationLayout>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container__username: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  first_name: {
    marginRight: '1rem',
    width: width * 0.42,
  },
  last_name: {
    width: width * 0.42,
  },
  checkbox: {
    marginTop: '.8rem',
    marginBottom: '1.2rem',
  },
  checkboxIconStyle: {
    borderRadius: 7,
  },
  signInOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1rem',
  },
  text: {
    fontFamily: 'Mulish',
    fontSize: '.8rem',
    color: '#8A8A8A',
  },
  signIn: {
    color: colors.primary,
  },
  error: {
    color: 'red',
    paddingTop: '.2rem',
  },
});
