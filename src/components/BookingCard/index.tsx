import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {get} from 'lodash';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../enum/colors.enum';
import {useDispatch} from 'react-redux';
import {updateSelectedTreatment} from '../../redux/create_appointment/create_appointment.action';
import {strings} from '../../utils/localeLanguage';

const {width, height} = Dimensions.get('window');

interface IProps {
  data: any;
  isSelected?: boolean;
}

const Index = (props: IProps) => {
  const {data, isSelected} = props;
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.tabSalonBox}>
        <View>
          <Text style={styles.headingtab}>
            {get(data, 'treatment_name', '')}
          </Text>
          <Text style={styles.tabbudget}>
            € {get(data, 'treatment_rate', '')}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => dispatch(updateSelectedTreatment(data))}>
            <View
              style={[
                styles.salonBookedButton,
                isSelected ? styles.selectedButton : styles.unselectedButton,
              ]}>
              <Text
                style={[
                  styles.bookedText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}>
                {strings.book}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          borderBottomColor: '#DDDDDD',
          borderBottomWidth: 1,
        }}
      />
    </>
  );
};

export default Index;

const styles = EStyleSheet.create({
  tabSalonBox: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingtab: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#343434',
    marginBottom: 5,
  },
  tabbudget: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 17,
    color: '#343434',
  },
  salonBookedButton: {
    borderRadius: 25,
    height: 26,
    width: 59,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  bookedText: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  unselectedButton: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  unselectedText: {
    color: colors.primary,
  },
});
