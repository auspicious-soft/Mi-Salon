import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  LogBox,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {getFavouriteSalons} from '../../utils/apiagent';
import {useDispatch, useSelector} from 'react-redux';
import {first, get, size} from 'lodash';
import Toast from 'react-native-toast-message';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import SalonCard from '../../components/SalonCard';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from '../../components/NotFound';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  const userDetails = useSelector((state: any) => state.userState.user);
  const [favouriteSalons, setFavouriteSalons] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const getData = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setLoading(true);

        axios
          .get(getFavouriteSalons(get(userDetails, 'id', '')), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setFavouriteSalons(get(res, 'data.data', []));
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
          .catch(err => {
            console.log('favourite salons error', err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        dispatch(udpateIsUserLoggedIn(false));
      }
    };
    getData();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </Pressable>
          <Text style={styles.heading}>{strings.favourites}</Text>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator
                style={{marginTop: 50}}
                size={'large'}
                color={colors.primary}
              />
            </View>
          ) : size(favouriteSalons) > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              style={{marginVertical: 10}}
              data={favouriteSalons}
              renderItem={({item}: any) => (
                <>
                  <Pressable
                    key={get(item, 'id')}
                    onPress={() =>
                      navigation.navigate('SalonProfile', {
                        id: get(item, 'salon_id', 0),
                      })
                    }>
                    <SalonCard
                      data={{
                        review_count: get(item, 'salon_detail.review_count', 0),
                        rating: get(item, 'salon_detail.rating', 0),
                        image_url: get(item, 'salon_detail.image_url', []),
                        ...first(get(item, 'salon_detail.detail', [])),
                      }}
                      showFavIcon={true}
                    />
                  </Pressable>
                </>
              )}
              keyExtractor={(item, index) => get(item, 'id', '')}
            />
          ) : (
            <View style={{marginTop: height * 0.3}}>
              <NotFound message={strings.noFavouriteSalon} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    padding: '1rem',
  },
  heading: {
    marginTop: '.8rem',
    fontFamily: 'Mulish',
    fontSize: '1.5rem',
    color: colors.lightBlack,
    fontWeight: '800',
  },
  loader: {
    marginTop: height * 0.3,
  },
});
