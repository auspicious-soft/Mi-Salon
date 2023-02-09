import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Children} from 'react';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import Setting from '../../components/Svgs/Setting';

const {width, height} = Dimensions.get('window');

interface IProps {
  heading: String;
  description: String;
  icon?: boolean;
  children: any;
  onIconPress?: any;
  headerStyle?: any;
  onIconPressRight?: any;
}

const Index = (props: IProps) => {
  const {
    heading,
    description,
    icon,
    children,
    onIconPress,
    headerStyle,
    onIconPressRight,
  } = props;
  return (
    // <SafeAreaView style={{flex: 1}}>
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardDismissMode="on-drag">
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={[styles.header, headerStyle]}>
          <Pressable onPress={onIconPress}>
            <View style={styles.backIcon}>{icon && <ArrowLeft />}</View>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>{heading}</Text>
            </View>
            {onIconPressRight ? (
              <Pressable onPress={onIconPressRight}>
                <Setting />
              </Pressable>
            ) : (
              <View />
            )}
          </View>
          {description ? (
            <View>
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.content__container}>{children}</View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 0.3,
    height: height * 0.2,
    justifyContent: 'center',
    padding: '1.3rem',
  },
  title: {
    color: colors.white,
    fontSize: '1.5rem',
    fontFamily: 'Mulish',
    fontWeight: '800',
    lineHeight: 37.6,
  },
  description: {
    color: colors.white,
    fontSize: '.8rem',
    fontFamily: 'Mulish',
    fontWeight: '400',
    lineHeight: 20,
    paddingTop: '.5rem',
  },
  content__container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingVertical: '1rem',
    paddingHorizontal: '1rem',
  },
  backIcon: {
    marginBottom: '1rem',
  },
});
