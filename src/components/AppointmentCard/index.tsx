import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Circle from '../Svgs/Circle';
import CircleFill from '../Svgs/CircleFIll';
import StripeLine from '../Svgs/StripeLine';
import {colors} from '../../enum/colors.enum';
import OutlineButton from '../OutlineButton';
import {get} from 'lodash';
import Repeat from '../Svgs/Repeat';

interface IProps {
  onPress: () => void;
  data: any;
  buttonTitle: string;
  showButton: boolean;
}

const Index = (props: IProps) => {
  const {onPress, data, buttonTitle, showButton} = props;

  return (
    <View style={styles.container}>
      <View style={styles.timeDetails}>
        <View style={styles.destination}>
          <View>
            <View style={styles.startTime}>
              <Text style={styles.title}>{get(data, 'start_time', '')}</Text>
              <Text style={styles.titleContent}>
                {get(data, 'formatted_date', '')}
              </Text>
            </View>
            <View style={styles.endTime}>
              <Text style={styles.title}>{get(data, 'end_time', '')}</Text>
              <Text style={styles.titleContent}>
                {get(data, 'formatted_date', '')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.icons}>
        <Circle />
        <StripeLine />
        <CircleFill />
      </View>
      <View style={styles.locationDetails}>
        <Text style={styles.name}>{get(data, 'salon_name', '')}</Text>
        <Text style={styles.serviceName}>{get(data, 'service_name', '')}</Text>
        <Text style={styles.content}>
          You have a new booking request for {get(data, 'service_name', '')}
        </Text>
        <View>
          <Text style={styles.price}>€ {get(data, 'total_cost', '')}</Text>
        </View>
        {showButton && (
          <View style={styles.buttonContainer}>
            <OutlineButton
              // icon={buttonTitle === 'Repeat' ? <Repeat /> : ''}
              text={buttonTitle}
              onPress={() => onPress()}
              containerStyle={styles.button}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '1.2rem',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: '#E9E9E9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
    padding: '.8rem',
    alignItems: 'center',
  },
  timeDetails: {
    width: '35%',
  },
  locationDetails: {
    width: '55%',
    marginLeft: '1rem',
  },
  name: {
    color: colors.lightBlack,
    fontSize: '1rem',
    fontWeight: '700',
  },
  serviceName: {
    marginVertical: '.2rem',
    color: colors.lightBlack,
    fontSize: '.8rem',
    fontWeight: '700',
  },
  destination: {
    flexDirection: 'row',
  },
  icons: {
    alignItems: 'center',
    marginLeft: '.5rem',
    // marginTop: '1.8rem',
  },
  endTime: {
    marginTop: '.6rem',
  },
  price: {
    marginTop: '.8rem',
    fontSize: '.8rem',
    fontWeight: '700',
    color: colors.lightBlack,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginTop: '.2rem',
    marginRight: '.5rem',
    width: '45%',
  },
  button: {
    paddingVertical: '.4rem',
    // paddingHorizontal: '.rem',
  },
  content: {
    fontSize: '.75rem',
  },
  title: {
    fontSize: '.8rem',
    color: '#343434',
    fontWeight: '400',
    marginBottom: '.1rem',
  },
  titleContent: {
    fontSize: '1rem',
    color: '#343434',
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  startTime: {
    marginBottom: '.6rem',
  },
});
