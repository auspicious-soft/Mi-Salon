import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {title} from '../../enum/title.enum';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/FormField';
import {get} from 'lodash';
import {getMessageFromError} from '../../utils/utils';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {authenticationUrls} from '../../utils/apiagent';
import Eye from '../../components/Svgs/Eye';
import EyeClose from '../../components/Svgs/EyeClose';
import {strings} from '../../utils/localeLanguage';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

interface IProps {
  navigation: any;
  showOldPasswordField?: boolean;
}

const Index = (props: IProps) => {
  const {navigation, showOldPasswordField} = props;
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const forgotPasswordEmail = useSelector(
    (state: any) => state.userState.forgotPasswordEmail,
  );

  const handleIconPress = () => {
    navigation.goBack();
  };

  const onSubmit = (data: any) => {
    setErrorMsg('');
    setFormError({});
    setLoading(true);
    axios
      .post(authenticationUrls.changePassword, {
        ...data,
        email: forgotPasswordEmail,
      })
      .then(res => {
        if (get(res, 'status', '') === 200) {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: strings.passwordChangeSuccess,
          });
        }
        navigation.navigate('SignInScreen');
        setLoading(false);
      })
      .catch(error => {
        setFormError(get(error, 'response.data.error', {}));
        setErrorMsg(get(error, 'response.data.message', ''));
        Toast.show({
          type: 'error',
          position: 'top',
          text1: get(error, 'response.data.message', ''),
        });
        setLoading(false);
      });
  };

  return (
    <AuthenticationLayout
      heading={title.change_password}
      description={''}
      icon
      onIconPress={handleIconPress}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {showOldPasswordField ? (
            <Controller
              control={control}
              name="old_password"
              render={({field: {onChange, value, onBlur}}) => (
                <FormField
                  label={strings.oldPassword}
                  placeholder={strings.oldPassword}
                  value={value}
                  secureTextEntry={!showOldPassword}
                  onBlur={onBlur}
                  setValue={onChange}
                  icon={showOldPassword ? <EyeClose /> : <Eye />}
                  onPressIcon={() => setShowOldPassword(!showOldPassword)}
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
                  message: strings.oldPasswordRequired,
                },
              }}
            />
          ) : (
            <View></View>
          )}
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
        </View>
        <View style={styles.nextButton}>
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            text={strings.next}
            loading={loading}
          />
        </View>
      </View>
    </AuthenticationLayout>
  );
};

export default Index;

const styles = EStyleSheet.create({
  nextButton: {
    marginTop: '4rem',
  },
});
