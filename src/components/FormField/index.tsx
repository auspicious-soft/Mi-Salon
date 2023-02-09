import {
  Image,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../enum/colors.enum';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: any;
  setValue: any;
  keyboardType?: KeyboardTypeOptions;
  formFieldStyle?: any;
  icon?: any;
  onPressIcon?: any;
  onBlur: any;
  error: string;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  inputHeight?: number;
  textAlignVertical?: 'top' | 'center' | 'bottom' | 'auto';
}

const Index = (props: IProps) => {
  const {
    label,
    placeholder,
    secureTextEntry,
    value,
    setValue,
    keyboardType,
    formFieldStyle,
    icon,
    onPressIcon,
    onBlur,
    error,
    editable,
    multiline,
    numberOfLines,
    inputHeight,
    textAlignVertical,
  } = props;
  return (
    <View style={[styles.form__container, formFieldStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity activeOpacity={1} onPress={onPressIcon}>
        <TextInput
          style={[
            styles.inputText,
            {
              height: inputHeight ? inputHeight : 50,
              textAlignVertical: textAlignVertical
                ? textAlignVertical
                : 'center',
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType ? keyboardType : 'default'}
          onBlur={onBlur}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </TouchableOpacity>
      {icon && (
        <Pressable style={styles.icon} onPress={onPressIcon}>
          {icon}
        </Pressable>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Index;

const styles = EStyleSheet.create({
  form__container: {
    paddingTop: '.8rem',
  },
  label: {
    fontSize: '.9rem',
    lineHeight: 20,
    fontFamily: 'Mulish',
    fontWeight: '500',
    color: '#343434',
    marginBottom: '.5rem',
  },
  inputText: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'Mulish',
    fontWeight: '400',
    lineHeight: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: '#E9E9E9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: '.5rem',
    paddingHorizontal: '.5rem',
  },
  icon: {
    position: 'absolute',
    right: '0.5rem',
    padding: 15,
    top: 48,
    zIndex: 100,
  },
  error: {
    color: 'red',
    paddingTop: '.2rem',
  },
});
