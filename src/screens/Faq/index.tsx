import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../enum/colors.enum';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import FaqItem from '../../components/FaqItem';
import faqData from './faqData.json';
import {map} from 'lodash';

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [selectedFaq, setSelectedFaq] = useState<any>(null);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </Pressable>
        <Text style={styles.title}>FAQ</Text>
        <View style={styles.scrollView}>
          <ScrollView>
            {map(faqData, (item, index) => (
              <FaqItem
                key={index}
                title={item?.title}
                desc={item?.desc}
                isCollapsed={selectedFaq !== index}
                onPress={() => setSelectedFaq(index)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    margin: '1rem',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.lightBlack,
    marginVertical: '1rem',
  },
  scrollView: {
    paddingBottom: '5rem',
  },
});
