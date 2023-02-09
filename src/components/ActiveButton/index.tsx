import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IProps {
  text: string;
  isActive: boolean;
  onPress: any;
  style?: any;
}

const Index = (props: IProps) => {
  const {text, isActive, onPress, style} = props;
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.button,
          style,
          {backgroundColor: isActive ? colors.primary : '#fff'},
        ]}>
        <Text
          style={[styles.text, {color: isActive ? '#fff' : colors.primary}]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Index;

const styles = EStyleSheet.create({
  button: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontWeight: '700',
    fontSize: '.8rem',
    lineHeight: 20,
  },
});
