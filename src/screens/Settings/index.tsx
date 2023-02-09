import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';
import MiSalonPrimary from '../../components/Svgs/MiSalonPrimary';
import SettingOption from '../../components/SettingOption';
import Document from '../../components/Svgs/Document';
import Faq from '../../components/Svgs/Faq';
import DialCall from '../../components/Svgs/DialCall';
import Lock from '../../components/Svgs/Lock';
import Logout from '../../components/Svgs/Logout';
import CustomModal from '../../layout/CustomModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import OutlineButton from '../../components/OutlineButton';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {udpateIsUserLoggedIn} from '../../redux/user/user.action';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {authenticationUrls} from '../../utils/apiagent';
import Toast from 'react-native-toast-message';
import {
  changeLanguage,
  getCurrentSetLanguage,
  getDeviceLanguage,
  strings,
} from '../../utils/localeLanguage';
import {Dropdown} from 'react-native-element-dropdown';
import {LoginManager} from 'react-native-fbsdk-next';

const data = [
  {label: 'English', value: 'en'},
  {label: 'Spanish', value: 'es'},
];

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
}

const Index = (props: IProps) => {
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(() =>
    getCurrentSetLanguage() == 'es' ? data[1] : data[0],
  );

  const removeToken = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');

    await axios
      .get(authenticationUrls.logout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async res => {
        if (res.status === 200) {
          await AsyncStorage.removeItem('token');
          dispatch(udpateIsUserLoggedIn(false));
        }
      })
      .catch(async err => {
        Toast.show({
          type: 'error',
          text1: strings.somethingWentWrong,
          position: 'top',
        });
        await AsyncStorage.removeItem('token');
        dispatch(udpateIsUserLoggedIn(false));
      })
      .finally(() => {
        setLoading(false);
        LoginManager.logOut();
      });
  };

  const updateLanguage = async (language: any) => {
    setLanguage(language);
    changeLanguage(language.value);
    navigation.navigate('Home');
    await AsyncStorage.setItem('language', language.value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <ArrowLeft />
          </View>
        </Pressable>
        <View style={styles.logo}>
          <MiSalonPrimary color="#fff" width={width * 0.4} />
        </View>
        <View style={styles.content__container}>
          <View
            style={{
              flex: 1,
            }}>
            {/* <SettingOption
              icon={<Lock />}
              title={'Change Password'}
              separator={true}
              onPress={() => navigation.navigate('ChangePassword')}
            /> */}
            <SettingOption
              icon={<Faq />}
              title={strings.faq}
              separator={true}
              onPress={() => navigation.navigate('Faq')}
            />
            <SettingOption
              icon={<Document />}
              title={strings.termsCondition}
              separator={true}
              onPress={() => navigation.navigate('TermsConditions')}
            />
            {/* <SettingOption
            icon={<DialCall />}
            title={'Contact Us'}
            separator={false}
            onPress={() => navigation.navigate('ContactUs')}
          /> */}
            <View style={styles.languageDropdown}>
              <Text style={styles.languageDropdownText}>
                {strings.selectLanguage}
              </Text>

              <Dropdown
                data={data}
                placeholder={strings.selectLanguage}
                labelField={'label'}
                valueField={'value'}
                value={language.value}
                onChange={language => {
                  updateLanguage(language);
                }}
                selectedTextStyle={{
                  color: colors.lightBlack,
                }}
              />
            </View>
          </View>
          <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.logoutContent}>
              <Logout />
              <Text style={styles.logout}>{strings.logout}</Text>
            </View>
          </Pressable>
        </View>
        <CustomModal
          isVisible={modalVisible}
          setIsVisible={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{strings.logout}</Text>
            <Text style={styles.modalDesc}>{strings.logoutConfirmation}</Text>
            <View style={styles.btnGroup}>
              <OutlineButton
                text={strings.no}
                onPress={() => setModalVisible(false)}
                width="48%"
              />
              <CustomButton
                text={strings.yes}
                onPress={removeToken}
                width="48%"
                loading={loading}
              />
            </View>
          </View>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  safeArea: {flex: 1, paddingBottom: -50, backgroundColor: colors.primary},
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content__container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingVertical: '1.2rem',
    paddingHorizontal: '1rem',
  },
  backIcon: {
    // marginBottom: '1rem',
    padding: '1rem',
  },
  logo: {
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  logoutContent: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '.5rem',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    marginLeft: '.5rem',
    fontSize: '.9rem',
    fontWeight: '500',
    color: colors.lightBlack,
  },
  modalContainer: {
    height: 230,
    padding: '.5rem',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.lightBlack,
  },
  modalDesc: {
    textAlign: 'center',
    fontSize: '.9rem',
    fontWeight: '600',
    color: colors.lightBlack,
    marginVertical: '1.5rem',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  languageDropdown: {
    marginTop: '1rem',
    paddingHorizontal: '.8rem',
  },
});
