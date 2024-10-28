
import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CheckboxComponent = ({ isChecked, onToggle }) => {
  const checkboxImage = isChecked
    ? require('../../assets/chechbox-marcado.png')
    : require('../../assets/chechbox-desmarcado.png');

  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
      <Image source={checkboxImage} style={styles.checkboxImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    padding: 5,
  },
  checkboxImage: {
    width: 20,
    height: 20,
  },
});

export default CheckboxComponent;
