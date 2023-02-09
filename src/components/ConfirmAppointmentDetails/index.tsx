import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Circle from '../Svgs/Circle';
import CircleFill from '../Svgs/CircleFIll';
import StripeLine from '../Svgs/StripeLine';
import {get} from 'lodash';
import moment from 'moment';
import {strings} from '../../utils/localeLanguage';
import {convertTo12Hr} from '../../utils/utils';

interface IProps {
  selectedSalon: any;
  selectedTreatment: any;
  selectedDate: any;
  selectedTime: any;
}

const Index = (props: IProps) => {
  const {selectedTreatment, selectedDate, selectedTime, selectedSalon} = props;

  return (
    <View style={styles.container}>
      <View style={styles.timeDetails}>
        <Text style={styles.title}>{strings.dateTime}</Text>
        <View style={styles.destination}>
          <View style={styles.icons}>
            <Circle />
            <StripeLine />
            <CircleFill />
          </View>
          <View>
            <View>
              <Text style={styles.title}>
                {get(selectedTime, 'start_time', '')
                  ? convertTo12Hr(get(selectedTime, 'start_time', ''))
                  : ''}
              </Text>
              <Text style={styles.titleContent}>
                {selectedDate ? moment(selectedDate).format('MMM ddd DD,') : ''}
              </Text>
              <Text style={styles.titleContent}>
                {selectedDate ? moment(selectedDate).format('YYYY') : ''}
              </Text>
            </View>
            <View style={styles.endTime}>
              <Text style={styles.title}>
                {get(selectedTime, 'end_time', '')
                  ? convertTo12Hr(get(selectedTime, 'end_time', ''))
                  : ''}
              </Text>
              <Text style={styles.titleContent}>
                {selectedDate ? moment(selectedDate).format('MMM ddd DD,') : ''}
              </Text>
              <Text style={styles.titleContent}>
                {selectedDate ? moment(selectedDate).format('YYYY') : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.locationDetails}>
        <Text style={styles.title}>{strings.location}</Text>
        <View>
          <Text style={styles.titleContent}>
            {get(selectedSalon, 'address', '')} {get(selectedSalon, 'city', '')}{' '}
            {get(selectedSalon, 'zipcode', '')}
          </Text>
          <View style={styles.price}>
            <Text style={styles.title}>{strings.price}</Text>
            <Text style={styles.titleContent}>
              € {get(selectedTreatment, 'treatment_rate', '')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '1.2rem',
  },
  timeDetails: {
    width: '45%',
  },
  locationDetails: {
    width: '45%',
    marginLeft: '1.5rem',
  },
  title: {
    fontSize: '.8rem',
    color: '#343434',
    fontWeight: '400',
    marginBottom: '.4rem',
  },
  titleContent: {
    fontSize: '1rem',
    color: '#343434',
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  destination: {
    flexDirection: 'row',
  },
  icons: {
    alignItems: 'center',
    marginRight: '.5rem',
  },
  endTime: {
    marginTop: '.6rem',
  },
  price: {
    marginTop: '.6rem',
  },
});
