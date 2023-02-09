import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {ActivityIndicator} from 'react-native-paper';

interface IProps {
  icon?: ReactNode;
  text: string;
  onPress: any;
  loading?: boolean;
  indicatorColor?: string;
  containerStyle?: any;
  width?: string;
}

const Index = (props: IProps) => {
  const {text, onPress, loading, indicatorColor, icon, containerStyle, width} =
    props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: '#000',
        //   opacity: 1,
        borderRadius: 8,
        width: width,
      }}>
      <View style={[styles.button, containerStyle]}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={indicatorColor ? indicatorColor : 'white'}
          />
        ) : (
          <View style={styles.container}>
            {icon}
            <Text style={styles.text}>{text}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Index;

const styles = EStyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
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
  container: {
    flexDirection: 'row',
  },
  text: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: '.8rem',
    lineHeight: 20,
  },
});
