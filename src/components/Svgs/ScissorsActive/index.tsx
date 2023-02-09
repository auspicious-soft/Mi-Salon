import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Circle cx="19" cy="19" r="19" fill="#59C5F3" />
      <Path
        d="M12.519 28.0486C13.9102 28.0486 15.038 26.9208 15.038 25.5296C15.038 24.1384 13.9102 23.0106 12.519 23.0106C11.1278 23.0106 10 24.1384 10 25.5296C10 26.9208 11.1278 28.0486 12.519 28.0486Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M25.6179 28.0486C27.0091 28.0486 28.1369 26.9208 28.1369 25.5296C28.1369 24.1384 27.0091 23.0106 25.6179 23.0106C24.2267 23.0106 23.0989 24.1384 23.0989 25.5296C23.0989 26.9208 24.2267 28.0486 25.6179 28.0486Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M14.7246 26.7453L15.7937 24.9331L24.3583 10.0988"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M13.7766 10L22.3412 24.8344L23.4143 26.7453"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
