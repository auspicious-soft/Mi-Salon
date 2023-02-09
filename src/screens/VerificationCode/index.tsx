import {Text, View} from 'react-native';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colors} from '../../enum/colors.enum';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {strings} from '../../utils/localeLanguage';

const CELL_COUNT = 6;

const Index = ({navigation}: any) => {
  const forgotPasswordEmail = useSelector(
    (state: any) => state.userState.forgotPasswordEmail,
  );
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleIconPress = () => {
    navigation.goBack();
  };

  const onSubmit = (data: any) => {
    if (!value) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: strings.pleaseEnterOtpFirst,
      });
    }
    setErrorMsg('');
    setFormError({});
    setLoading(true);
    axios
      .post(authenticationUrls.verificationOtp, {
        email: forgotPasswordEmail,
        otp: value,
      })
      .then(res => {
        if (get(res, 'status', '') === 200) {
          navigation.navigate('ChangePasswordScreen');
        }
        setLoading(false);
      })
      .catch(error => {
        setErrorMsg(get(error, 'response.data.status', ''));
        setLoading(false);
      });
  };

  const handleResend = () => {
    setLoadingResend(true);
    axios
      .post(authenticationUrls.forgotPassword, {
        email: forgotPasswordEmail,
      })
      .then(res => {
        if (get(res, 'status', '') === 200) {
          // navigation.navigate('VerificationCodeScreen');
          Toast.show({
            type: 'success',
            text1: strings.verificationCodeSent,
            position: 'top',
            // text2: '',
          });
        }
        setLoadingResend(false);
      })
      .catch(error => {
        // setFormError(get(error, 'response.data.error', {}));
        // setErrorMsg(get(error, 'response.data.message', ''));
        setLoadingResend(false);
      });
  };

  return (
    <AuthenticationLayout
      heading={strings.verificationCode}
      description={strings.confirmOtpDescription}
      icon
      onIconPress={handleIconPress}>
      <View style={{flex: 1}}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text style={styles.error}>{errorMsg}</Text>
        <Text
          onPress={loadingResend ? undefined : handleResend}
          style={styles.resend}>
          {loadingResend ? strings.pleaseWait : strings.resend}
        </Text>
        <View style={styles.nextButton}>
          <CustomButton
            onPress={onSubmit}
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: '2rem',
    // marginHorizontal: '1rem',
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: '1rem',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    backgroundColor: '#fff',
    elevation: 4,
  },
  focusCell: {
    borderColor: colors.primary,
  },
  resend: {
    textAlign: 'center',
    marginVertical: '1.2rem',
  },
  error: {
    color: 'red',
    paddingVertical: '.5rem',
  },
});
