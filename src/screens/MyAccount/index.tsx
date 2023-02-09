import {Dimensions, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {title} from '../../enum/title.enum';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import FormField from '../../components/FormField';
import {useForm, Controller} from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AcceptTermsCondition from '../../components/AcceptTermsCondition';
import CustomButton from '../../components/CustomButton';
import {get, toUpper} from 'lodash';
import axios from 'axios';
import {authenticationUrls, settingsApiUrls} from '../../utils/apiagent';
import {getMessageFromError} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import Eye from '../../components/Svgs/Eye';
import EyeClose from '../../components/Svgs/EyeClose';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import {strings} from '../../utils/localeLanguage';
import OutlineButton from '../../components/OutlineButton';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
  isEditable?: boolean;
}

const Index = (props: IProps) => {
  const {navigation, isEditable} = props;
  const userDetails = useSelector((state: any) => state.userState.user);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...userDetails,
      phone_number: get(userDetails, 'phone', ''),
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);

  useEffect(() => {
    setValue('first_name', get(userDetails, 'first_name', ''));
    setValue('last_name', get(userDetails, 'last_name', ''));
    setValue('email', get(userDetails, 'email', ''));
    setValue('phone_number', get(userDetails, 'phone', ''));
  }, [userDetails]);

  const onSubmit = async (data: any) => {
    setFormError({});
    setLoading(true);
    const token = await AsyncStorage.getItem('token');

    if (token) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      if (data.password) formData.append('password', data.password);
      if (data.confirm_password)
        formData.append('confirm_password', data.confirm_password);

      axios
        .post(settingsApiUrls.updateProfile, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (get(res, 'status', '') === 200) {
            Toast.show({
              text1: strings.profileUpdateSuccess,
              type: 'success',
              position: 'top',
            });
            dispatch(
              updateUserDetails({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone_number,
              }),
            );
          }
          navigation.navigate('Profile');
        })
        .catch(error => {
          setFormError(get(error, 'response.data.error', {}));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(udpateIsUserLoggedIn(false));
      setLoading(false);
    }
  };

  const handleBack = () => {
    // setFormError({});
    // clearErrors();
    navigation.goBack();
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      strings.deleteAccount,
      strings.deleteAccountConfirmation,
      [
        {
          text: strings.no,
          style: 'cancel',
        },
        {
          text: strings.yes,
          onPress: async () => {
            setDeleteAccountLoading(true);
            const token = await AsyncStorage.getItem('token');
            axios
              .post(
                authenticationUrls.deleteAccount,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
              .then(async res => {
                if (get(res, 'status', '') === 201) {
                  await AsyncStorage.removeItem('token');
                  dispatch(udpateIsUserLoggedIn(false));
                  Alert.alert(strings.success, strings.deleteAccountSuccess);
                }
                setDeleteAccountLoading(false);
              })
              .catch(error => {
                setFormError(get(error, 'response.data.error', {}));
                setDeleteAccountLoading(false);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <AuthenticationLayout
      heading={isEditable ? strings.editProfile : strings.myAccount}
      description={''}
      icon={isEditable ? true : false}
      onIconPress={handleBack}
      headerStyle={styles.header}
      onIconPressRight={
        isEditable ? null : () => navigation.navigate('Settings')
      }>
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
                  editable={isEditable ? true : false}
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
                editable={isEditable ? true : false}
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
              editable={isEditable ? true : false}
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
              editable={isEditable ? true : false}
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
              icon={showPassword ? <Eye /> : <EyeClose />}
              onPressIcon={() => setShowPassword(!showPassword)}
              error={get(
                errors,
                'password.message',
                getMessageFromError(formError, 'password'),
              )}
              editable={isEditable ? true : false}
            />
          )}
          rules={
            {
              // required: {
              //   value: true,
              //   message: 'Password is required!',
              // },
            }
          }
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({field: {onChange, value, onBlur}}) => (
            <FormField
              label={strings.confirmPassword}
              placeholder={strings.confirmPassword}
              value={value}
              onBlur={onBlur}
              secureTextEntry={!showConfirmPassword}
              setValue={onChange}
              icon={showConfirmPassword ? <Eye /> : <EyeClose />}
              onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
              error={get(
                errors,
                'password_confirmation.message',
                getMessageFromError(formError, 'password_confirmation'),
              )}
              editable={isEditable ? true : false}
            />
          )}
          rules={{
            // required: {
            //   value: true,
            //   message: 'Confirm password is required!',
            // },
            validate: (value: any) =>
              value === getValues('password') || strings.passwordNotMatched,
          }}
        />
        <View style={[styles.signup, {marginTop: isEditable ? 40 : 18}]}>
          <CustomButton
            onPress={
              isEditable
                ? handleSubmit(onSubmit)
                : () => navigation.navigate('MyAccountEdit')
            }
            text={isEditable ? strings.save : toUpper(strings.editProfile)}
            loading={loading}
          />
        </View>
        <View>
          <CustomButton
            onPress={handleDeleteAccount}
            text={strings.deleteAccount}
            loading={deleteAccountLoading}
            buttonStyle={{backgroundColor: '#000'}}
          />
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
  text: {
    fontFamily: 'Mulish',
    fontSize: '.8rem',
    color: '#8A8A8A',
  },
  error: {
    color: 'red',
    paddingTop: '.2rem',
  },
  signup: {
    marginVertical: '1rem',
  },
  header: {
    height: height * 0.1,
    justifyContent: 'flex-end',
    paddingBottom: '1rem',
  },
});
