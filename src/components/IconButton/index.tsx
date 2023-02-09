import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  children: any;
  onPress: () => void;
}

const Index = (props: IProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        {backgroundColor: pressed ? '#E9E9E9' : '#fff'},
      ]}
      onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    padding: '.9rem',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
