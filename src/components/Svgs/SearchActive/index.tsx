import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Circle cx="19" cy="19" r="19" fill="#59C5F3" />
      <Path
        d="M29 29L24.514 24.506L29 29ZM27 18.5C27 20.7543 26.1045 22.9163 24.5104 24.5104C22.9163 26.1045 20.7543 27 18.5 27C16.2457 27 14.0837 26.1045 12.4896 24.5104C10.8955 22.9163 10 20.7543 10 18.5C10 16.2457 10.8955 14.0837 12.4896 12.4896C14.0837 10.8955 16.2457 10 18.5 10C20.7543 10 22.9163 10.8955 24.5104 12.4896C26.1045 14.0837 27 16.2457 27 18.5V18.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
