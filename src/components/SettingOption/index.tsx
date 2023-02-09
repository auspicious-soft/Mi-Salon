import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import CaretRight from '../Svgs/CaretRight';
import {colors} from '../../enum/colors.enum';

interface IProps {
  icon: any;
  title: string;
  separator: boolean;
  onPress: any;
}

const Index = (props: IProps) => {
  const {icon, title, separator, onPress} = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.content}>
            {icon}
            <Text style={styles.title}>{title}</Text>
          </View>
          <CaretRight />
        </View>
        {separator ? <View style={styles.separator}></View> : <View></View>}
      </View>
    </Pressable>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {marginTop: '.8rem'},
  option: {
    paddingHorizontal: '.8rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: '.6rem',
    fontSize: '.9rem',
    fontWeight: '500',
    color: colors.lightBlack,
  },
  separator: {
    marginTop: '.8rem',
    height: 2,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
});
