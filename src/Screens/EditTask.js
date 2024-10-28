import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton'; 

const EditTask = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

return (
    <View style={styles.container}>
      {/* Inputs de edição */}
      <TextInput
        placeholder="Nova Atividade"
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        borderRadius={10}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        borderRadius={10}
      />
      <TextInput
        placeholder="DD/MM/AAAA"
        style={styles.input}
        value={date}
        onChangeText={setDate}
        borderRadius={10}
      />
      <TextInput
        placeholder="hh:mm"
        style={styles.input}
        value={time}
        onChangeText={setTime}
        borderRadius={10}
      />

      {/* Botões reutilizáveis */}
      <CustomButton 
        text="Salvar Alterações" 
        backgroundColor="#005377" 
        textColor="#fff"
        borderRadius={10}
        onPress={() => navigation.navigate('Home')} 
      />
      <CustomButton 
        text="Cancelar" 
        backgroundColor="#8D8D8D" 
        textColor="#fff"
        borderRadius={10}
        onPress={() => navigation.navigate('Home')} 
      />
      <CustomButton 
        text="Excluir Atividade" 
        backgroundColor="#8F1D1D" 
        textColor="#fff"
        borderRadius={10} 
        onPress={() => navigation.navigate('Home')} 
      />
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      padding: 20,
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      fontSize: 16,
    },
  });

export default EditTask;