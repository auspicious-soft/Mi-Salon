import LocalizedStrings from 'react-native-localization';
import english from '../languages/en';
import spanish from '../languages/es';

export const strings = new LocalizedStrings({
  en: english,
  es: spanish,
});

export const setInterfaceLanguage = () => strings.getInterfaceLanguage();

export const getDeviceLanguage = () => strings.getInterfaceLanguage();
export const getCurrentSetLanguage = () => strings.getLanguage();
export const changeLanguage = (languageCode: string) => {
  strings.setLanguage(languageCode);
};

// Spanish
// es-Es
// es-MX
