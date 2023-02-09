import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {Tab, TabView} from '@rneui/themed';
import AppointmentCard from '../../components/AppointmentCard';
import CustomModal from '../../layout/CustomModal';
import OutlineButton from '../../components/OutlineButton';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {authenticationUrls, myAppointmentApiUrls} from '../../utils/apiagent';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import {get, size, toNumber} from 'lodash';
import {appointmentQuery} from '../../enum/appointmentQuery.enum';
import Toast from 'react-native-toast-message';
import NotFound from '../../components/NotFound';
import {useIsFocused} from '@react-navigation/native';
import {strings} from '../../utils/localeLanguage';
const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [index, setIndex] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.userState.user);
  const [appointmentQueryValue, setAppointmentQueryValue] = useState(
    appointmentQuery.UPCOMING,
  );
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [canceAppointmentID, setCanceAppointmentID] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
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
              appointmentQueryValue,
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
  }, [appointmentQueryValue, isFocused]);

  const handleChange = (e: number) => {
    setIndex(e);
    if (toNumber(e) === 0) {
      setAppointmentQueryValue(appointmentQuery.UPCOMING);
    } else if (toNumber(e) === 1) {
      setAppointmentQueryValue(appointmentQuery.PREVIOUS);
    } else if (toNumber(e) === 2) {
      setAppointmentQueryValue(appointmentQuery.TODAY);
    }
  };

  const handleCancelAppointment = async () => {
    setCancelLoading(true);
    const token = await AsyncStorage.getItem('token');

    if (token) {
      axios
        .post(
          myAppointmentApiUrls.cancelAppointment(toNumber(canceAppointmentID)),
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          if (res.status === 200) {
            Toast.show({
              type: 'success',
              text1: strings.appointmentCanceledSuccess,
              position: 'top',
            });
            setAppointmentList(
              appointmentList.filter(
                (appointment: any) => appointment.id !== canceAppointmentID,
              ),
            );
            setShowModal(false);
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
          setCancelLoading(false);
        });
    } else {
      dispatch(udpateIsUserLoggedIn(false));
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>{strings.myAppointments}</Text>
        <View style={styles.tabBoxMain}>
          <Tab
            value={index}
            onChange={e => handleChange(e)}
            disableIndicator
            containerStyle={styles.tabStyle}
            variant="default"
            style={{}}>
            <Tab.Item
              title={strings.upcoming}
              containerStyle={(active: boolean) =>
                active ? styles.tabActive : styles.tabInactive
              }
              titleStyle={(active: boolean) =>
                active ? styles.tabTitleActive : styles.tabTitleInactive
              }
              onPress={() =>
                setAppointmentQueryValue(appointmentQuery.UPCOMING)
              }
            />
            <Tab.Item
              title={strings.previous}
              containerStyle={(active: boolean) =>
                active ? styles.tabActive : styles.tabInactive
              }
              titleStyle={(active: boolean) =>
                active ? styles.tabTitleActive : styles.tabTitleInactive
              }
              onPress={() =>
                setAppointmentQueryValue(appointmentQuery.PREVIOUS)
              }
            />
            <Tab.Item
              title={strings.today}
              containerStyle={(active: boolean) =>
                active ? styles.tabActive : styles.tabInactive
              }
              titleStyle={(active: boolean) =>
                active ? styles.tabTitleActive : styles.tabTitleInactive
              }
              buttonStyle={{}}
              onPress={() => setAppointmentQueryValue(appointmentQuery.TODAY)}
            />
          </Tab>
          {loading ? (
            <ActivityIndicator
              style={{marginTop: 50}}
              size={'large'}
              color={colors.primary}
            />
          ) : size(appointmentList) > 0 ? (
            <TabView value={index} onChange={e => handleChange(e)}>
              <TabView.Item
                style={{
                  width: '100%',
                  flex: 1,
                  display: index == 0 ? 'flex' : 'none',
                }}>
                <>
                  <FlatList
                    nestedScrollEnabled
                    style={{
                      marginVertical: 10,
                    }}
                    data={appointmentList}
                    renderItem={item => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('ConfirmAppointmentWithPrice', {
                            appointmentId: get(item, 'item.id', ''),
                          })
                        }>
                        <AppointmentCard
                          showButton={true}
                          data={get(item, 'item', {})}
                          onPress={() => (
                            setShowModal(true),
                            setCanceAppointmentID(get(item, 'item.id', 0))
                          )}
                          buttonTitle={strings.cancel}
                        />
                      </Pressable>
                    )}
                    keyExtractor={(item, index) => get(item, 'item.id', index)}
                  />
                </>
              </TabView.Item>
              <TabView.Item
                style={{
                  width: '100%',
                  flex: 1,
                  display: index == 1 ? 'flex' : 'none',
                }}>
                <FlatList
                  nestedScrollEnabled
                  style={{
                    marginVertical: 10,
                  }}
                  data={appointmentList}
                  renderItem={item => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ConfirmAppointmentWithPrice', {
                          appointmentId: get(item, 'item.id', ''),
                        })
                      }>
                      <AppointmentCard
                        showButton={false}
                        data={get(item, 'item', {})}
                        onPress={() => {}}
                        buttonTitle={strings.review}
                      />
                    </Pressable>
                  )}
                  keyExtractor={(item, index) => get(item, 'item.id', index)}
                />
              </TabView.Item>
              <TabView.Item
                style={{
                  width: '100%',
                  flex: 1,
                  display: index == 2 ? 'flex' : 'none',
                }}>
                <FlatList
                  nestedScrollEnabled
                  style={{
                    marginVertical: 10,
                  }}
                  data={appointmentList}
                  renderItem={item => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ConfirmAppointmentWithPrice', {
                          appointmentId: get(item, 'item.id', ''),
                        })
                      }>
                      <AppointmentCard
                        showButton={true}
                        data={get(item, 'item', {})}
                        onPress={() => (
                          setShowModal(true),
                          setCanceAppointmentID(get(item, 'item.id', 0))
                        )}
                        buttonTitle={strings.cancel}
                      />
                    </Pressable>
                  )}
                  keyExtractor={(item, index) => get(item, 'item.id', index)}
                />
              </TabView.Item>
            </TabView>
          ) : (
            <View style={styles.notFound}>
              <NotFound message={strings.noAppointmentFound} />
            </View>
          )}
        </View>
        <CustomModal
          isVisible={showModal}
          setIsVisible={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{strings.cancelBooking}</Text>
            <Text style={styles.modalDesc}>{strings.confirmCancelBooking}</Text>
            <View style={styles.btnGroup}>
              <OutlineButton
                text={strings.no}
                onPress={() => setShowModal(false)}
                width="48%"
              />
              <CustomButton
                text={strings.yes}
                onPress={handleCancelAppointment}
                width="48%"
                loading={cancelLoading}
              />
            </View>
          </View>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? '1.5rem' : 0,
    flex: 1,
    padding: '1rem',
  },
  heading: {
    fontFamily: 'Mulish',
    fontSize: '1.5rem',
    color: colors.lightBlack,
    fontWeight: '800',
  },
  tabBoxMain: {
    marginTop: '1rem',
    // height: height * 0.78,
    flex: 1,
  },
  tabStyle: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 14,
    elevation: 4,
  },
  tabInactive: {},
  tabTitleActive: {
    fontWeight: '700',
    color: colors.white,
    fontSize: '.6rem',
  },
  tabTitleInactive: {
    color: colors.grey,
    fontWeight: '400',
    fontSize: '.6rem',
  },
  modalContainer: {
    height: 230,
    padding: '.5rem',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.lightBlack,
  },
  modalDesc: {
    textAlign: 'center',
    fontSize: '.9rem',
    fontWeight: '600',
    color: colors.lightBlack,
    marginVertical: '1.5rem',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  customButton: {
    paddingVertical: '1.1rem',
  },
  notFound: {
    marginTop: height * 0.3,
  },
});
