import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;