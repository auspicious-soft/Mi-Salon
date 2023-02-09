import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Search from '../Svgs/Search';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  // value: string;
  // setValue: any;
  onBlur: any;
  width?: string;
}

const Index = (props: IProps) => {
  const {onBlur, width} = props;
  const [search, setSearch] = useState('');
  return (
    <View style={[styles.container, {width: width}]}>
      <Search size={25} />
      <TextInput
        placeholder={strings.searchCityOrName}
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        onBlur={() => onBlur(search)}
      />
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: '.2rem',
    paddingHorizontal: '1rem',
    flex: 1,
  },
  input: {
    // width: '100%',
    fontSize: 14,
    fontFamily: 'Mulish',
    fontWeight: '400',
    lineHeight: 18,
    paddingVertical: '.5rem',
    paddingHorizontal: '.5rem',
  },
});
