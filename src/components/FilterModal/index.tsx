import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from '../../components/CustomButton';
import ActiveButton from '../../components/ActiveButton';
import {filterOptions} from '../../enum/filter.enum';
import {get, includes, map} from 'lodash';
import {strings} from '../../utils/localeLanguage';

interface IProps {
  filterOption: Array<number>;
  setFilterOption: any;
  handleSearch: any;
  salonTypes: Array<any>;
}

const Index = (props: IProps) => {
  const {filterOption, setFilterOption, handleSearch, salonTypes} = props;
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Filter</Text>
      <View style={styles.buttonContainer}>
        {map(salonTypes, (salonType: any) => {
          return (
            <ActiveButton
              key={get(salonType, 'id')}
              text={get(salonType, 'title', '')}
              isActive={includes(filterOption, get(salonType, 'id', ''))}
              onPress={() => {
                if (!includes(filterOption, get(salonType, 'id', ''))) {
                  return setFilterOption([
                    ...filterOption,
                    get(salonType, 'id', ''),
                  ]);
                } else {
                  return setFilterOption(
                    filterOption.filter(
                      (id: any) => id !== get(salonType, 'id', ''),
                    ),
                  );
                }
              }}
              style={styles.buttons}
            />
          );
        })}
      </View>
      {/* <View style={styles.center}>
        <ActiveButton
          text={'Nail Salon'}
          isActive={includes(filterOption, filterOptions.NAIL_SALON)}
          onPress={() => setFilterOption(filterOptions.NAIL_SALON)}
          style={{paddingHorizontal: 27}}
        />
      </View> */}
      <CustomButton text={strings.search} onPress={() => handleSearch()} />
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  modalContainer: {
    height: 300,
    padding: '.1rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '800',
    fontFamily: 'Mulish',
    color: '#343434',
    lineHeight: 37,
    fontStyle: 'normal',
    marginBottom: '.5rem',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: '1rem',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  buttons: {
    paddingHorizontal: 27,
    marginHorizontal: 2,
    marginVertical: 8,
  },
});
