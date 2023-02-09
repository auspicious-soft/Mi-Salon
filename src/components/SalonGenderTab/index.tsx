import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AuthenticationLayout from '../../layout/AuthenticationLayout';
import {title} from '../../enum/title.enum';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import FormField from '../../components/FormField';
import {useForm, Controller} from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AcceptTermsCondition from '../../components/AcceptTermsCondition';
import CustomButton from '../../components/CustomButton';
import {capitalize, get, map} from 'lodash';
import axios from 'axios';
import {authenticationUrls} from '../../utils/apiagent';
import {getMessageFromError} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {Tab, TabView} from '@rneui/themed';
import BookingCard from '../BookingCard';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  navigation: any;
  treatments: Array<any>;
}
const {width, height} = Dimensions.get('window');

const Index = (props: IProps) => {
  const {treatments} = props;
  const [index, setIndex] = React.useState(0);
  const selectedTreatment = useSelector(
    (state: any) => state.createAppointmentState.selectedTreatment,
  );

  return (
    <View style={styles.tabBoxMain}>
      <Tab
        value={index}
        onChange={setIndex}
        disableIndicator
        containerStyle={styles.tabStyle}
        variant="default"
        style={{}}>
        {map(treatments, (treatment, index) => {
          return (
            <Tab.Item
              key={index}
              title={capitalize(get(treatment, 'category', ''))}
              containerStyle={(active: boolean) =>
                active ? styles.tabActive : styles.tabInactive
              }
              titleStyle={(active: boolean) =>
                active ? styles.tabTitleActive : styles.tabTitleInactive
              }
              buttonStyle={{}}
            />
          );
        })}
      </Tab>
      <TabView value={index} onChange={setIndex}>
        {map(treatments, (treatment, mapIndex) => {
          return (
            <TabView.Item
              key={index}
              style={{
                width: '100%',
                flex: 1,
              }}>
              <>
                <FlatList
                  nestedScrollEnabled
                  style={{
                    marginVertical: 10,
                    display: index !== mapIndex ? 'none' : 'flex',
                  }}
                  data={get(treatment, 'treatments', [])}
                  renderItem={item => (
                    <View key={get(item, 'item.id')} style={styles.BoxMain}>
                      <BookingCard
                        data={item?.item}
                        isSelected={
                          get(selectedTreatment, 'id') ==
                          get(item, 'item.id', '')
                        }
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => get(item, 'item.id', index)}
                />
              </>
            </TabView.Item>
          );
        })}
      </TabView>
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  tabBoxMain: {
    paddingVertical: 18,
    marginBottom: 0,
    height: height * 0.4,
    // flex: 1,
  },
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
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    width: 59,
    paddingHorizontal: 0,
    // backgroundColor: '#59C5F3',
    height: 50,
    paddingVertical: 0,
  },
  tabHead: {
    marginBottom: 19,
  },
  BoxMain: {
    marginTop: 19,
    marginBottom: 0,
  },
  tabStyle: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 14,
    elevation: 4,
  },
  tabInactive: {},
  tabTitleActive: {
    fontWeight: '700',
    color: colors.white,
    fontSize: '.8rem',
  },
  tabTitleInactive: {
    color: colors.grey,
    fontWeight: '400',
    fontSize: '.7rem',
  },
});
