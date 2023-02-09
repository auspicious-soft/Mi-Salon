import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';

interface IProps {
  message: string;
}

const Index = (props: IProps) => {
  const {message} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: '1rem',
    color: colors.grey,
    fontWeight: '500',
  },
});
