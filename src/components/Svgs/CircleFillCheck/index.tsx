import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Circle cx="8" cy="8" r="8" fill="#59C5F3" />
      <Path
        d="M4 8.2L6.66667 11L12 5"
        stroke="white"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
