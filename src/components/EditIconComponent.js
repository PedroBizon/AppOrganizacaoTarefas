import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const EditIconComponent = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <Image
        source={require('../../assets/lapis_edit.png')}
        style={styles.iconImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});

export default EditIconComponent;
