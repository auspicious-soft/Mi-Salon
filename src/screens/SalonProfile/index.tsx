import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {title} from '../../enum/title.enum';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import FormField from '../../components/FormField';
import {useForm, Controller} from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AcceptTermsCondition from '../../components/AcceptTermsCondition';
import CustomButton from '../../components/CustomButton';
// import {get} from 'lodash';
import axios from 'axios';
import {authenticationUrls, homeApiUrls} from '../../utils/apiagent';
import {getMessageFromError, getRandomIndex} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import SalonGenderTab from '../../components/SalonGenderTab';
import Favourite from '../../components/Svgs/Favourite';
import StarFilled from '../../components/Svgs/StarFilled';
import Star from '../../components/Svgs/Star';
import Call from '../../components/Svgs/Call';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
} from '../../redux/user/user.action';
import {get, isEmpty, toNumber} from 'lodash';
import Toast from 'react-native-toast-message';
import NotFound from '../../components/NotFound';
import {updateSelectedSalon} from '../../redux/create_appointment/create_appointment.action';
import FavouriteFilled from '../../components/Svgs/FavouriteFilled';
import {strings} from '../../utils/localeLanguage';
import OutlineButton from '../../components/OutlineButton';

interface IProps {
  handleSearch: any;
  navigation: any;
  route: any;
}
const {width, height} = Dimensions.get('window');

const Index = (props: IProps) => {
  const {handleSearch, navigation, route} = props;
  const {id} = route.params;
  const userDetails = useSelector((state: any) => state.userState.user);
  const dispatch = useDispatch();
  const [salonDetails, setSalonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState<any>('');
  const selectedTreatment = useSelector(
    (state: any) => state.createAppointmentState.selectedTreatment,
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const getData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
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
            // dispatch(udpateIsUserLoggedIn(false));
          });

        axios
          .get(homeApiUrls.salonDetails(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setSalonDetails(get(res, 'data.data[0]', {}));
              dispatch(updateSelectedSalon(get(res, 'data.data[0]', {})));
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

  const addFavouriteSalon = async () => {
    if (userToken) {
      axios
        .post(
          homeApiUrls.addFavouriteSalon,
          {
            salon_id: get(salonDetails, 'salon_id', ''),
            user_id: get(userDetails, 'id', ''),
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
              text1:
                get(salonDetails, 'is_favourite', '') == 'true'
                  ? strings.salonRemovedFromFavourite
                  : strings.salonAddedToFavourite,
              position: 'top',
            });
            setSalonDetails({
              ...salonDetails,
              is_favourite:
                get(salonDetails, 'is_favourite', '') == 'true'
                  ? 'false'
                  : 'true',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: strings.somethingWentWrong,
              position: 'top',
            });
          }
        })
        .catch(err => {});
    } else {
      dispatch(udpateIsUserLoggedIn(false));
    }
  };

  const handleBookNow = () => {
    if (isEmpty(selectedTreatment)) {
      Toast.show({
        type: 'error',
        text1: strings.selectHaircut,
        position: 'top',
      });
    } else {
      navigation.navigate('SelectBarber', {
        salonId: get(salonDetails, 'salon_id', ''),
      });
    }
  };

  const addReview = () => {
    navigation.navigate('ReviewScreen', {
      salonId: get(salonDetails, 'salon_id', ''),
    });
  };

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
          ) : isEmpty(salonDetails) ? (
            <View style={styles.notFound}>
              <NotFound message={strings.salonDetailsNotFound} />
            </View>
          ) : (
            <>
              <View style={styles.salonCardImage}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{
                    uri: get(
                      salonDetails,
                      `image_url.${[
                        getRandomIndex(get(salonDetails, 'image_url')),
                      ]}`,
                      '',
                    ),
                  }}
                />
                <View style={styles.topIcon}>
                  <Pressable onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </Pressable>
                  <TouchableOpacity onPress={addFavouriteSalon}>
                    {get(salonDetails, 'is_favourite', '') == 'true' ? (
                      <FavouriteFilled />
                    ) : (
                      <Favourite />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tabCardContainer}>
                <View style={styles.tabBox}>
                  <Text style={styles.tabHeading}>
                    {get(salonDetails, 'salon_name', '')}
                  </Text>
                  <Text style={styles.tabSubHeading}>
                    {get(salonDetails, 'address', '') +
                      ' ' +
                      get(salonDetails, 'city', '') +
                      ' ' +
                      get(salonDetails, 'zipcode', '')}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <View>
                      <View style={styles.ratingReview}>
                        <View style={styles.ratingStar}>
                          {[
                            ...Array(toNumber(get(salonDetails, 'rating', 0))),
                          ].map((_, index) => (
                            <StarFilled key={index} />
                          ))}
                          {[
                            ...Array(
                              5 - toNumber(get(salonDetails, 'rating', 0)),
                            ),
                          ].map((_, index) => (
                            <Star key={index} />
                          ))}
                        </View>
                        <View style={styles.review}>
                          <Text style={styles.reviewCount}>
                            {get(salonDetails, 'review_count', 0)}{' '}
                            {strings.reviews}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.numberBox}>
                        <Call />
                        <Text style={styles.number}>
                          {get(salonDetails, 'phone', '')}
                        </Text>
                      </View>
                    </View>
                    <OutlineButton
                      // icon={buttonTitle === 'Repeat' ? <Repeat /> : ''}
                      text={strings.addReview}
                      onPress={() => addReview()}
                      containerStyle={styles.reviewButton}
                    />
                  </View>
                  <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionHeading}>
                      {strings.description}
                    </Text>
                    <Text style={styles.descriptionSubHeading}>
                      {get(salonDetails, 'description', '')}
                    </Text>
                  </View>
                  <SalonGenderTab
                    navigation={navigation}
                    treatments={get(salonDetails, 'treatments', [])}
                  />
                  <CustomButton
                    text={strings.bookNow}
                    onPress={handleBookNow}
                  />
                </View>
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
  tabHeading: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 33,
    color: '#282828',
  },
  tabSubHeading: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 18,
    color: '#525252',
    marginBottom: 4,
  },
  ratingReview: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 6,
  },
  ratingStar: {
    flexDirection: 'row',
    alignContent: 'center',
    marginRight: 11,
  },
  reviewCount: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#343434',
  },
  numberBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  number: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#343434',
    paddingLeft: 5,
  },
  descriptionBox: {
    marginTop: 15,
    // marginBottom: 42,
  },
  descriptionHeading: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#343434',
  },
  descriptionSubHeading: {
    marginTop: 3,
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 17,
    color: '#343434',
  },
  button: {
    paddingVertical: 18,
    ontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  loader: {
    marginTop: height * 0.4,
  },
  notFound: {
    marginTop: height * 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  reviewButton: {
    paddingVertical: '.4rem',
    paddingHorizontal: '.4rem',
  },
});
