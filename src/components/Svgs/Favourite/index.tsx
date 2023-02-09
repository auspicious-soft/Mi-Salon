import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Circle cx="19" cy="19" r="19" fill="#FFF" />
      <Path
        d="M14 10C11.239 10 9 12.216 9 14.95C9 17.157 9.875 22.395 18.488 27.69C18.6423 27.7839 18.8194 27.8335 19 27.8335C19.1806 27.8335 19.3577 27.7839 19.512 27.69C28.125 22.395 29 17.157 29 14.95C29 12.216 26.761 10 24 10C21.239 10 19 13 19 13C19 13 16.761 10 14 10Z"
        stroke="#A3A3A3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});

// <Svg width="22" height="20" viewBox="0 0 22 20" fill="none">
// <Path
// d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
// stroke="#A3A3A3"
// stroke-width="2"
// stroke-linecap="round"
// stroke-linejoin="round"
// />
// </Svg>
