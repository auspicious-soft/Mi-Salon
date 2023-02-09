import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {ActivityIndicator} from 'react-native-paper';

interface IProps {
  text: string;
  onPress: any;
  loading?: boolean;
  indicatorColor?: string;
  style?: any;
  width?: string;
  buttonStyle?: any;
}

const Index = (props: IProps) => {
  const {text, onPress, loading, indicatorColor, style, width, buttonStyle} =
    props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: '#000',
          //   opacity: 1,
          borderRadius: 8,
        },
        style,
        {width: width},
      ]}>
      <View style={[styles.button, buttonStyle]}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={indicatorColor ? indicatorColor : 'white'}
          />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Index;

const styles = EStyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: '.8rem',
    lineHeight: 20,
  },
});
