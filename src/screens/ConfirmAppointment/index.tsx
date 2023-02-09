import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import ConfirmAppointmentDetails from '../../components/ConfirmAppointmentDetails';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../layout/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {homeApiUrls} from '../../utils/apiagent';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import moment from 'moment';
import {clearAppointmentData} from '../../redux/create_appointment/create_appointment.action';
import {getRandomIndex} from '../../utils/utils';
import SuccessCheck from '../../components/Svgs/SuccessCheck';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const selectedSalon = useSelector(
    (state: any) => state.createAppointmentState.selectedSalon,
  );
  const selectedTreatment = useSelector(
    (state: any) => state.createAppointmentState.selectedTreatment,
  );
  const selectedBarber = useSelector(
    (state: any) => state.createAppointmentState.selectedBarber,
  );
  const selectedDate = useSelector(
    (state: any) => state.createAppointmentState.selectedDate,
  );
  const selectedTime = useSelector(
    (state: any) => state.createAppointmentState.selectedTime,
  );
  const userDetails = useSelector((state: any) => state.userState.user);
  const [customerNote, setCustomerNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookNow = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      setLoading(true);
      const data = {
        date: moment(selectedDate).format('YYYY-MM-DD'),
        salon_id: get(selectedSalon, 'salon_id', ''),
        customer_id: get(userDetails, 'id', ''),
        staff_id: get(selectedBarber, 'id', ''),
        start_time: get(selectedTime, 'start_time', ''),
        end_time: get(selectedTime, 'end_time', ''),
        services_taken: get(selectedTreatment, 'id', ''),
        total_cost: get(selectedTreatment, 'treatment_rate', ''),
        email: get(userDetails, 'email', ''),
        phone: get(userDetails, 'phone', ''),
        customer_note: customerNote,
      };

      axios
        .post(homeApiUrls.createAppointment, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setShowModal(true);

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

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.tabContainer}>
          <View style={styles.salonCardImage}>
            <Image
              style={styles.image}
              source={{
                uri: get(
                  selectedSalon,
                  `image_url.${[
                    getRandomIndex(get(selectedSalon, 'image_url')),
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
              {get(selectedSalon, 'salon_name', '')}
            </Text>
            <View style={styles.salonDetails}>
              <View style={styles.salonName}>
                <Text style={styles.title}>{strings.salonName}</Text>
                <Text style={styles.titleName}>
                  {get(selectedSalon, 'salon_name', '')}
                </Text>
              </View>
              <View style={styles.salonService}>
                <Text style={styles.title}>{strings.serviceName}</Text>
                <Text style={styles.titleName}>
                  {get(selectedTreatment, 'treatment_name', '')}
                </Text>
              </View>
            </View>
            <ConfirmAppointmentDetails
              selectedTreatment={selectedTreatment}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedSalon={selectedSalon}
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
              <CustomButton
                text={strings.bookNow}
                onPress={handleBookNow}
                loading={loading}
              />
            </View>
            <CustomModal
              isVisible={showModal}
              setIsVisible={() => (
                setShowModal(false),
                navigation.navigate('BottomTabNavigator'),
                dispatch(clearAppointmentData())
              )}>
              <View style={styles.success}>
                <SuccessCheck />
                <Text style={styles.successTitle}>
                  {strings.congratulations}
                </Text>
                <Text style={styles.successDesc}>
                  {strings.appointmentSuccess}
                </Text>
              </View>
            </CustomModal>
          </View>
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
    paddingTop: '1rem',
  },
  successTitle: {
    marginTop: '1rem',
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
});
