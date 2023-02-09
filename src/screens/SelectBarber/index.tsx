import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import BarberCard from '../../components/BarberCard';
import CustomButton from '../../components/CustomButton';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {authenticationUrls, homeApiUrls} from '../../utils/apiagent';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import {get, isEmpty, map, size} from 'lodash';
import Toast from 'react-native-toast-message';
import {colors} from '../../enum/colors.enum';
import {updateSelectedBarber} from '../../redux/create_appointment/create_appointment.action';
import NotFound from '../../components/NotFound';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
  route: any;
}
const Index = (props: IProps) => {
  const {navigation, route} = props;
  const {salonId} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [barberList, setBarberList] = useState([]);
  const selectedBarber = useSelector(
    (state: any) => state.createAppointmentState.selectedBarber,
  );
  const selectedTreatment = useSelector(
    (state: any) => state.createAppointmentState.selectedTreatment,
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios
          .get(
            homeApiUrls.listSalonBarber(
              salonId,
              get(selectedTreatment, 'id', 0),
            ),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(res => {
            if (res.status === 200) {
              setBarberList(get(res, 'data.data[0].staff', []));
              // salon type 1 for hair salon and 2 for nail salon
              // res.data.type
            } else {
              Toast.show({
                type: 'error',
                text1: strings.salonDetailsNotFound,
                position: 'top',
              });
            }
          })
          .catch(err => {})
          .finally(() => {
            setLoading(false);
          });
      } else {
        dispatch(udpateIsUserLoggedIn(false));
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleNext = () => {
    if (!isEmpty(selectedBarber)) {
      navigation.navigate('CheckAvailability');
    } else {
      Toast.show({
        type: 'error',
        text1: strings.pleaseSelectBarber,
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardDismissMode="on-drag">
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              style={{marginTop: 50}}
              size={'large'}
              color={colors.primary}
            />
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <View>
              <Pressable onPress={() => navigation.goBack()}>
                <ArrowLeft color="black" />
              </Pressable>
              <Text style={styles.SelectHeading}>{strings.selectBarber}</Text>
              <View style={styles.barberList}>
                {size(barberList) > 0 ? (
                  map(barberList, (barber, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.barberCardList}
                      onPress={() => dispatch(updateSelectedBarber(barber))}>
                      <BarberCard
                        data={barber}
                        isSelected={
                          get(selectedBarber, 'id') == get(barber, 'id')
                        }
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.notFound}>
                    <NotFound message={'No barber(s) found!'} />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.button}>
              <CustomButton text={strings.next} onPress={handleNext} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  mainContainer: {
    paddingHorizontal: '1rem',
    paddingVertical: '1rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  SelectHeading: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '1.5rem',
    lineHeight: 38,
    color: '#343434',
    marginTop: '1rem',
  },
  image: {
    marginTop: 59,
    marginBottom: 25,
  },
  barberList: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  barberCardList: {
    width: '49%',
  },
  loadingContainer: {
    marginTop: height * 0.4,
  },
  notFound: {
    flex: 1,
    marginTop: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
