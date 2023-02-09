import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../../enum/colors.enum';

const Index = () => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Circle cx="19" cy="19" r="19" fill="#FFF" />
      <Path
        d="M14 10C11.239 10 9 12.216 9 14.95C9 17.157 9.875 22.395 18.488 27.69C18.6423 27.7839 18.8194 27.8335 19 27.8335C19.1806 27.8335 19.3577 27.7839 19.512 27.69C28.125 22.395 29 17.157 29 14.95C29 12.216 26.761 10 24 10C21.239 10 19 13 19 13C19 13 16.761 10 14 10Z"
        // stroke="#A3A3A3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill={colors.primary}
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
