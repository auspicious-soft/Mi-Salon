import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import BarberCard from '../../components/BarberCard';
import CustomButton from '../../components/CustomButton';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TimeCard from '../../components/TimeCard';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import moment from 'moment';
import {color} from '@rneui/base';
import {colors} from '../../enum/colors.enum';
import CalendarPicker from 'react-native-calendar-picker';
import AngelLeft from '../../components/Svgs/AngelLeft';
import AngelRight from '../../components/Svgs/AngelRight';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSelectedDate,
  updateSelectedTime,
} from '../../redux/create_appointment/create_appointment.action';
import {first, get, isEmpty, last, map, size, toString} from 'lodash';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {authenticationUrls, homeApiUrls} from '../../utils/apiagent';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import NotFound from '../../components/NotFound';
import {ScrollView} from 'react-native-gesture-handler';
import {convertTo12Hr} from '../../utils/utils';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  navigation: any;
}
const Index = (props: IProps) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: any) => state.createAppointmentState.selectedDate,
  );
  const selectedTime = useSelector(
    (state: any) => state.createAppointmentState.selectedTime,
  );
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedSalon = useSelector(
    (state: any) => state.createAppointmentState.selectedSalon,
  );

  useEffect(() => {
    dispatch(updateSelectedDate(moment().format('YYYY-MM-DD').toString()));
  }, []);

  useEffect(() => {
    setSlots([]);
    dispatch(updateSelectedTime({}));
    const getData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const formData = new FormData();
        const checkDate = selectedDate
          ? selectedDate
          : moment().format('YYYY-MM-DD').toString();
        formData.append('date', checkDate);
        formData.append('salon_id', get(selectedSalon, 'salon_id', ''));
        axios
          .post(homeApiUrls.slotsAvailability, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            if (res.status === 200) {
              setSlots(get(res, 'data.payload', []));
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
          .catch(err => {
            Toast.show({
              type: 'error',
              text1: strings.somethingWentWrong,
              position: 'top',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        dispatch(udpateIsUserLoggedIn(false));
        setLoading(false);
      }
    };
    getData();
  }, [selectedDate]);

  const handleBookNow = () => {
    if (!selectedDate || isEmpty(selectedTime)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: strings.pleaseSelectDateTime,
      });
    } else {
      navigation.navigate('ConfirmAppointment');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View>
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeft color="black" />
            </Pressable>
            <Text style={styles.SelectHeading}>
              {strings.checkAvailability}
            </Text>
            <View style={styles.calenderBox}>
              <CalendarPicker
                customDayHeaderStyles={() => ({
                  style: {
                    borderWidth: 0,
                    borderColor: 'white',
                    // margin: 50,
                  },
                  borderWidth: 0,
                  borderColor: 'white',
                })}
                previousComponent={<AngelLeft />}
                nextComponent={<AngelRight />}
                selectedDayColor={colors.primary}
                minDate={moment().format('YYYY-MM-DD') as any}
                selectedDayTextColor={colors.white}
                onDateChange={date => {
                  dispatch(
                    updateSelectedDate(
                      moment(date).format('YYYY-MM-DD').toString(),
                    ),
                  );
                }}
                weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                startFromMonday={true}
                todayBackgroundColor={colors.grey}
                todayTextStyle={{
                  color: colors.white,
                }}
                // initialDate={moment().format('YYYY-MM-DD') as any}
              />
            </View>
            <View>
              <Text style={styles.time}>Select Time</Text>
              {loading ? (
                <ActivityIndicator
                  style={{marginTop: 50}}
                  size={'large'}
                  color={colors.primary}
                />
              ) : size(slots) > 0 ? (
                <View>
                  <View style={styles.timeList}>
                    {map(get(first(slots), 'slots'), (slot, index) => {
                      return (
                        <TimeCard
                          key={index}
                          isSelected={
                            get(selectedTime, 'start_time') ==
                            get(slot, 'start_time')
                          }
                          data={slot}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={{marginVertical: 120}}>
                  <NotFound message={strings.noSlotsAvailable} />
                </View>
              )}
            </View>
          </View>
          {!loading && (
            <View style={styles.button}>
              <CustomButton text={strings.bookNow} onPress={handleBookNow} />
            </View>
          )}
        </View>
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
    marginTop: '1rem',
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 38,
    color: '#343434',
  },
  calenderBox: {
    marginTop: '.5rem',
    marginBottom: '.5rem',
  },
  timeList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '.8rem',
  },
  time: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 23,
    color: '#343434',
  },
});
