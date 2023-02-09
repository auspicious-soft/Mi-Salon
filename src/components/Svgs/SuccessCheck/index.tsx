import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="94" height="94" viewBox="0 0 94 94" fill="none">
      <Circle
        cx="47"
        cy="47"
        r="44.5"
        fill="#59C5F3"
        stroke="#3AB1E3"
        stroke-width="5"
      />
      <Path
        d="M26 48L40 62L68 32"
        stroke="white"
        stroke-width="4.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
