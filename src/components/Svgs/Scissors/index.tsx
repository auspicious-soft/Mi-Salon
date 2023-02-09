import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Index = () => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Circle cx="19" cy="19" r="19" fill="#fff" />
      <Path
        d="M12.519 28.0486C13.9102 28.0486 15.038 26.9208 15.038 25.5296C15.038 24.1384 13.9102 23.0106 12.519 23.0106C11.1278 23.0106 10 24.1384 10 25.5296C10 26.9208 11.1278 28.0486 12.519 28.0486Z"
        stroke="#A3A3A3"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M25.6179 28.0486C27.0091 28.0486 28.1369 26.9208 28.1369 25.5296C28.1369 24.1384 27.0091 23.0106 25.6179 23.0106C24.2267 23.0106 23.0989 24.1384 23.0989 25.5296C23.0989 26.9208 24.2267 28.0486 25.6179 28.0486Z"
        stroke="#A3A3A3"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M14.7246 26.7453L15.7937 24.9331L24.3583 10.0988"
        stroke="#A3A3A3"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M13.7766 10L22.3412 24.8344L23.4143 26.7453"
        stroke="#A3A3A3"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});

// <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//       <Path
//         d="M3.519 19.0486C4.9102 19.0486 6.03799 17.9208 6.03799 16.5296C6.03799 15.1384 4.9102 14.0106 3.519 14.0106C2.12779 14.0106 1 15.1384 1 16.5296C1 17.9208 2.12779 19.0486 3.519 19.0486Z"
//         stroke="#A3A3A3"
//         stroke-width="1.5"
//         stroke-linejoin="round"
//       />
//       <Path
//         d="M16.6179 19.0486C18.0091 19.0486 19.1369 17.9208 19.1369 16.5296C19.1369 15.1384 18.0091 14.0106 16.6179 14.0106C15.2267 14.0106 14.0989 15.1384 14.0989 16.5296C14.0989 17.9208 15.2267 19.0486 16.6179 19.0486Z"
//         stroke="#A3A3A3"
//         stroke-width="1.5"
//         stroke-linejoin="round"
//       />
//       <Path
//         d="M5.72461 17.7453L6.79367 15.9331L15.3583 1.09875"
//         stroke="#A3A3A3"
//         stroke-width="1.5"
//         stroke-linecap="round"
//       />
//       <Path
//         d="M4.77661 1L13.3412 15.8344L14.4143 17.7453"
//         stroke="#A3A3A3"
//         stroke-width="1.5"
//         stroke-linecap="round"
//       />
//     </Svg>
