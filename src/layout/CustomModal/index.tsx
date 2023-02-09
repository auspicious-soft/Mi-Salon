import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IProps {
  isVisible: boolean;
  children: any;
  setIsVisible: any;
}

const Index = (props: IProps) => {
  const {isVisible, children, setIsVisible} = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={setIsVisible}
      onBackdropPress={setIsVisible}>
      <View style={styles.modal}>{children}</View>
    </Modal>
  );
};

export default Index;

const styles = EStyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '1rem',
  },
});
