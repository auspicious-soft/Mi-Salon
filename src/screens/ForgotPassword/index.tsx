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
import {useDispatch} from 'react-redux';
import {updateForgotPasswordEmail} from '../../redux/user/user.action';
import Toast from 'react-native-toast-message';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const handleIconPress = () => {
    navigation.goBack();
  };

  const onSubmit = (data: any) => {
    dispatch(updateForgotPasswordEmail(get(data, 'email', '')));
    setErrorMsg('');
    setFormError({});
    setLoading(true);
    axios
      .post(authenticationUrls.forgotPassword, data)
      .then(res => {
        if (get(res, 'status', '') === 200) {
          Toast.show({
            type: 'success',
            text1: strings.verificationCodeSent,
            position: 'top',
            // text2: '',
          });
          navigation.navigate('VerificationCodeScreen');
        }
        setLoading(false);
      })
      .catch(error => {
        setFormError(get(error, 'response.data.error', {}));
        setErrorMsg(get(error, 'response.data.errors', ''));
        setLoading(false);
      });
  };

  return (
    <AuthenticationLayout
      heading={strings.forgotPassword}
      description={strings.forgotPasswordInstructions}
      icon
      onIconPress={handleIconPress}>
      <View style={{flex: 1}}>
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
                errorMsg || getMessageFromError(formError, 'email'),
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
    marginTop: '7rem',
  },
});
