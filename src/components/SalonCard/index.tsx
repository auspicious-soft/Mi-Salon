import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import StarFilled from '../Svgs/StarFilled';
import Star from '../Svgs/Star';
import LinearGradient from 'react-native-linear-gradient';
import {get, size, toNumber} from 'lodash';
import FavouriteFilled from '../Svgs/FavouriteFilled';
import {calculateDistance, getRandomIndex} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  data: any;
  showFavIcon?: boolean;
}

const Index = (props: IProps) => {
  const {data, showFavIcon} = props;
  const location = useSelector((state: any) => state.userState.location);

  useEffect(() => {}, []);

  return (
    <View>
      <View style={styles.cardContainer}>
        {showFavIcon && (
          <View style={styles.fav}>
            <FavouriteFilled />
          </View>
        )}
        <View style={styles.cardContent}>
          <LinearGradient
            locations={[0, 0.7]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={styles.linearGradient}>
            <Text style={styles.name}>{get(data, 'salon_name', '')}</Text>
            <Text style={styles.address}>{get(data, 'address', '')}</Text>
            <View style={styles.details}>
              <View style={styles.reviews}>
                <View style={styles.star}>
                  {[...Array(toNumber(get(data, 'rating', 0)))].map(
                    (_, index) => (
                      <StarFilled key={index} />
                    ),
                  )}
                  {[...Array(5 - toNumber(get(data, 'rating', 0)))].map(
                    (_, index) => (
                      <Star key={index} />
                    ),
                  )}
                </View>
                <Text style={styles.address}>
                  {get(data, 'review_count', 0)} {strings.reviews}
                </Text>
              </View>
              <Text style={styles.address}>
                {get(data, 'distance', 0)} {strings.km}
              </Text>
            </View>
          </LinearGradient>
        </View>
        {get(
          data,
          `image_url.${[getRandomIndex(get(data, 'image_url'))]}`,
          false,
        ) && (
          <Image
            style={styles.image}
            source={{
              uri: get(
                data,
                `image_url.${[getRandomIndex(get(data, 'image_url'))]}`,
                '',
              ),
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  cardContainer: {
    marginTop: '1rem',
    width: '100%',
    height: 210,
    borderRadius: 8,
    backgroundColor: '#C4C4C4',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    flex: 1,
    // height: 100,
  },
  cardContent: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  name: {
    color: '#fff',
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '1.2rem',
  },
  address: {
    color: '#fff',
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: '.7rem',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  reviews: {
    flexDirection: 'row',
  },
  star: {
    width: '45%',
    marginRight: '.2rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linearGradient: {
    paddingHorizontal: '1rem',
    paddingVertical: '.5rem',
    // opacity: 0.2,
    // padding: -50,
  },
  fav: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 3,
  },
});
