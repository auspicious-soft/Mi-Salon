import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {strings} from '../../utils/localeLanguage';

const Index = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles.text]}>{strings.pleaseAccept}</Text>
      <Text style={[styles.text, styles.linkText]}>
        {' '}
        {strings.termsCondition}
      </Text>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '.5rem',
  },
  text: {
    fontFamily: 'Mulish',
    fontSize: '.8rem',
    color: '#8A8A8A',
  },
  linkText: {
    color: colors.primary,
  },
});
