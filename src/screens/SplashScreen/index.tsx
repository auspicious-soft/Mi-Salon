import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';

const Index = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo/splash_icon.png')}
      />
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '12rem',
    height: '8.1rem',
  },
});
