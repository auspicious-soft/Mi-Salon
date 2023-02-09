import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import {useDispatch, useSelector} from 'react-redux';
import {updateSelectedTime} from '../../redux/create_appointment/create_appointment.action';
import {add30MinutesToTime, convertTo12Hr} from '../../utils/utils';
import {get} from 'lodash';
import moment from 'moment';

interface IProps {
  isSelected: boolean;
  data: any;
}

const Index = (props: IProps) => {
  const {isSelected, data} = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const selectedDate = useSelector(
    (state: any) => state.createAppointmentState.selectedDate,
  );

  useEffect(() => {
    // let result =
    //   selectedDate == moment().format('YYYY-MM-DD') &&
    //   moment(data.start_time, 'HH:mm:ss').isBefore(moment().format('HH:mm:ss'));
    // console.log('result1', result);

    let result =
      (moment(selectedDate).isSame(moment(), 'day') || !selectedDate) &&
      moment(data.start_time, 'HH:mm:ss').isSameOrBefore(moment());

    setIsDisabled(result);
    // console.log('isdisabled', isDisabled);
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        get(data, 'is_booked', '') || isDisabled
          ? undefined
          : dispatch(
              updateSelectedTime({
                start_time: get(data, 'start_time'),
                end_time: get(data, 'end_time'),
              }),
            )
      }
      style={[
        styles.timeBox,
        isDisabled || get(data, 'is_booked')
          ? {backgroundColor: colors.lightGray}
          : {},
        isSelected ? styles.selectedContainer : {},
      ]}>
      <Text
        style={[
          styles.time,
          isDisabled || get(data, 'is_booked')
            ? {color: colors.lightBlack}
            : {},
          isSelected ? styles.selectedText : {},
        ]}>
        {convertTo12Hr(get(data, 'start_time'))}
      </Text>
    </TouchableOpacity>
  );
};

export default Index;

const styles = EStyleSheet.create({
  timeBox: {
    borderColor: '#E9E9E9',
    borderWidth: 1,
    paddingVertical: '.8rem',
    marginBottom: '.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOpacity: 0.01,
    // shadowOffset: {width: 0, height: 4},
    // shadowRadius: 4,
    // elevation: 4,
    width: '31%',
  },
  time: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: colors.lightBlack,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.white,
  },
});
