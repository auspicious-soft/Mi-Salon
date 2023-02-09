import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import CaretRight from '../Svgs/CaretRight';
import {colors} from '../../enum/colors.enum';

interface IProps {
  title: string;
  desc: string;
  isCollapsed: boolean;
  onPress: any;
}

const Index = (props: IProps) => {
  const {title, desc, isCollapsed, onPress} = props;
  return (
    <Pressable onPress={() => onPress(title)}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{title}</Text>
          <CaretRight />
        </View>
        {!isCollapsed && (
          <View style={styles.descContainer}>
            <Text style={styles.desc}>{desc}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    marginBottom: '.8rem',
  },
  titleContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: '#E9E9E9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    paddingHorizontal: '1.4rem',
    zIndex: 100,
  },
  text: {
    fontSize: '.8rem',
    fontWeight: '700',
    color: '#1E1E1E',
  },
  desc: {
    fontSize: '.8rem',
    fontWeight: '700',
    color: '#525252',
  },
  descContainer: {
    padding: '1rem',
    paddingHorizontal: '1.4rem',

    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: '#E9E9E9',
    borderTopColor: 'transparent',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
});
