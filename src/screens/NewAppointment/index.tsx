import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import SearchBar from '../../components/SearchBar';
import IconButton from '../../components/IconButton';
import Geolocation from '@react-native-community/geolocation';
import Location from '../../components/Svgs/Location';
import AppointmentCard from '../../components/AppointmentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  authenticationUrls,
  homeApiUrls,
  myAppointmentApiUrls,
} from '../../utils/apiagent';
import {add, get, size, toNumber, toString} from 'lodash';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import {useDispatch, useSelector} from 'react-redux';
import {appointmentQuery} from '../../enum/appointmentQuery.enum';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import NotFound from '../../components/NotFound';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [value, setValue] = useState('');
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.userState.user);
  const [repeatLoading, setRepeatLoading] = useState(false);
  const selectedTab = useSelector((state: any) => state.uiState.selectedTab);
  const isFocused = useIsFocused();

  useEffect(() => {
    setAppointmentList([]);
    const getData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios
          .get(authenticationUrls.user, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              dispatch(updateUserDetails(get(res, 'data', {})));
            }
          })
          .catch(error => {
            setLoading(false);
            // dispatch(udpateIsUserLoggedIn(false));
          });

        axios
          .get(
            myAppointmentApiUrls.listMyAppointments(
              get(userDetails, 'id', 1),
              appointmentQuery.PREVIOUS,
            ),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(res => {
            if (res.status === 200) {
              setAppointmentList(get(res, 'data.data', []));
            } else {
              Toast.show({
                type: 'error',
                text1: strings.noAppointmentFound,
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
  }, [isFocused]);

  const repeatAppointment = async (appointment: any) => {
    navigation.navigate('SalonProfile', {
      id: get(appointment, 'salon_id', 0),
    });
    // setRepeatLoading(true);
    // const token = await AsyncStorage.getItem('token');
    // console.log(
    //   'next mont dat',
    //   get(appointment, 'date'),
    //   moment(get(appointment, 'date')).add(1, 'M').format('YYYY-MM-DD'),
    // );

    // if (token) {
    //   axios
    //     .post(
    //       homeApiUrls.createAppointment,
    //       {
    //         date: moment(get(appointment, 'date'))
    //           .add(1, 'M')
    //           .format('YYYY-MM-DD'),
    //         salon_id: get(appointment, 'salon_id', ''),
    //         customer_id: get(userDetails, 'id', ''),
    //         staff_id: get(appointment, 'staff_id', ''),
    //         start_time: get(appointment, 'start_time', ''),
    //         end_time: get(appointment, 'end_time', ''),
    //         services_taken: get(appointment, 'services_taken', ''),
    //         total_cost: get(appointment, 'total_cost', ''),
    //         email: get(userDetails, 'email', ''),
    //         phone: get(userDetails, 'phone', ''),
    //         customer_note: '',
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       },
    //     )
    //     .then(res => {
    //       if (res.status === 200) {
    //         Toast.show({
    //           type: 'success',
    //           text1: 'Appointment created successfully!',
    //           position: 'top',
    //         });
    //         // setAppointmentList(
    //         //   appointmentList.filter(
    //         //     (appointment: any) => appointment.id !== canceAppointmentID,
    //         //   ),
    //         // );
    //       } else {
    //         Toast.show({
    //           type: 'error',
    //           text1: 'Appointment not found!',
    //           position: 'top',
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       console.log('erfbf', err);
    //     })
    //     .finally(() => {
    //       setRepeatLoading(false);
    //     });
    // } else {
    //   dispatch(udpateIsUserLoggedIn(false));
    //   setLoading(false);
    // }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>{strings.newAppointment}</Text>

        {loading ? (
          <ActivityIndicator
            style={{marginTop: 50}}
            size={'large'}
            color={colors.primary}
          />
        ) : size(appointmentList) > 0 ? (
          <>
            {/* <View style={styles.searchContainer}>
        <SearchBar
          // value={value}
          // setValue={setValue}
          onBlur={() => {}}
          width={'80%'}
        />
        <IconButton
          onPress={() => {
            Geolocation.getCurrentPosition(info => console.log(info));
          }}>
          <Location />
        </IconButton>
      </View> */}
            <FlatList
              nestedScrollEnabled
              style={{
                marginVertical: 10,
              }}
              data={appointmentList}
              renderItem={item => (
                <Pressable
                  key={get(item, 'item.id', 0)}
                  onPress={() =>
                    // navigation.navigate('ConfirmAppointmentWithPrice', {
                    //   appointmentId: get(item, 'item.id', ''),
                    // })
                    {}
                  }>
                  <AppointmentCard
                    showButton={true}
                    data={get(item, 'item', {})}
                    onPress={() => repeatAppointment(get(item, 'item', ''))}
                    buttonTitle={strings.repeat}
                  />
                </Pressable>
              )}
              keyExtractor={(item, index) =>
                get(item, 'item.id', toString(index))
              }
            />
          </>
        ) : (
          <NotFound message={strings.noPreviousAppointmentYet} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    padding: '1rem',
  },
  heading: {
    fontFamily: 'Mulish',
    fontSize: '1.5rem',
    color: colors.lightBlack,
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
});
