import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

interface IProps {
  size?: number;
}

const Index = (props: IProps) => {
  const {size} = props;
  return (
    <Svg
      width={size ? size : '38'}
      height={size ? size : '38'}
      viewBox={`0 0 38 38`}
      fill="none">
      <Circle cx="19" cy="19" r="19" fill="#fff" />
      <Path
        d="M29 29L24.514 24.506L29 29ZM27 18.5C27 20.7543 26.1045 22.9163 24.5104 24.5104C22.9163 26.1045 20.7543 27 18.5 27C16.2457 27 14.0837 26.1045 12.4896 24.5104C10.8955 22.9163 10 20.7543 10 18.5C10 16.2457 10.8955 14.0837 12.4896 12.4896C14.0837 10.8955 16.2457 10 18.5 10C20.7543 10 22.9163 10.8955 24.5104 12.4896C26.1045 14.0837 27 16.2457 27 18.5V18.5Z"
        stroke="#A3A3A3"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Index;

const styles = StyleSheet.create({});

{
  /* <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <Path
        d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
        stroke="#A3A3A3"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg> */
}
