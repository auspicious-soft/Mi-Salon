import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MiSalonPrimary from '../../components/Svgs/MiSalonPrimary';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from '../../components/SearchBar';
import IconButton from '../../components/IconButton';
import FilterModal from '../../components/FilterModal';
import SalonCard from '../../components/SalonCard';
import Location from '../../components/Svgs/Location';
import Filter from '../../components/Svgs/Filter';
import Geolocation from '@react-native-community/geolocation';
import CustomModal from '../../layout/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  udpateIsUserLoggedIn,
  updateUserDetails,
  updateUserLocation,
} from '../../redux/user/user.action';
import {useDispatch, useSelector} from 'react-redux';
import {filterOptions} from '../../enum/filter.enum';
import axios from 'axios';
import {authenticationUrls, homeApiUrls} from '../../utils/apiagent';
import {get, map, size, sortBy} from 'lodash';
import Toast from 'react-native-toast-message';
import {colors} from '../../enum/colors.enum';
import NotFound from '../../components/NotFound';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {calculateDistance, concatNumber} from '../../utils/utils';
import {Platform, NativeModules} from 'react-native';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

const Index = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterOption, setFilterOption] = useState<Array<number>>([]);
  const dispatch = useDispatch();
  const [salonList, setSalonList] = useState<any>([]);
  const [searchSalon, setSearchSalon] = useState('');
  const [loading, setLoading] = useState(false);
  const [salonTypes, setSalonTypes] = useState([]);
  const selectedTab = useSelector((state: any) => state.uiState.selectedTab);
  const isFocused = useIsFocused();

  useEffect(() => {
    setSalonList([]);
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
          .get(homeApiUrls.salonListByQuery(searchSalon), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              // setSalonList(get(res, 'data.data', []));
              Geolocation.getCurrentPosition(
                info => {
                  dispatch(updateUserLocation(info));
                  let updatedList = map(
                    get(res, 'data.data', []),
                    (salon: any) => {
                      return {
                        ...salon,
                        distance: calculateDistance(
                          get(salon, 'latitude', 0),
                          get(salon, 'longitude', 0),
                          get(info, 'coords.latitude', 0),
                          get(info, 'coords.longitude', 0),
                        ),
                      };
                    },
                  );
                  updatedList = sortBy(updatedList, salon => {
                    return get(salon, 'distance', 0);
                  });
                  setSalonList(updatedList);
                },
                err => {
                  console.log('loc err', err);
                  setSalonList(get(res, 'data.data', []));
                },
              );

              // salon type 1 for hair salon and 2 for nail salon
              // res.data.type
            } else {
              Toast.show({
                type: 'error',
                text1: strings.noSalonFound,
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
  }, [searchSalon, isFocused]);

  useEffect(() => {
    const getSalonType = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios
          .get(homeApiUrls.salonType, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setSalonTypes(get(res, 'data.data', []));

              // salon type 1 for hair salon and 2 for nail salon
              // res.data.type
            } else {
              Toast.show({
                type: 'error',
                text1: strings.noSalonTypeFound,
                position: 'top',
              });
            }
          })
          .catch(err => {})
          .finally(() => {});
      } else {
        dispatch(udpateIsUserLoggedIn(false));
      }
      // setTimeout(() => {
      //   Geolocation.getCurrentPosition(
      //     info => dispatch(updateUserLocation(info)),
      //     err => console.log('err', err),
      //   );
      // }, 300);
    };

    getSalonType();
  }, []);

  const handleSearch = (value: string) => {
    setSearchSalon(value);
  };

  const handleFilterSearch = async () => {
    setModalVisible(false);

    setLoading(true);
    const token = await AsyncStorage.getItem('token');

    if (token) {
      axios
        .get(homeApiUrls.salonListByType(concatNumber(filterOption)), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setSalonList(get(res, 'data.data', []));

            // salon type 1 for hair salon and 2 for nail salon
            // res.data.type
          } else {
            Toast.show({
              type: 'error',
              text1: strings.noSalonFound,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar barStyle={'dark-content'} animated backgroundColor={'#fff'} />
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.logo}>
          <Pressable onPress={undefined}>
            <MiSalonPrimary />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <SearchBar onBlur={(value: string) => handleSearch(value)} />
            <View style={{marginHorizontal: 10}}>
              <IconButton
                onPress={() => {
                  Geolocation.getCurrentPosition(
                    info => dispatch(updateUserLocation(info)),
                    err => console.log('err', err),
                  );
                }}>
                <Location />
              </IconButton>
            </View>
            <IconButton onPress={() => setModalVisible(true)}>
              <Filter />
            </IconButton>
            <CustomModal
              isVisible={modalVisible}
              setIsVisible={() => setModalVisible(false)}>
              <FilterModal
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                handleSearch={() => handleFilterSearch()}
                salonTypes={salonTypes}
              />
            </CustomModal>
          </View>
          {loading ? (
            <ActivityIndicator
              style={{marginTop: 50}}
              size={'large'}
              color={colors.primary}
            />
          ) : size(salonList) > 0 ? (
            <View style={{flex: 1}}>
              <FlatList
                style={{marginVertical: 10}}
                data={salonList}
                renderItem={({item}) => (
                  <>
                    <Pressable
                      key={get(item, 'id')}
                      onPress={() =>
                        navigation.navigate('SalonProfile', {
                          id: get(item, 'salon_id', 0),
                        })
                      }>
                      <SalonCard data={item} />
                    </Pressable>
                  </>
                )}
                keyExtractor={(item, index) => get(item, 'id', index)}
              />
            </View>
          ) : (
            <View style={{marginTop: height * 0.3}}>
              <NotFound message={strings.noSalonFound} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  logo: {
    marginTop: '2rem',
    alignItems: 'center',
    marginBottom: '.8rem',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: '.5rem',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
