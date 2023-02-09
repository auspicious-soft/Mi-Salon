import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="10" height="14" viewBox="0 0 10 14" fill="none">
      <Path
        d="M5 0V3.5C5 3.89782 5.15804 4.27936 5.43934 4.56066C5.72064 4.84196 6.10218 5 6.5 5H10V12.5C10 12.8978 9.84196 13.2794 9.56066 13.5607C9.27936 13.842 8.89782 14 8.5 14H1.5C1.10218 14 0.720644 13.842 0.43934 13.5607C0.158035 13.2794 0 12.8978 0 12.5V1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H5ZM6 0.25V3.5C6 3.63261 6.05268 3.75979 6.14645 3.85355C6.24021 3.94732 6.36739 4 6.5 4H9.75L6 0.25Z"
        fill="#343434"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});
