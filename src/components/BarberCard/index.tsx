import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {get} from 'lodash';
import {colors} from '../../enum/colors.enum';
import CircleFillCheck from '../Svgs/CircleFillCheck';

interface IProps {
  data: any;
  isSelected: boolean;
}

const Index = (props: IProps) => {
  const {data, isSelected} = props;
  return (
    <View style={styles.cardMain}>
      <View style={[styles.cardImage, isSelected ? styles.imageBorder : {}]}>
        {get(data, 'image_url') && (
          <Image
            style={[styles.image]}
            source={{uri: get(data, 'image_url')}}
          />
        )}
        {isSelected && (
          <View style={styles.selected}>
            <CircleFillCheck />
          </View>
        )}
      </View>
      <Text style={styles.barberName}>{get(data, 'first_name', '')}</Text>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  cardMain: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 13,
    justifyContent: 'space-between',
  },
  cardImage: {
    position: 'relative',
    marginRight: 9,
    width: 76,
    height: 76,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  barberName: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#282828',
    flex: 1,
    flexWrap: 'wrap',
  },
  barberChecked: {
    width: 16,
    height: 16,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 0,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // width: 76,
    // height: 76,
    flex: 1,
    borderRadius: 8,
  },
  selected: {
    position: 'absolute',
    top: -0.5,
    right: -0.5,
  },
  imageBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
