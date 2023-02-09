import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="43" height="43" viewBox="0 0 43 43" fill="none">
      <Path
        d="M21.5 13.2999V21.4999M21.5 21.4999V29.6999M21.5 21.4999H29.7M21.5 21.4999H13.3"
        stroke="#A3A3A3"
        stroke-width="2"
        stroke-linecap="round"
      />
      <Path
        d="M21.5 42C32.8218 42 42 32.8218 42 21.5C42 10.1782 32.8218 1 21.5 1C10.1782 1 1 10.1782 1 21.5C1 32.8218 10.1782 42 21.5 42Z"
        stroke="#A3A3A3"
        stroke-width="2"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
