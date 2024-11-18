import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const EditTask = ({ route, navigation }) => {
  const { taskId } = route.params; // Recebe o ID da tarefa
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        const { nome, descricao, prazo } = response.data;
        setTaskName(nome);
        setDescription(descricao);
        const prazoDate = new Date(prazo);
        setDate(prazoDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
        setTime(prazoDate.toTimeString().substring(0, 5)); // Formato HH:mm
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar detalhes da tarefa.');
        console.error(error);
      }
    };
    fetchTaskDetails();
  }, [taskId]);

  const handleSaveChanges = async () => {
    try {
      const prazo = `${date}T${time}:00`;
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        nome: taskName,
        descricao: description,
        prazo,
      });
      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso.');
      navigation.navigate('Home', { refresh: true }); // Atualiza a Home
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar a tarefa.');
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      Alert.alert('Sucesso', 'Tarefa excluída com sucesso.');
      navigation.navigate('Home', { refresh: true }); // Atualiza a Home
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir a tarefa.');
      console.error(error);
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
        placeholder="HH:mm"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />

      <CustomButton
        text="Salvar Alterações"
        backgroundColor="#005377"
        textColor="#fff"
        onPress={handleSaveChanges}
      />
      <CustomButton
        text="Cancelar"
        backgroundColor="#8D8D8D"
        textColor="#fff"
        onPress={() => navigation.navigate('Home')}
      />
      <CustomButton
        text="Excluir Atividade"
        backgroundColor="#8F1D1D"
        textColor="#fff"
        onPress={handleDeleteTask}
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
