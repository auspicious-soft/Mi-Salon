import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import ConfirmAppointmentDetails from '../../components/ConfirmAppointmentDetails';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../layout/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {first, get, isEmpty} from 'lodash';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {homeApiUrls, myAppointmentApiUrls} from '../../utils/apiagent';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import {clearAppointmentData} from '../../redux/create_appointment/create_appointment.action';
import NotFound from '../../components/NotFound';
import {getRandomIndex} from '../../utils/utils';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
  route: any;
}

const Index = (props: IProps) => {
  const {navigation, route} = props;
  const {appointmentId} = route.params;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.userState.user);
  const [customerNote, setCustomerNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setLoading(true);

        axios
          .get(myAppointmentApiUrls.appointmentDetails(appointmentId), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setAppointmentDetails(first(get(res, 'data.data', [{}])));

              // salon type 1 for hair salon and 2 for nail salon
              // res.data.type
            } else {
              Toast.show({
                type: 'error',
                text1: strings.somethingWentWrong,
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
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.tabContainer}>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator
                style={{marginTop: 50}}
                size={'large'}
                color={colors.primary}
              />
            </View>
          ) : isEmpty(appointmentDetails) ? (
            <View style={styles.notFound}>
              <NotFound message={strings.salonDetailsNotFound} />
            </View>
          ) : (
            <>
              <View style={styles.salonCardImage}>
                <Image
                  style={styles.image}
                  source={{
                    uri: get(
                      appointmentDetails,
                      `salon_image.${[
                        getRandomIndex(get(appointmentDetails, 'salon_image')),
                      ]}`,
                      '',
                    ),
                  }}
                />
                <View style={styles.topIcon}>
                  <Pressable onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </Pressable>
                  <View />
                </View>
              </View>
              <View style={styles.tabCardContainer}>
                <Text style={styles.heading}>
                  {get(appointmentDetails, 'salon_name', '')}
                </Text>
                <View style={styles.salonDetails}>
                  <View style={styles.salonName}>
                    <Text style={styles.title}>{strings.salonName}</Text>
                    <Text style={styles.titleName}>
                      {get(appointmentDetails, 'salon_name', '')}
                    </Text>
                  </View>
                  <View style={styles.salonService}>
                    <Text style={styles.title}>{strings.serviceName}</Text>
                    <Text style={styles.titleName}>
                      {get(appointmentDetails, 'service_name', '')}
                    </Text>
                  </View>
                </View>
                <ConfirmAppointmentDetails
                  selectedTreatment={{
                    treatment_rate: get(appointmentDetails, 'total_cost', ''),
                  }}
                  selectedDate={get(appointmentDetails, 'date', '')}
                  selectedTime={{
                    start_time: get(appointmentDetails, 'start_time', ''),
                    end_time: get(appointmentDetails, 'end_time', ''),
                  }}
                  selectedSalon={first(get(appointmentDetails, 'location', ''))}
                />
                <FormField
                  label={strings.customerNote}
                  placeholder={strings.somethingToKnow}
                  value={customerNote}
                  setValue={setCustomerNote}
                  onBlur={undefined}
                  error={''}
                  multiline
                  numberOfLines={6}
                  inputHeight={100}
                  textAlignVertical={'top'}
                />
                <View style={styles.button}>
                  <View>
                    <View
                      style={{
                        borderBottomColor: '#DDDDDD',
                        borderBottomWidth: 1,
                      }}
                    />
                    <View style={styles.priceDetails}>
                      <Text style={styles.priceTitle}>
                        {strings.totalPrice}
                      </Text>
                      <Text style={styles.priceTitle}>
                        € {get(appointmentDetails, 'total_cost', '')}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#DDDDDD',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                </View>
                <CustomModal
                  isVisible={showModal}
                  setIsVisible={() => (
                    setShowModal(false),
                    navigation.navigate('BottomTabNavigator'),
                    dispatch(clearAppointmentData())
                  )}>
                  <View style={styles.success}>
                    <Text style={styles.successTitle}>
                      {strings.congratulations}
                    </Text>
                    <Text style={styles.successDesc}>
                      {strings.appointmentSuccess}
                    </Text>
                  </View>
                </CustomModal>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  tabContainer: {
    flex: 1,
    width: '100%',
    // bottom: 0
  },
  salonCardImage: {
    position: 'relative',
    backgroundColor: colors.grey,
  },
  image: {
    width: '100%',
    zIndex: 0,
    height: height * 0.3,
  },
  topIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: '1.5rem',
    right: '1rem',
  },
  tabCardContainer: {
    // position: 'absolute',
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingVertical: '.8rem',
    paddingHorizontal: '1rem',
    width: '100%',
    marginTop: -30,
    // top: -30,
    // bottom: 0,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '1.5rem',
    color: colors.lightBlack,
  },
  salonDetails: {
    marginTop: '1rem',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  salonName: {},
  salonService: {
    marginLeft: '2.8rem',
  },
  title: {
    fontSize: '.8rem',
    color: colors.lightBlack,
    fontWeight: '400',
    marginBottom: '.3rem',
  },
  titleName: {
    fontSize: '1rem',
    color: colors.lightBlack,
    fontWeight: '600',
  },
  button: {
    marginTop: '1.2rem',
  },
  success: {
    alignItems: 'center',
    paddingTop: '6rem',
  },
  successTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: 15,
    color: colors.lightBlack,
  },
  successDesc: {
    fontSize: '.8rem',
    fontWeight: '600',
    marginBottom: 15,
    color: colors.lightBlack,
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '.5rem',
    marginHorizontal: '1rem',
  },
  priceTitle: {
    fontSize: '.9rem',
    fontWeight: '600',
    color: colors.lightBlack,
  },
  loader: {
    marginTop: height * 0.4,
  },
});
