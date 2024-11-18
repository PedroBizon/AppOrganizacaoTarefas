import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTask = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [id, setId] = useState('');

  const handleCreateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Obtém o token armazenado
      const resposta = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setId(resposta.data._id); // Atualiza o estado com o ID

      if (resposta.data._id) { // Aguarda o ID ser atualizado
        const response = await axios.post(
          'http://localhost:5000/api/tasks/create',
          {
            nome: taskName,
            descricao: description,
            data: date,
            horario: time,
            usuarioId: resposta.data._id,  // Usa o ID diretamente da resposta
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
          navigation.navigate('Home', { refresh: true }); // Volta para a Home e solicita a atualização
        }
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      Alert.alert('Erro', 'Falha ao criar a tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nova Atividade"
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="AAAA-MM-DD"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="hh:mm"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <CustomButton 
        text="Criar" 
        backgroundColor="#005377" 
        textColor="#fff"
        onPress={handleCreateTask}
      />
      <CustomButton 
        text="Cancelar" 
        backgroundColor="#8D8D8D" 
        textColor="#fff"
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

export default CreateTask;
