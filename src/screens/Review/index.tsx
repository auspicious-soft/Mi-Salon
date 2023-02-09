import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../enum/colors.enum';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {strings} from '../../utils/localeLanguage';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {authenticationUrls, homeApiUrls} from '../../utils/apiagent';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

interface IProps {
  navigation: any;
  route: any;
}
const Index = (props: IProps) => {
  const {navigation, route} = props;
  const {salonId} = route.params;
  const [count, setCount] = useState(0);
  const [review, setReview] = useState('');
  const [userToken, setUserToken] = useState<any>('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
      if (!token) {
        dispatch(udpateIsUserLoggedIn(false));
      }
    };
    getData();
  }, []);

  const submitReview = () => {
    if (!count || !review) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: strings.pleaseRateSalon,
      });
    }
    setLoading(true);
    axios
      .post(
        homeApiUrls.addReview,
        {
          salon_id: salonId,
          rating: count,
          comment: review,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: strings.reviewSuccess,
          });
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.response.data.message,
          position: 'top',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </Pressable>
        <Text style={styles.title}>{strings.addReview}</Text>
        <View style={styles.scrollView}>
          <AirbnbRating
            size={30}
            showRating={false}
            onFinishRating={setCount}
            defaultRating={0}
          />
          <FormField
            label={strings.writeReview}
            placeholder={strings.writeReview}
            value={review}
            setValue={setReview}
            onBlur={undefined}
            error={''}
            multiline
            numberOfLines={6}
            inputHeight={100}
            textAlignVertical={'top'}
          />
          <View style={styles.button}>
            <CustomButton
              text={strings.submit}
              onPress={submitReview}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    margin: '1rem',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.lightBlack,
    marginVertical: '1rem',
  },
  scrollView: {
    paddingBottom: '5rem',
  },
  text: {
    fontSize: '.9rem',
    color: '#525252',
    lineHeight: '1rem',
    marginVertical: '1rem',
  },
  button: {
    marginTop: '1.5rem',
  },
});
