import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import MiSalonPrimary from '../../components/Svgs/MiSalonPrimary';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/FormField';
import {title} from '../../enum/title.enum';
import {getMessageFromError} from '../../utils/utils';
import {get} from 'lodash';
import CustomButton from '../../components/CustomButton';

const {width, height} = Dimensions.get('window');

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

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.backIcon}>
          <ArrowLeft />
        </View>
      </Pressable>
      <View style={styles.logo}>
        <MiSalonPrimary color="#fff" width={width * 0.4} />
      </View>
      <View style={styles.content__container}>
        <View style={{flex: 1}}>
          <Controller
            control={control}
            name="full_name"
            render={({field: {onChange, value, onBlur}}) => (
              <>
                <FormField
                  label={title.full_name}
                  placeholder="Enter full name"
                  value={value}
                  onBlur={onBlur}
                  setValue={onChange}
                  error={get(
                    errors,
                    'full_name.message',
                    getMessageFromError(formError, 'full_name'),
                  )}
                />
              </>
            )}
            rules={{
              required: {
                value: true,
                message: 'First name is required!',
              },
            }}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value, onBlur}}) => (
              <FormField
                label={title.email_address}
                placeholder="Email address"
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
                message: 'Email is required!',
              },
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                message: 'Invalid Email Address',
              },
            }}
          />
          <FormField
            label={'Message'}
            placeholder={'Enter your message'}
            value={undefined}
            setValue={undefined}
            onBlur={undefined}
            error={''}
            multiline
            numberOfLines={6}
            inputHeight={100}
            textAlignVertical={'top'}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <CustomButton text={'Submit'} onPress={undefined} />
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content__container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingVertical: '1.2rem',
    paddingHorizontal: '1rem',
  },
  backIcon: {
    // marginBottom: '1rem',
    padding: '1rem',
  },
  logo: {
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
});
